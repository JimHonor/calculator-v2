import { css } from "@emotion/react";
import { evaluate } from "mathjs";
import { useState } from "react";

import InputKeyboard from "./components/InputKeyboard";
import OutputPanel from "./components/OutputPanel";

const App = () => {
  const [expression, setExpression] = useState("0");
  const lastChar = () => {
    if (typeof expression !== "string") {
      throw new TypeError("expression state must be a string!");
    }
    return expression.charAt(expression.length - 1);
  };
  const isLastCharDigit = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].some(
    (e) => lastChar() == e
  );
  const hasOperator = Boolean(expression.match(/[\+\-\*\/]/));
  const generateNewExpression = ({ name, type }) => {
    if (expression === "0") {
      return parseFloat(expression + name).toString();
    }
    return expression + name;
  };

  const [result, setResult] = useState("");
  const lastCharOfResult = result.charAt(result.length - 1);

  const onClearClick = () => {
    setExpression("0");
    setResult("");
  };

  const onDigitClick = (digit) => {
    const input = { name: digit, type: "digit" };
    const newExpression = generateNewExpression(input);

    if (isLastCharDigit) {
      if (hasOperator) {
        setResult(calculate(newExpression));
      }

      if (result.charAt(result.length - 1) === "=") {
        setExpression(digit.toString());
        setResult("");
      } else {
        setExpression(newExpression);
      }
    } else {
      setExpression(newExpression);
      setResult(calculate(newExpression));
    }
  };

  const onOperatorClick = (operator) => {
    if (isLastCharDigit) {
      setExpression(
        generateNewExpression({ name: operator, type: "operator" })
      );

      if (result.charAt(result.length - 1) === "=") {
        setResult("");
      }
    } else {
      const replaceLastChar = expression.slice(0, -1) + operator;
      setExpression(replaceLastChar);
    }
  };

  const onEqualClick = () => {
    if (isLastCharDigit && hasOperator) {
      setExpression(result);
      setResult(expression + "=");
    }
  };

  const onBackspaceClick = () => {
    if (lastCharOfResult === "=") {
      setExpression("0");
      setResult("");
    } else {
      if (expression.length === 1) {
        setExpression("0");
      } else {
        const newExpression = expression.slice(0, -1);
        setExpression(newExpression);

        const lastChar = newExpression.charAt(newExpression.length - 1);
        const isNumber =
          lastChar === "0" || Boolean(Number(lastChar)) ? true : false;

        const operators = newExpression.match(/[\+\-\*\/]/g);
        if (isNumber) {
          if (operators) {
            setResult(calculate(newExpression));
          }
        } else {
          if (operators.length === 1) {
            setResult("");
          } else {
            setResult(calculate(newExpression));
          }
        }
      }
    }
  };

  const calculate = (expression) => {
    const lastChar = expression.charAt(expression.length - 1);
    const isNumber =
      lastChar === "0" || Boolean(Number(lastChar)) ? true : false;
    if (!isNumber) {
      expression = expression.slice(0, -1);
    }
    return evaluate(expression).toString();
  };

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100vh;
        background-color: rgb(56, 88, 197);
      `}
    >
      <div
        css={css`
          width: 300px;
        `}
      >
        <OutputPanel expression={expression} result={result} />
        <InputKeyboard
          onDigitClick={onDigitClick}
          onClearClick={onClearClick}
          onOperatorClick={onOperatorClick}
          onEqualClick={onEqualClick}
          onBackspaceClick={onBackspaceClick}
        />
      </div>
    </div>
  );
};

export default App;
