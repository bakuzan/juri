import React, { useState } from 'react';

import MonacoEditor from 'react-monaco-editor';

function Manage() {
  const [state, setState] = useState({ parser: '' });

  function persist(obj) {
    setState((prev) => ({ ...prev, ...obj }));
  }

  return (
    <div>
      <div>manage page</div>
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

export default Manage;
