import React, { useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';

import Image from 'meiko/Image';
import List from 'meiko/List';
import LoadingBouncer from 'meiko/LoadingBouncer';

import NewTabLink from 'components/NewTabLink';
import RadioGroup from 'components/RadioGroup';
import OpenInNewTabIcon from 'components/OpenInNewTabIcon';

import Query from 'juriGQL';
import { getMangaPosts } from 'juriGQL/queries';

import './RedditManga.scss';

const sortOrders = [
  { id: 'hot', label: 'Hot', value: 'Hot' },
  { id: 'new', label: 'New', value: 'New' }
];

const timeframes = [
  { id: 'day', label: 'Day', value: 'Day' },
  { id: 'week', label: 'Week', value: 'Week' }
];

const statusType = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success'
};

const actionType = {
  UpdateFilters: 'UPDATE_FILTERS',
  UpdateStatus: 'UPDATE_STATUS',
  Load: 'LOAD'
};

function reducer(state, action) {
  switch (action.type) {
    case actionType.UpdateFilters: {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    }

    case actionType.UpdateStatus:
      return { ...state, status: action.payload };

    case actionType.Load:
      return { ...state, status: statusType.Success, posts: action.payload };

    default:
      return state;
  }
}

function RedditManga() {
  const [state, dispatch] = useReducer(reducer, {
    filters: {
      sort: 'Hot',
      time: 'Day'
    },
    posts: [],
    status: statusType.Idle
  });

  const { sort, time } = state.filters;
  const isLoading = state.status === statusType.Loading;

  const handleFilter = (payload) =>
    dispatch({ type: actionType.UpdateFilters, payload });

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: actionType.UpdateStatus, payload: statusType.Loading });

      const response = await Query({
        query: getMangaPosts,
        variables: { sort, time }
      });

      dispatch({ type: actionType.Load, payload: response.posts });
    }

    fetchData();
  }, [sort, time]);

  return (
    <div className="rmanga">
      <Helmet title="r/Manga" />

      <section>
        <header>
          <h2 className="rmanga__title">r/Manga</h2>
        </header>
        <div className="rmanga__filters">
          <RadioGroup
            title="Sort order"
            name="sort"
            options={sortOrders}
            value={sort}
            onChange={handleFilter}
          />
          <RadioGroup
            title="Timeframe"
            name="time"
            options={timeframes}
            value={time}
            onChange={handleFilter}
          />
        </div>
        {isLoading && <LoadingBouncer />}
        {!isLoading && (
          <List columns={1}>
            {state.posts.map((x) => {
              return (
                <li key={x.id} className="rmanga__post">
                  <Image
                    className="rmanga__thumbnail"
                    {...x.image}
                    isLazy
                    alt="post thumbnail"
                  />
                  <div className="post-links">
                    <NewTabLink to={x.url}>{x.title}</NewTabLink>
                    <NewTabLink
                      to={`https://localhost:5001/post/${x.name}/comments`}
                    >
                      Open post in fuyuki
                      <OpenInNewTabIcon />
                    </NewTabLink>
                  </div>
                </li>
              );
            })}
          </List>
        )}
      </section>
    </div>
  );
}

export default RedditManga;
