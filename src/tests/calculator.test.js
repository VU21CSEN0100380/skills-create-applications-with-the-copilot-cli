const test = require('node:test');
const assert = require('node:assert/strict');

const calculator = require('../calculator');

function captureConsole() {
  const originalLog = console.log;
  const originalError = console.error;
  const logs = [];
  const errors = [];

  console.log = (...args) => {
    logs.push(args.join(' '));
  };

  console.error = (...args) => {
    errors.push(args.join(' '));
  };

  return {
    logs,
    errors,
    restore() {
      console.log = originalLog;
      console.error = originalError;
    },
  };
}

test('addition returns the sum of two numbers', () => {
  assert.equal(calculator.addition(2, 3), 5);
  assert.equal(calculator.addition(-4, 9), 5);
});

test('subtraction returns the difference of two numbers', () => {
  assert.equal(calculator.subtraction(10, 4), 6);
  assert.equal(calculator.subtraction(4, 10), -6);
});

test('multiplication returns the product of two numbers', () => {
  assert.equal(calculator.multiplication(45, 2), 90);
  assert.equal(calculator.multiplication(-3, 5), -15);
});

test('division returns the quotient of two numbers', () => {
  assert.equal(calculator.division(20, 5), 4);
  assert.equal(calculator.division(7, 2), 3.5);
});

test('division throws when dividing by zero', () => {
  assert.throws(() => calculator.division(20, 0), /Cannot divide by zero/);
});

test('modulo returns the remainder of two numbers', () => {
  assert.equal(calculator.modulo(20, 6), 2);
  assert.equal(calculator.modulo(-20, 6), -2);
});

test('power returns the first number raised to the second number', () => {
  assert.equal(calculator.power(2, 3), 8);
  assert.equal(calculator.power(9, 0.5), 3);
});

test('squareRoot returns the square root of a number', () => {
  assert.equal(calculator.squareRoot(25), 5);
  assert.equal(calculator.squareRoot(2), Math.sqrt(2));
});

test('squareRoot throws when passed a negative number', () => {
  assert.throws(() => calculator.squareRoot(-1), /Cannot calculate square root of a negative number/);
});

test('calculate supports the four basic operations', () => {
  assert.equal(calculator.calculate('add', 2, 3), 5);
  assert.equal(calculator.calculate('subtract', 10, 4), 6);
  assert.equal(calculator.calculate('multiply', 45, 2), 90);
  assert.equal(calculator.calculate('divide', 20, 5), 4);
});

test('calculate accepts math symbols for the four basic operations', () => {
  assert.equal(calculator.calculate('+', 2, 3), 5);
  assert.equal(calculator.calculate('-', 10, 4), 6);
  assert.equal(calculator.calculate('*', 45, 2), 90);
  assert.equal(calculator.calculate('/', 20, 5), 4);
});

test('calculate supports extended operations', () => {
  assert.equal(calculator.calculate('modulo', 20, 6), 2);
  assert.equal(calculator.calculate('power', 2, 3), 8);
  assert.equal(calculator.calculate('sqrt', 25), 5);
  assert.equal(calculator.calculate('squareRoot', 16), 4);
});

test('calculate throws for unsupported operations', () => {
  assert.throws(() => calculator.calculate('unknown', 10, 3), /Unsupported operation: unknown/);
});

test('runCli prints results for valid operations shown in the image', () => {
  const originalExitCode = process.exitCode;
  const capture = captureConsole();

  try {
    process.exitCode = undefined;
    calculator.runCli(['add', '2', '3']);
    calculator.runCli(['subtract', '10', '4']);
    calculator.runCli(['multiply', '45', '2']);
    calculator.runCli(['divide', '20', '5']);

    assert.deepEqual(capture.logs, ['5', '6', '90', '4']);
    assert.deepEqual(capture.errors, []);
    assert.equal(process.exitCode, undefined);
  } finally {
    capture.restore();
    process.exitCode = originalExitCode;
  }
});

test('runCli reports divide-by-zero errors', () => {
  const originalExitCode = process.exitCode;
  const capture = captureConsole();

  try {
    process.exitCode = undefined;
    calculator.runCli(['divide', '20', '0']);

    assert.deepEqual(capture.logs, []);
    assert.deepEqual(capture.errors, ['Cannot divide by zero']);
    assert.equal(process.exitCode, 1);
  } finally {
    capture.restore();
    process.exitCode = originalExitCode;
  }
});

test('runCli prints results for the extended operations', () => {
  const originalExitCode = process.exitCode;
  const capture = captureConsole();

  try {
    process.exitCode = undefined;
    calculator.runCli(['modulo', '20', '6']);
    calculator.runCli(['power', '2', '3']);
    calculator.runCli(['sqrt', '25']);

    assert.deepEqual(capture.logs, ['2', '8', '5']);
    assert.deepEqual(capture.errors, []);
    assert.equal(process.exitCode, undefined);
  } finally {
    capture.restore();
    process.exitCode = originalExitCode;
  }
});
