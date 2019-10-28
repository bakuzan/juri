import React, { useState, useEffect, useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { Helmet } from 'react-helmet-async';

import { useWindowSize } from 'meiko/hooks/useWindowSize';
import { Button, LoadingBouncer, Tabs, Tickbox, FormControls as FC } from 'mko';
import NavLink from 'components/NavLink';
import ParserHelp from 'components/ParserHelp';

import Query from 'juriGQL';
import { getSourcesManagement, getSourceById } from 'juriGQL/queries';
import { createSource, updateSource, removeSource } from 'juriGQL/mutations';
import { ThemeContext } from 'context';
import MediaTypesEnum from 'constants/mediaTypes';
import SourceTypesEnum from 'constants/sourceTypes';
import { mapEnumToSelectOption } from 'utils';
import validator from 'utils/manageFormValidator';
import alertService from 'utils/alertService';

const mediaTypes = mapEnumToSelectOption(MediaTypesEnum);
const sourceTypes = mapEnumToSelectOption(SourceTypesEnum);

async function fetchSourceById({ setState, setFormMeta }, id) {
  setFormMeta((prev) => ({ ...prev, isLoading: true }));
  const { sourceById = {} } = await Query({
    query: getSourceById,
    variables: { id }
  });

  if (sourceById) {
    setState(sourceById);
  } else {
    alertService.showError(
      'Source not found',
      `Source with Id: ${id}, was not found.`
    );
  }

  setFormMeta((prev) => ({ ...prev, isLoading: false }));
}

async function fetchSourcesManagement(setState) {
  const { sourcesManagementInformation = {} } = await Query({
    query: getSourcesManagement,
    variables: {}
  });

  setState(sourcesManagementInformation);
}

async function postManageForm(
  { isCreate, setFormMeta, setState, navigate },
  payload
) {
  setFormMeta((prev) => ({ ...prev, isLoading: true }));

  const { sourceCreate, sourceUpdate } = await Query({
    query: isCreate ? createSource : updateSource,
    variables: { payload }
  });

  const response = sourceCreate || sourceUpdate;
  if (response.success) {
    const id = response.data.id;
    setState((prev) => ({ ...prev, id }));

    if (!payload.id) {
      navigate(id);
    }
  }

  setFormMeta((prev) => ({ ...prev, isLoading: false, submitted: false }));
}

async function deleteSource({ navigate }, id) {
  const { sourceRemove = {} } = await Query({
    query: removeSource,
    variables: { id }
  });

  if (sourceRemove.success) {
    navigate();
  }
}

function getEditorSize(windowSize) {
  return windowSize < 992 ? windowSize : windowSize - 400;
}

const EMPTY_ERRORS = new Map([]);
const MANAGE_FORM_DEFAULTS = {
  name: '',
  sourceType: '',
  mediaType: '',
  optionsParser: '',
  responseParser: '',
  itemParser: '',
  isPaged: false,
  isAdult: false,
  isActive: true
};

function ManageForm({ match, history, informationState, ...props }) {
  const sourceId = Number(match.params.id || 0);
  const isCreate = !sourceId || isNaN(sourceId);
  const [information, setInformation] = informationState;
  const [state, setState] = useState(MANAGE_FORM_DEFAULTS);
  const [{ isLoading, submitted }, setFormMeta] = useState({
    isLoading: false,
    submitted: false
  });

  const errors = submitted ? validator(state).errors : EMPTY_ERRORS;

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
  }, [information, setInformation]);

  function persist(obj) {
    setState((prev) => ({ ...prev, ...obj }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const response = validator(state);

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

    setFormMeta({ isLoading: false, submitted: true });
  }

  function handleDelete() {
    deleteSource({ navigate: () => history.push(cancelUrl) }, state.id);
  }

  const mediaOptions = state.mediaType
    ? mediaTypes
    : [{ text: 'Select a media type', value: '' }, ...mediaTypes];

  const sourceOptions = state.sourceType
    ? sourceTypes
    : [{ text: 'Select a source type', value: '' }, ...sourceTypes];

  const hasError = (key) => (errors.has(key) ? '(!)' : '');
  const dataError = ['name', 'sourceType', 'mediaType']
    .map((x) => hasError(x))
    .filter((x) => !!x)
    .pop();

  const tabDisplay = {
    data: `Data ${dataError || ''}`,
    options: `Options Parser ${hasError('optionsParser')}`,
    response: `Response Parser ${hasError('responseParser')}`,
    item: `Item parser ${hasError('itemParser')}`
  };

  return (
    <div className="manage-form">
      <Helmet title={pageTitle} />
      <form name="manage" autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="manage-form__actions">
          {!!errors.size && (
            <div className="manage-form__errors">* Has errors</div>
          )}
          {isLoading && <LoadingBouncer className="manage-form__loader" />}
          <NavLink to={cancelUrl}>Cancel</NavLink>
          <Button type="submit" btnStyle="primary">
            Save
          </Button>
        </div>
        <Tabs.Container>
          <Tabs.View
            className="data-tab"
            name="Data"
            displayName={tabDisplay.data}
          >
            <div className="manage-form__grid">
              <div className="manage-form__column">
                <FC.ClearableInput
                  className="manage-form__control"
                  id="name"
                  name="name"
                  label="Name"
                  value={state.name}
                  onChange={(e) => persist({ name: e.target.value })}
                  required
                  error={errors}
                />
                <FC.SelectBox
                  className="manage-form__control"
                  id="sourceType"
                  name="sourceType"
                  text="Source Type"
                  value={state.sourceType}
                  options={sourceOptions}
                  onChange={(e) => persist({ sourceType: e.target.value })}
                  required
                  error={errors}
                />
                <FC.SelectBox
                  className="manage-form__control"
                  id="mediaType"
                  name="mediaType"
                  text="Media Type"
                  value={state.mediaType}
                  options={mediaOptions}
                  onChange={(e) => persist({ mediaType: e.target.value })}
                  required
                  error={errors}
                />
              </div>
              <div className="manage-form__column">
                <Tickbox
                  containerClassName="manage-form__control manage-form__control--checkbox"
                  id="isPaged"
                  name="is paged"
                  text="Is Paged"
                  checked={state.isPaged}
                  onChange={(e) => persist({ isPaged: e.target.checked })}
                />
                <Tickbox
                  containerClassName="manage-form__control manage-form__control--checkbox"
                  id="isAdult"
                  name="is adult"
                  text="Is Adult"
                  checked={state.isAdult}
                  onChange={(e) => persist({ isAdult: e.target.checked })}
                />
                <Tickbox
                  containerClassName="manage-form__control manage-form__control--checkbox"
                  id="isActive"
                  name="is active"
                  text="Is Active"
                  checked={state.isActive}
                  onChange={(e) => persist({ isActive: e.target.checked })}
                />
              </div>
            </div>

            {!isCreate && (
              <div className="manage-form__delete-container">
                <Button className="delete-button" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            )}
          </Tabs.View>
          <Tabs.View name="Options Parser" displayName={tabDisplay.options}>
            <div className="parser-tab">
              <ParserHelp attr={'optionsParser'} data={information} />
              <div className="manage-form__control form-control">
                <label className="manage-form__editor-label">
                  Options Parser *
                </label>
                <MonacoEditor
                  height="400"
                  width={editorWidth}
                  language="javascript"
                  theme={editorTheme}
                  value={state.optionsParser}
                  options={{
                    contextmenu: false,
                    selectOnLineNumbers: true,
                    ariaLabel: 'Options Parser',
                    fontSize: 16
                  }}
                  onChange={(optionsParser) => persist({ optionsParser })}
                />
                {errors.has('optionsParser') && (
                  <div className="form-control__error parser-tab__error">
                    {errors.get('optionsParser')}
                  </div>
                )}
              </div>
            </div>
          </Tabs.View>
          <Tabs.View name="Response Parser" displayName={tabDisplay.response}>
            <div className="parser-tab">
              <ParserHelp attr="responseParser" data={information} />
              <div className="manage-form__control form-control">
                <label className="manage-form__editor-label">
                  Response Parser *
                </label>
                <MonacoEditor
                  height="400"
                  width={editorWidth}
                  language="javascript"
                  theme={editorTheme}
                  value={state.responseParser}
                  options={{
                    contextmenu: false,
                    selectOnLineNumbers: true,
                    ariaLabel: 'Response Parser',
                    fontSize: 16
                  }}
                  onChange={(responseParser) => persist({ responseParser })}
                />
                {errors.has('responseParser') && (
                  <div className="form-control__error parser-tab__error">
                    {errors.get('responseParser')}
                  </div>
                )}
              </div>
            </div>
          </Tabs.View>
          <Tabs.View name="Item Parser" displayName={tabDisplay.item}>
            <div className="parser-tab">
              <ParserHelp attr="itemParser" data={information} />
              <div className="manage-form__control form-control">
                <label className="manage-form__editor-label">
                  Item Parser *
                </label>
                <MonacoEditor
                  height="400"
                  width={editorWidth}
                  language="javascript"
                  theme={editorTheme}
                  value={state.itemParser}
                  options={{
                    contextmenu: false,
                    selectOnLineNumbers: true,
                    ariaLabel: 'Item Parser',
                    fontSize: 16
                  }}
                  onChange={(itemParser) => persist({ itemParser })}
                />
                {errors.has('itemParser') && (
                  <div className="form-control__error parser-tab__error">
                    {errors.get('itemParser')}
                  </div>
                )}
              </div>
            </div>
          </Tabs.View>
        </Tabs.Container>
      </form>
    </div>
  );
}

export default ManageForm;
