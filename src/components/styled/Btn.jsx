import { css } from "@emotion/react";

export default function Btn({ children, onClick }) {
  return (
    <button
      css={css`
        width: 3rem;
        height: 3rem;
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
