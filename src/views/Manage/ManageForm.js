import React, { useState, useEffect, useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Helmet } from 'react-helmet';

import { ClearableInput, SelectBox } from 'components/FormControls';
import Tickbox from 'components/Tickbox';
import { Button } from 'components/Button';
import NavLink from 'components/NavLink';
import LoadingBouncer from 'components/LoadingBouncer';
import { TabContainer, TabView } from 'components/Tabs';

import Query from 'juriGQL';
import { getSourcesManagement, getSourceById } from 'juriGQL/queries';
import { createSource, updateSource } from 'juriGQL/mutations';
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

async function fetchSourceById({ setState, setFormMeta }, id) {
  setFormMeta((prev) => ({ ...prev, isLoading: true }));
  const result = await Query({
    query: getSourceById,
    variables: { id }
  });

  const { sourceById = {} } = result.data || {};
  setState(sourceById);
  setFormMeta((prev) => ({ ...prev, isLoading: false }));
}

async function fetchSourcesManagement(setState) {
  const result = await Query({
    query: getSourcesManagement,
    variables: {}
  });

  const { sourcesManagementInformation = {} } = result.data || {};
  setState(sourcesManagementInformation);
}

async function postManageForm(
  { isCreate, setFormMeta, setState, navigate },
  payload
) {
  setFormMeta((prev) => ({ ...prev, isLoading: true }));

  const result = await Query({
    query: isCreate ? createSource : updateSource,
    variables: { payload }
  });

  const { sourceCreate, sourceUpdate } = result.data || {};
  const response = sourceCreate || sourceUpdate;
  if (response.success) {
    const id = response.data.id;
    setState((prev) => ({ ...prev, id }));

    if (!payload.id) {
      navigate(id);
    }
  }
  setFormMeta((prev) => ({ ...prev, isLoading: false }));
}

function getEditorSize(windowSize) {
  return windowSize < 992 ? windowSize : windowSize - 400;
}

function getHelpText(information) {
  if (!information) {
    return {
      returnObjectModel: '',
      urlReplacements: '',
      functionSignature: '',
      helpersFunctions: ''
    };
  }

  const returnObjectModel = information.returnObject;
  const urlReplacements = information.urlReplacements.reduce(
    (p, c) => `${p}, ${c}`
  );
  const helpersFunctions = information.availableHelperFunctions.reduce(
    (p, c) => `${p}  ${c},\n`,
    ''
  );
  const functionSignature = `function myParser(dataItem, helpers): ContentItem`;

  return {
    returnObjectModel,
    urlReplacements,
    helpersFunctions,
    functionSignature
  };
}

const MANAGE_FORM_DEFAULTS = {
  name: '',
  url: '',
  dataType: '',
  sourceType: '',
  mediaType: '',
  parser: '',
  selector: '',
  isAdult: false
};

function ManageForm({ match, history, informationState, ...props }) {
  const sourceId = Number(match.params.id || 0);
  const isCreate = !sourceId || isNaN(sourceId);
  const [information, setInformation] = informationState;
  const [state, setState] = useState(MANAGE_FORM_DEFAULTS);
  const [{ isLoading, errors }, setFormMeta] = useState({
    isLoading: false,
    errors: new Map()
  });

  const index = match.url.lastIndexOf('/');
  const cancelUrl = match.url.slice(0, index);
  const pageTitle = isCreate
    ? `Manage Source Creation`
    : `Manage Source ${state.name}`;

  // Editor settings
  const [isDarkTheme] = useContext(ThemeContext);
  const editorTheme = isDarkTheme ? 'vs-dark' : 'vs-light';

  const { width } = useWindowSize();
  const editorWidth = getEditorSize(width);

  // Help text things
  const {
    returnObjectModel,
    urlReplacements,
    helpersFunctions,
    functionSignature
  } = getHelpText(information);

  useEffect(() => {
    const hasSourceId = !!sourceId;
    if (hasSourceId) {
      fetchSourceById({ setState, setFormMeta }, sourceId);
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
    const response = validator(state);
    console.log('%c SUBMIT > ', 'color: firebrick', state, response);
    if (response.success) {
      postManageForm(
        {
          isCreate,
          setFormMeta,
          setState,
          navigate: (id) => history.push(`${cancelUrl}/${id}`)
        },
        state
      );
      return;
    }

    setFormMeta({ isLoading: false, errors: response.errors });
  }

  return (
    <div className="manage-form">
      <Helmet title={pageTitle} />
      <form name="manage" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="manage-form__actions">
          {isLoading && <LoadingBouncer className="manage-form__loader" />}
          <NavLink to={cancelUrl}>Cancel</NavLink>
          <Button type="submit" btnStyle="primary">
            Save
          </Button>
        </div>
        <TabContainer>
          <TabView name="Data">
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
                  errors={errors}
                />
                <div>
                  <div className="manage-form__help-text">
                    Available url replacements: {urlReplacements}.
                  </div>
                  <ClearableInput
                    className="manage-form__control"
                    id="url"
                    name="url"
                    label="Url"
                    value={state.url}
                    onChange={(e) => persist({ url: e.target.value })}
                    required
                    errors={errors}
                  />
                </div>
                <ClearableInput
                  className="manage-form__control"
                  id="selector"
                  name="selector"
                  label="Selector"
                  value={state.selector}
                  onChange={(e) => persist({ selector: e.target.value })}
                  errors={errors}
                />
              </div>
              <div className="manage-form__column">
                <SelectBox
                  className="manage-form__control"
                  id="dataType"
                  name="dataType"
                  text="Data Type"
                  value={state.dataType}
                  options={dataTypes}
                  onSelect={(e) => persist({ dataType: e.target.value })}
                  required
                  errors={errors}
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
                  errors={errors}
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
                  errors={errors}
                />
                <Tickbox
                  className="manage-form__control"
                  id="isAdult"
                  name="is adult"
                  text="Is Adult"
                  checked={state.isAdult}
                  onChange={(e) => persist({ isAdult: e.target.checked })}
                />
              </div>
            </div>
          </TabView>
          <TabView name="Parser">
            <div className="parser-tab">
              <div className="parser-tab__help">
                <pre className="manage-form__help-text">
                  <strong>Write a function with the signature:</strong>
                  {`\r\n@param dataItem: Response item data`}
                  {`\r\n@param helpers: {\n${helpersFunctions} }`}
                  {`\r\n${functionSignature}`}
                </pre>
                <br />
                <pre className="manage-form__help-text">
                  <strong>Return object definition:</strong>
                  {returnObjectModel}
                </pre>
              </div>
              <div className="manage-form__control form-control">
                <label className="manage-form__editor-label">
                  Source Parser *
                </label>
                <MonacoEditor
                  height="400"
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
                {errors.has('parser') && (
                  <div className="form-control__error parser-tab__error">
                    {errors.get('parser')}
                  </div>
                )}
              </div>
            </div>
          </TabView>
        </TabContainer>
      </form>
    </div>
  );
}

export default ManageForm;