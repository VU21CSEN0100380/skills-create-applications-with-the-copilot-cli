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

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error('Cannot calculate square root of a negative number');
  }

  return Math.sqrt(value);
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
  const [operation, firstValue, secondValue] = argv;
  const unaryOperations = new Set(['sqrt', 'squareRoot']);

  if (
    !operation ||
    firstValue === undefined ||
    (!unaryOperations.has(operation) && secondValue === undefined)
  ) {
    console.error(
      'Usage: node src/calculator.js <add|subtract|multiply|divide|modulo|power> <number> <number>'
    );
    console.error('   or: node src/calculator.js <sqrt|squareRoot> <number>');
    process.exitCode = 1;
    return;
  }

  try {
    const firstNumber = toNumber(firstValue, 'First value');
    const result = unaryOperations.has(operation)
      ? calculate(operation, firstNumber)
      : calculate(operation, firstNumber, toNumber(secondValue, 'Second value'));

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
