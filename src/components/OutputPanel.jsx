import { css } from "@emotion/react";

export default function OutputPanel({ expression, result }) {
  return (
    <div
      css={css`
        background-color: white;
        padding: 1rem;
      `}
    >
      <div
        css={css`
          font-size: 1rem;
          text-align: right;
          height: 1.5rem;
        `}
      >
        {result}
      </div>
      <div
        css={css`
          font-size: 2rem;
          text-align: right;
        `}
      >
        {expression}
      </div>
    </div>
  );
}
