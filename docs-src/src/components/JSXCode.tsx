import Highlight, { defaultProps } from 'prism-react-renderer';
import editorTheme from 'prism-react-renderer/themes/duotoneLight';
import React, { FC } from 'react';

interface Props {
  exampleCode: string;
};

export const JSXCode: FC<Props> = ({ exampleCode }) => {
  return (
    <Highlight {...defaultProps}
      theme={editorTheme}
      code={exampleCode} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '1rem', maxWidth: '37rem' }}>
          {tokens.map((line, i) => (
            <div key={i}
            {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
};
