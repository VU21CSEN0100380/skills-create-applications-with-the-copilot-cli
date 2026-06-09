#!/usr/bin/env node

/**
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 */

function toNumber(value, name) {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`${name} must be a valid number`);
  }

  return parsed;
}

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }

  return a / b;
}

function calculate(operation, a, b) {
  switch (operation) {
    case 'add':
    case '+':
      return addition(a, b);
    case 'subtract':
    case '-':
      return subtraction(a, b);
    case 'multiply':
    case '*':
      return multiplication(a, b);
    case 'divide':
    case '/':
      return division(a, b);
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function runCli(argv = process.argv.slice(2)) {
  const [operation, firstValue, secondValue] = argv;

  if (!operation || firstValue === undefined || secondValue === undefined) {
    console.error('Usage: node src/calculator.js <add|subtract|multiply|divide> <number> <number>');
    process.exitCode = 1;
    return;
  }

  try {
    const firstNumber = toNumber(firstValue, 'First value');
    const secondNumber = toNumber(secondValue, 'Second value');
    const result = calculate(operation, firstNumber, secondNumber);

    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  runCli();
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  runCli,
};
