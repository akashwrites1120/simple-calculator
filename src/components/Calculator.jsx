import React from "react";

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
  return (<div className="min-h-[320px] bg-black flex flex-col gap-4 p-4 rounded-xl">
    <div >
      RESULT
    </div>
    <div>
      {keys.map((item, index)=>(
        <keys/>
      ))}
    </div>
  </div>);
};

export default Calculator;
