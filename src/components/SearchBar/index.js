import PropTypes from 'prop-types';
import React from 'react';

import ToggleBox from 'components/ToggleBox';
import ClearableInput from 'components/ClearableInput';

import { mediaTypeText, contentAgeText } from 'constants/searchFilters';

import './SearchBar.scss';

function SearchBar({
  isAnime,
  isAdult,
  searchString,
  onCheckboxChange,
  onUserInput
}) {
  const titleLabel = `Search for ${mediaTypeText[isAnime]} on ${
    contentAgeText[isAdult]
  } sites`;

  return (
    <div className="search-bar">
      <div>
        {/* 
          Need a site multiselect box here.
          The goal being to provide a way to turn sites off. 
        */}
        {/* <SelectBox
          name="site"
          text="Site"
          value={this.state.siteIndex}
          options={siteOptions}
          onSelect={this.handleSiteChange}
          disabled={disableSiteChanger}
        /> */}
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
