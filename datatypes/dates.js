// Creating dates
let date1 = new Date("2023-01-01");
console.log(date1);
let date2 = new Date("January 1, 2023");
console.log(date2);
let date3 = new Date(); // now
console.log(date3);
let date4 = new Date("2023-01-01T02:30:04.312-05:00");
console.log(date4);
let date5 = new Date(2023, 0, 1, 2, 30, 4);
console.log(date5);

// Accessing elements from a date
console.log(`Full Year: ${date5.getFullYear()}`);
console.log(`Month (zero-indexed): ${date5.getMonth()}`);
console.log(`Day of month: ${date5.getDate()}`);
console.log(`Hours: ${date5.getHours()}`);

// Milliseconds from the epoch
console.log(`Time: ${date5.getTime()}`);
let date6 = new Date(0);
console.log(date6.toUTCString());
