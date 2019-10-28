import PropTypes from 'prop-types';
import React from 'react';

import ClearableInput from 'meiko/ClearableInput';
import ToggleBox from 'components/ToggleBox';

import { mediaTypeText, contentAgeText } from 'constants/searchFilters';

import './SearchBar.scss';

function SearchBar({
  isAnime,
  isAdult,
  searchString,
  onCheckboxChange,
  onUserInput
}) {
  const titleLabel = `Search for ${mediaTypeText[isAnime]} on ${contentAgeText[isAdult]} sites`;

  return (
    <div className="search-bar">
      <div>
        <h2
          className="search-bar__title center-contents"
          aria-label={titleLabel}
        >
          Search for
          <ToggleBox
            name="isAnime"
            label="Is anime"
            checked={isAnime}
            handleChange={onCheckboxChange}
            text={mediaTypeText}
          />
          on
          <ToggleBox
            name="isAdult"
            label="Is adult content"
            checked={isAdult}
            handleChange={onCheckboxChange}
            text={contentAgeText}
          />
        </h2>
      </div>
      <div className="search-bar__input-container">
        <ClearableInput
          autoFocus
          id="searchString"
          name="searchString"
          label="Search for something"
          value={searchString}
          onChange={(e) => {
            const name = e.target.name;
            const value = e.target.value;
            onUserInput(name, value);
          }}
        />
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  isAnime: PropTypes.bool.isRequired,
  isAdult: PropTypes.bool.isRequired,
  searchString: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired
};

export default SearchBar;
