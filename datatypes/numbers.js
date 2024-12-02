// Define number values
let num1 = 6;
let num2 = -1000000;
let num3 = 1.234567;

// Defining big and small numbers
let num4 = 1560000000000000000000;
console.log(num4);
let num5 = -0.0000000000000000021;
console.log(num5);

// Creating numbers with e-notation
let num6 = 1.2e+10;
console.log(num6);

// How big and small can we get with the number type
console.log(`Minimum Value: ${Number.MIN_VALUE}`);
console.log(`Minimum Safe Integer: ${Number.MIN_SAFE_INTEGER}`);
console.log(`Maximum Value: ${Number.MAX_VALUE}`);
console.log(`Maximum Safe Integer: ${Number.MAX_SAFE_INTEGER}`);

// Creating BigInt's
let bigInt1 = 1n;
let bigInt2 = 1_560_000_000_000_000_000_000n;
