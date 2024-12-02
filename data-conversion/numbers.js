// Rounding number to an integer
let num1 = 5.618345;
console.log(`Round: ${Math.round(num1)}`);
console.log(`Ceiling: ${Math.ceil(num1)}`);
console.log(`Floor: ${Math.floor(num1)}`);

// Fixed
let fixed = num1.toFixed(3);
console.log(`Fixed Type: ${typeof(fixed)} Fixed Value: ${fixed}`);

// Display in locale-specific format
let num2 = 1_000_000;
console.log(`USA: ${num2.toLocaleString('en-US')}`);
console.log(`Greece: ${num2.toLocaleString('el-EL')}`);
console.log(`Bangladesh: ${num2.toLocaleString('bg-BG')}`);
console.log(`Punjab: ${num2.toLocaleString('pa-PA')}`);

// Intl Format Currency
let salary = 100000;
let monthlySalary = salary / 12;
console.log(`Monthly Salary: ${monthlySalary.toFixed(2)}`);


let formatter1 = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
console.log(`US Dollars: ${formatter1.format(monthlySalary)}`);

let formatter2 = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
console.log(`Euros: ${formatter2.format(monthlySalary)}`);

let formatter3 = new Intl.NumberFormat('ja-JA', { style: 'currency', currency: 'JPY' });
console.log(`Yen: ${formatter3.format(monthlySalary)}`);

let formatter4 = new Intl.NumberFormat('zh-HK', { style: 'currency', currency: 'HKD' });
console.log(`Hong Kong Dollars: ${formatter4.format(monthlySalary)}`);
