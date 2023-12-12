import { Highlight, themes } from "prism-react-renderer";
import React from "react";

type Props = {
  exampleCode: string;
};

export const JSXCode = ({ exampleCode }: Props) => {
  return (
    <Highlight theme={themes.duotoneLight} code={exampleCode} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{ ...style, padding: "1rem", maxWidth: "37rem" }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
