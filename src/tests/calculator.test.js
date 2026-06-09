const test = require('node:test');
const assert = require('node:assert/strict');

const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
  runCli,
} = require('../calculator');

function captureConsole(fn) {
  const logs = [];
  const errors = [];
  const originalLog = console.log;
  const originalError = console.error;
  const originalExitCode = process.exitCode;

  console.log = (...args) => logs.push(args.join(' '));
  console.error = (...args) => errors.push(args.join(' '));

  try {
    fn();
  } finally {
    console.log = originalLog;
    console.error = originalError;
    process.exitCode = originalExitCode;
  }

  return { logs, errors };
}

test('basic operations still work', () => {
  assert.equal(addition(2, 3), 5);
  assert.equal(subtraction(9, 4), 5);
  assert.equal(multiplication(6, 7), 42);
  assert.equal(division(8, 2), 4);
});

test('modulo returns the remainder', () => {
  assert.equal(modulo(10, 3), 1);
});

test('modulo by zero throws an error', () => {
  assert.throws(() => modulo(10, 0), /Cannot modulo by zero/);
});

test('power returns base raised to exponent', () => {
  assert.equal(power(2, 4), 16);
});

test('square root returns the principal root', () => {
  assert.equal(squareRoot(81), 9);
});

test('square root of negative number throws an error', () => {
  assert.throws(
    () => squareRoot(-1),
    /Cannot take square root of a negative number/
  );
});

test('calculate supports modulo, power, and square operations', () => {
  assert.equal(calculate('modulo', 10, 4), 2);
  assert.equal(calculate('%', 10, 4), 2);
  assert.equal(calculate('power', 3, 3), 27);
  assert.equal(calculate('^', 3, 3), 27);
  assert.equal(calculate('sqrt', 25), 5);
  assert.equal(calculate('squareRoot', 25), 5);
});

test('runCli prints result for new operations', () => {
  const moduloOutput = captureConsole(() => runCli(['modulo', '10', '6']));
  assert.deepEqual(moduloOutput.logs, ['4']);
  assert.deepEqual(moduloOutput.errors, []);

  const powerOutput = captureConsole(() => runCli(['power', '2', '5']));
  assert.deepEqual(powerOutput.logs, ['32']);
  assert.deepEqual(powerOutput.errors, []);

  const sqrtOutput = captureConsole(() => runCli(['sqrt', '36']));
  assert.deepEqual(sqrtOutput.logs, ['6']);
  assert.deepEqual(sqrtOutput.errors, []);
});

test('runCli handles new operation errors', () => {
  const moduloError = captureConsole(() => runCli(['modulo', '10', '0']));
  assert.deepEqual(moduloError.logs, []);
  assert.deepEqual(moduloError.errors, ['Cannot modulo by zero']);

  const sqrtError = captureConsole(() => runCli(['sqrt', '-9']));
  assert.deepEqual(sqrtError.logs, []);
  assert.deepEqual(sqrtError.errors, [
    'Cannot take square root of a negative number',
  ]);
});
