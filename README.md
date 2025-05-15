# String Calculator - TDD Kata (Node.js + TypeScript)

## Overview

This project is an implementation of the **String Calculator TDD Kata** using **Node.js and TypeScript**. The objective is to rigorously follow **Test-Driven Development (TDD)** practices, ensuring every feature is implemented using the Red ➝ Green ➝ Refactor cycle.

## Features

- Adds numbers provided in a string format.
- Supports default delimiters: comma (`,`) and newline (`\n`).
- Supports custom single-character delimiters (e.g., `//;\n1;2`).
- Allows `+` as a valid delimiter only when explicitly specified.
- Handles invalid delimiters (e.g., `{`, `}`, etc.).
- Detects and throws an error for:
  - Consecutive delimiters (e.g., `1;;2`)
  - Invalid input formats
  - Negative numbers (with full list in error)
- Handles `//-\n1-2` correctly and treats `//-1-2` as invalid.

## Setup Instructions

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)

### Clone and Install

```bash
git clone https://github.com/yourusername/stringcalculator.git
cd stringcalculator
npm install
```

### Run Tests

```bash
npm test
```

### Usage
The main class StringCalculator exposes the add() method:

```ts
import { StringCalculator } from "./src/stringCalculator";

const calculator = new StringCalculator();

console.log(calculator.add(""));          // => 0
console.log(calculator.add("1"));         // => 1
console.log(calculator.add("1,2,3"));     // => 6
console.log(calculator.add("1\n2,3"));    // => 6
console.log(calculator.add("//;\n1;2"));  // => 3
console.log(calculator.add("//+\n1+2"));  // => 3
```

### Error handling Examples

```ts
calculator.add("1,-2,3");          
// Throws: "negative numbers not allowed: -2"

calculator.add("//;\n1;;2");      
// Throws: "Invalid Input"

calculator.add("1+2");            
// Throws: "Invalid Input" (unless '+' is explicitly defined)

calculator.add("//{+}1+2+");      
// Throws: "Invalid Input"
```

## TDD Process

The development followed a strict **Red-Green-Refactor** cycle:

1. **Red** – Write a failing test.
2. **Green** – Implement minimal code to pass the test.
3. **Refactor** – Improve code structure while keeping tests green.

### Example Commit Messages

#### `feat` (Feature Implementation)
- `feat: Add support for custom delimiters`
- `feat: Raise exception for negative numbers`
- `feat: Handle multiple custom delimiters`

#### `test` (Adding Test Cases)
- `test: Add test for custom delimiter handling`
- `test: Verify exception for consecutive delimiters`
- `test: Add edge case test for single number`

#### `refactor` (Code Cleanup)
- `refactor: Extract delimiter validation into a separate method`
- `refactor: Improve error handling for invalid input`
- `refactor: Optimize delimiter regex for better readability`