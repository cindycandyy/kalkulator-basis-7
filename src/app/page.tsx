// app/page.tsx
"use client";

import React, { useState } from "react";

export default function Base7Calculator() {
  const [firstOperand, setFirstOperand] = useState<string>("");
  const [operator, setOperator] = useState<string>("");
  const [secondOperand, setSecondOperand] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [display, setDisplay] = useState<string>("0");
  const [resetDisplay, setResetDisplay] = useState<boolean>(false);

  const isValidBase7 = (value: string): boolean => {
    return /^[0-6]+$/.test(value);
  };

  const handleDigitClick = (digit: string): void => {
    if (resetDisplay) {
      setDisplay(digit);
      setResetDisplay(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const handleOperatorClick = (op: string): void => {
    if (result) {
      setFirstOperand(result);
      setResult("");
    } else {
      setFirstOperand(display);
    }

    setOperator(op);
    setResetDisplay(true);
  };

  const handleClear = (): void => {
    setDisplay("0");
    setFirstOperand("");
    setOperator("");
    setSecondOperand("");
    setResult("");
    setResetDisplay(false);
  };

  const handleDelete = (): void => {
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
  };

  const addBase7 = (a: string, b: string): string => {
    const num1 = parseInt(a, 7);
    const num2 = parseInt(b, 7);
    const sum = num1 + num2;
    return sum.toString(7);
  };

  const subtractBase7 = (a: string, b: string): string => {
    const num1 = parseInt(a, 7);
    const num2 = parseInt(b, 7);
    const difference = num1 - num2;
    return difference.toString(7);
  };

  const multiplyBase7 = (a: string, b: string): string => {
    const num1 = parseInt(a, 7);
    const num2 = parseInt(b, 7);
    const product = num1 * num2;
    return product.toString(7);
  };

  const divideBase7 = (a: string, b: string): string => {
    const num1 = parseInt(a, 7);
    const num2 = parseInt(b, 7);
    if (num2 === 0) return "Error";
    const quotient = Math.floor(num1 / num2);
    return quotient.toString(7);
  };

  const handleEquals = (): void => {
    if (!firstOperand || !operator) return;

    if (!isValidBase7(display)) {
      setDisplay("Invalid base-7");
      return;
    }

    setSecondOperand(display);
    let calculatedResult: string;

    switch (operator) {
      case "+":
        calculatedResult = addBase7(firstOperand, display);
        break;
      case "-":
        calculatedResult = subtractBase7(firstOperand, display);
        break;
      case "×":
        calculatedResult = multiplyBase7(firstOperand, display);
        break;
      case "÷":
        calculatedResult = divideBase7(firstOperand, display);
        break;
      default:
        return;
    }

    setResult(calculatedResult);
    setDisplay(calculatedResult);
    setResetDisplay(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="w-80 p-6 bg-white rounded-2xl shadow-2xl">
        <div className="mb-4 text-right bg-gray-100 p-4 rounded-xl shadow-inner overflow-hidden h-20">
          <div className="text-gray-500 text-sm mb-1">
            {operator ? `${firstOperand} ${operator} ${resetDisplay ? "" : display}` : ""}
          </div>
          <div className="text-3xl font-medium text-gray-800 truncate">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          <button onClick={() => handleClear()} className="col-span-2 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md transition-all">
            AC
          </button>
          <button onClick={() => handleDelete()} className="py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow-md transition-all">
            DEL
          </button>
          <button onClick={() => handleOperatorClick("÷")} className="py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg shadow-md transition-all">
            ÷
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          {[1, 2, 3].map((num) => (
            <button 
              key={num} 
              onClick={() => handleDigitClick(num.toString())}
              className="py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-md transition-all"
            >
              {num}
            </button>
          ))}
          <button onClick={() => handleOperatorClick("×")} className="py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg shadow-md transition-all">
            ×
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          {[4, 5, 6].map((num) => (
            <button 
              key={num} 
              onClick={() => handleDigitClick(num.toString())}
              className="py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-md transition-all"
            >
              {num}
            </button>
          ))}
          <button onClick={() => handleOperatorClick("-")} className="py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg shadow-md transition-all">
            -
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <button 
            onClick={() => handleDigitClick("0")} 
            className="py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-md transition-all"
          >
            0
          </button>
          <button onClick={() => handleEquals()} className="col-span-2 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition-all">
            =
          </button>
          <button onClick={() => handleOperatorClick("+")} className="py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg shadow-md transition-all">
            +
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          <p>Kalkulator Basis-7 (Hanya angka 0-6)</p>
        </div>
      </div>
    </div>
  );
}
