import React, { useState, useEffect } from 'react';

import MonacoEditor from 'react-monaco-editor';

import Query from 'juriGQL';
import { getSourcesManagement } from 'juriGQL/queries';

async function fetchSourcesManagement(setState) {
  const result = await Query({
    query: getSourcesManagement,
    variables: {}
  });

  const { sourcesManagementInformation = {} } = result.data || {};
  setState(sourcesManagementInformation);
}

function ManageForm({ informationState, ...props }) {
  const [information, setInformation] = informationState;
  const [state, setState] = useState({ parser: '' });

  useEffect(() => {
    const hasInformation = !!information;
    if (!hasInformation) {
      fetchSourcesManagement(setInformation);
    }
  }, []);

  function persist(obj) {
    setState((prev) => ({ ...prev, ...obj }));
  }

  return (
    <div>
      <form>
        <MonacoEditor
          height="600"
          language="javascript"
          theme="vs-light"
          value={state.parser}
          options={{
            selectOnLineNumbers: true
          }}
          onChange={(parser) => persist({ parser })}
        />
      </form>
    </div>
  );
}

export default ManageForm;
