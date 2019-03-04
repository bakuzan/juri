import React, { useState, useEffect, useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';

import ClearableInput from 'components/ClearableInput';
import SelectBox from 'components/SelectBox';
import Tickbox from 'components/Tickbox';
import { Button } from 'components/Button';
import NavLink from 'components/NavLink';

import Query from 'juriGQL';
import { getSourcesManagement, getSourceById } from 'juriGQL/queries';
import { ThemeContext } from 'context';
import DataTypesEnum from 'constants/dataTypes';
import MediaTypesEnum from 'constants/mediaTypes';
import SourceTypesEnum from 'constants/sourceTypes';
import { useWindowSize } from 'hooks/useWindowSize';
import { mapEnumToSelectOption, capitalise } from 'utils';
import validator from 'utils/manageFormValidator';

const dataTypes = mapEnumToSelectOption(DataTypesEnum, (v) => capitalise(v));
const mediaTypes = mapEnumToSelectOption(MediaTypesEnum);
const sourceTypes = mapEnumToSelectOption(SourceTypesEnum);

async function fetchSourceById(setState, id) {
  const result = await Query({
    query: getSourceById,
    variables: { id }
  });

  const { sourceById = {} } = result.data || {};
  setState(sourceById);
}

async function fetchSourcesManagement(setState) {
  const result = await Query({
    query: getSourcesManagement,
    variables: {}
  });

  const { sourcesManagementInformation = {} } = result.data || {};
  setState(sourcesManagementInformation);
}

function getEditorSize(windowSize) {
  return windowSize < 992 ? windowSize : windowSize / 2;
}

const MANAGE_FORM_DEFAULTS = {
  name: '',
  url: '',
  dataType: '',
  sourceType: '',
  mediaType: '',
  parser: '',
  selector: '',
  isAdult: false,
  isPaged: false
};

function ManageForm({ match, informationState, ...props }) {
  const sourceId = Number(match.params.id || 0);
  const [information, setInformation] = informationState;
  const [state, setState] = useState(MANAGE_FORM_DEFAULTS);

  const index = match.url.lastIndexOf('/');
  const cancelUrl = match.url.slice(0, index);

  const [isDarkTheme] = useContext(ThemeContext);
  const editorTheme = isDarkTheme ? 'vs-dark' : 'vs-light';

  const { width } = useWindowSize();
  const editorWidth = getEditorSize(width);

  useEffect(() => {
    const hasSourceId = !!sourceId;
    if (hasSourceId) {
      fetchSourceById(setState, sourceId);
    }
  }, [sourceId]);

  useEffect(() => {
    const hasInformation = !!information;
    if (!hasInformation) {
      fetchSourcesManagement(setInformation);
    }
  }, []);

  function persist(obj) {
    setState((prev) => ({ ...prev, ...obj }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('%c SUBMIT > ', 'color: firebrick', state);
    const response = validator(state);
    // POST FORM
  }

  console.log('%c FORM > ', 'color: forestgreen', sourceId, props, editorWidth);

  return (
    <div className="manage-form">
      <form name="manage" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="manage-form__actions">
          <NavLink to={cancelUrl}>Cancel</NavLink>
          <Button type="submit" btnStyle="primary">
            Save
          </Button>
        </div>
        <div className="manage-form__grid">
          <div className="manage-form__column">
            <ClearableInput
              className="manage-form__control"
              id="name"
              name="name"
              label="Name"
              value={state.name}
              onChange={(e) => persist({ name: e.target.value })}
              required
            />
            <ClearableInput
              className="manage-form__control"
              id="url"
              name="url"
              label="Url"
              value={state.url}
              onChange={(e) => persist({ url: e.target.value })}
              required
            />
            <SelectBox
              className="manage-form__control"
              id="dataType"
              name="dataType"
              text="Data Type"
              value={state.dataType}
              options={dataTypes}
              onSelect={(e) => persist({ dataType: e.target.value })}
              required
            />
            <SelectBox
              className="manage-form__control"
              id="sourceType"
              name="sourceType"
              text="Source Type"
              value={state.sourceType}
              options={sourceTypes}
              onSelect={(e) => persist({ sourceType: e.target.value })}
              required
            />
            <SelectBox
              className="manage-form__control"
              id="mediaType"
              name="mediaType"
              text="Media Type"
              value={state.mediaType}
              options={mediaTypes}
              onSelect={(e) => persist({ mediaType: e.target.value })}
              required
            />
          </div>
          <div className="manage-form__column">
            <ClearableInput
              className="manage-form__control"
              id="selector"
              name="selector"
              label="Selector"
              value={state.selector}
              onChange={(e) => persist({ selector: e.target.value })}
            />
            <Tickbox
              className="manage-form__control"
              id="isAdult"
              name="is adult"
              text="Is Adult"
              checked={state.isAdult}
              onChange={(e) => persist({ isAdult: e.target.checked })}
            />
            <Tickbox
              className="manage-form__control"
              id="isPaged"
              name="is paged"
              text="Is Paged"
              checked={state.isPaged}
              onChange={(e) => persist({ isPaged: e.target.checked })}
            />
            <div className="manage-form__control">
              <label className="manage-form__editor-label">
                Source Parser *
              </label>
              <MonacoEditor
                height="200"
                width={editorWidth}
                language="javascript"
                theme={editorTheme}
                value={state.parser}
                options={{
                  contextmenu: false,
                  selectOnLineNumbers: true,
                  ariaLabel: 'Source Parser',
                  fontSize: 16
                }}
                onChange={(parser) => persist({ parser })}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ManageForm;
