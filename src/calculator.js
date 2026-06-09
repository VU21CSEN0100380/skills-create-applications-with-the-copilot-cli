#!/usr/bin/env node

/**
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - power
 * - square root
 */

function toNumber(value, name) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid number for ${name}: ${value}`);
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

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Cannot modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot take square root of a negative number');
  }
  return Math.sqrt(n);
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
    case 'modulo':
    case '%':
      return modulo(a, b);
    case 'power':
    case '^':
      return power(a, b);
    case 'sqrt':
    case 'squareRoot':
      return squareRoot(a);
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function runCli(argv = process.argv.slice(2)) {
  const [operation, rawA, rawB] = argv;

  if (!operation || rawA === undefined) {
    console.error(
      'Usage: node src/calculator.js <operation> <a> [b]\nOperations: add, subtract, multiply, divide, modulo, power, sqrt'
    );
    process.exitCode = 1;
    return;
  }

  try {
    const a = toNumber(rawA, 'a');
    const needsSecondValue = !['sqrt', 'squareRoot'].includes(operation);
    const b = needsSecondValue ? toNumber(rawB, 'b') : undefined;
    const result = calculate(operation, a, b);
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
  modulo,
  power,
  squareRoot,
  calculate,
  runCli,
};
