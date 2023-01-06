import { css } from "@emotion/react";
import Btn from "./styled/Btn";

export default function InputKeyboard({
  onDigitClick,
  onClearClick,
  onOperatorClick,
  onEqualClick,
  onBackspaceClick,
}) {
  // const operators = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((digit) => ({
  //   name: digit.toString(),
  //   mark: digit.toString(),
  //   type: "digit",
  // }));
  // const keys = [
  //   {
  //     name: "clear",
  //     mark: "C",
  //   },
  //   {
  //     name: "chs",
  //     mark: "+/-",
  //   },
  //   {
  //     name: "percent",
  //     mark: "%",
  //   },
  //   {
  //     name: "divide",
  //     mark: "/",
  //   },
  // ];

  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const operators = ["+", "-", "*", "/"];

  return (
    <div
      css={css`
        background-color: aliceblue;
        height: 200px;
      `}
    >
      <div>
        {digits.map((digit) => (
          <Btn key={digit} onClick={() => onDigitClick(digit)}>
            {digit}
          </Btn>
        ))}
      </div>
      {operators.map((operator) => (
        <Btn key={operator} onClick={() => onOperatorClick(operator)}>
          {operator}
        </Btn>
      ))}
      <div>
        <Btn onClick={onEqualClick}>=</Btn>
        <Btn onClick={onClearClick}>C</Btn>
        <Btn onClick={onBackspaceClick}>CE</Btn>
      </div>
    </div>
  );
}
