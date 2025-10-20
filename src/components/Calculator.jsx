import React, { useState, useEffect, useRef } from "react";
import Keys from "./Keys";

const Calculator = () => {
  const keys = [
    "AC",
    "C",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    ".",
    "0",
    "EQUALS",
  ];

  const [showResult, setShowResult] = useState(false);
  const [display, setDisplay] = useState("");
  const displayRef = useRef(display);

  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  const maxLimit = 15;

  useEffect(() => {
    const handleKeyDown = (event) => {
      setShowResult(false);
      const key = event.key;
      let value;
      if (/\d/.test(key)) {
        value = key;
      } else if (key === "+") value = "+";
      else if (key === "-") value = "-";
      else if (key === "*") value = "*";
      else if (key === "/") value = "/";
      else if (key === "%") value = "%";
      else if (key === ".") value = ".";
      else if (key === "Enter" || key === "=") {
        calculateResult();
        return;
      } else if (key === "Backspace") {
        setDisplay((prev) => prev.slice(0, -1));
        return;
      } else if (key === "Escape") {
        setDisplay("");
        return;
      } else {
        return;
      }

      if (displayRef.current.length >= maxLimit) {
        alert(`maximum characters allowed : ${maxLimit}`);
        return;
      }

      if (isOperator(value)) {
        if (displayRef.current === "" || isOperator(displayRef.current[displayRef.current.length - 1])) return;
      }

      setDisplay((prev) => prev + value);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function calculateResult() {
    if (displayRef.current.length !== 0) {
      try {
        let calcResult = eval(displayRef.current);
        calcResult = parseFloat(calcResult.toFixed(3));
        setDisplay(calcResult);
        setShowResult(true);
      } catch (error) {
        setDisplay("Error");
      }
    } else setDisplay("");
  }

  function handleButton(value) {
    setShowResult(false);
    if (value === "AC") setDisplay("");
    else if (value === "C") setDisplay(displayRef.current.slice(0, -1));
    else if (isOperator(value)) {
      if (displayRef.current == "" || isOperator(displayRef.current[displayRef.current.length - 1])) return;
      setDisplay(displayRef.current + value);
    } else if (value === "EQUALS") calculateResult();
    else if (displayRef.current.length >= maxLimit)
      alert(`maximum characters allowed : ${maxLimit}`);
    else setDisplay(displayRef.current + value);
  }

  function isOperator(char) {
    return ["*", "/", "%"].includes(char);
  }

  const operationClass =
    "text-[1.2rem] tracking-[2px] flex gap-[5px] items-center text-[rgba(255,255,255,0.5)] justify-end";
  const resultClass = "text-[1.7rem]";

  return (
    <div className="min-w-[320px] bg-black flex flex-col gap-4 p-4 rounded-2xl">
      <div className="overflow-x-auto bg-[#141414] min-h-[100px] flex items-end justify-end flex-col p-4 rounded-[10px]">
        <div className={`${showResult ? resultClass : operationClass}`}>
          {display}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(4,1fr)] gap-[0.3rem]">
        {keys.map((item, index) => (
          <Keys
            label={item}
            key={index}
            keyClass={item === "EQUALS" && "equals"}
            onButtonClick={handleButton}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;