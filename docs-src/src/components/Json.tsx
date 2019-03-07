import pretty from 'json-pretty-html';
import React from 'react';

export default (state) => {
  return (
    <pre>
      <code>
        {pretty(JSON.stringify(state))}
      </code>
    </pre>
  );
};
