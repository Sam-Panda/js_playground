//// Get a free API Key here: https://exchangeratesapi.io/
import fs from 'node:fs/promises';
// Global variables ------------------------------------------------------

let employees = [];
let currencyData;

// currency data

const getCurrencyConversionData = async () => {
  const headers = new Headers();
  // headers.append("access_key" , "522d666156e89bf1614ef94f99331365")
  const options = {
    method: "GET",
    redirect: "follow",
    base: "USD",
    headers,
  };
  // concatenate access_key variable
  let access_key = "522d666156e89bf1614ef94f99331365";

  const response = await fetch(
    `https://api.exchangeratesapi.io/v1/latest?access_key=${access_key}`,
    options
  );
  if (!response.ok) {
    console.log(response);
    throw new Error("Cannot fetch the currency data");
  }
  currencyData = await response.json();
};

const getSalary = (amountEUR, currency) => {
  const amount =
    currency === "EUR" ? amountEUR : amountEUR * currencyData.rates[currency];
  const formatter = Intl.NumberFormat("en-EU", {
    style: "currency",
    currency: currency,
  });
  return formatter.format(amount);
};
// Import Sample Data
// import employees from './data.json' with { type: 'json' }

// Loading and writing data to the filesystem ----------------------------

const loadData = async () => {
  console.log("Loading employees.....");
  try {
    const fileData = await fs.readFile("./data.json");
    employees = JSON.parse(fileData);
  } catch (err) {
    console.error("Cannot load in employees");
    throw err;
  }
};

const writeData = async () => {
  console.log("Writing employees.....");
  try {
    await fs.writeFile("./data.json", JSON.stringify(employees, null, 2));
  } catch (err) {
    console.error("Cannot write employees data.");
    throw err;
  }
};

import createPrompt from "prompt-sync";
let prompt = createPrompt();

const logEmployee = (employee) => {
  Object.entries(employee).forEach((entry) => {
    console.log(`${entry[0]}: ${entry[1]}`);
  });
  console.log(`Salary EUR: ${getSalary(employee.salaryEUR, "EUR")}`);
  console.log(
    `Local Salary: ${getSalary(employee.salaryEUR, employee.localCurrency)}`
  );
};

function getInput(promptText, validator, transformer) {
  let value = prompt(promptText);
  if (validator && !validator(value)) {
    console.error(`--Invalid input`);
    return getInput(promptText, validator, transformer);
  }
  if (transformer) {
    return transformer(value);
  }
  return value;
}

const getNextEmployeeID = () => {
  const maxID = Math.max(...employees.map((e) => e.id));
  return maxID + 1;
};

// Validator functions ---------------------------------------------------

const isCurrencyCodeValid = function (code) {
  const currencyCodes = Object.keys(currencyData.rates);
  return currencyCodes.indexOf(code) > -1;
};

const isStringInputValid = (input) => {
  return input ? true : false;
};

const isBooleanInputValid = function (input) {
  return input === "yes" || input === "no";
};

const isIntegerValid = (min, max) => {
  return (input) => {
    let numValue = Number(input);
    if (!Number.isInteger(numValue) || numValue < min || numValue > max) {
      return false;
    }
    return true;
  };
};

// Application commands --------------------------------------------------

function listEmployees() {
  console.log(`Employee List ----------------------------`);
  console.log("");

  employees.every((e) => {
    logEmployee(e);
    let prompt1 = prompt(
      'Press enter to continue..., or type "exit" to exit :::: '
    );
    if (prompt1.toLowerCase() == "exit") {
      console.log(prompt1);
      return false;
    }
  });
  console.log(`Employee list completed`);
}

async function addEmployee() {
  console.log(`Add Employee -----------------------------`);
  console.log("");
  let employee = {};
  employee.firstName = getInput("First Name: ", isStringInputValid);
  employee.lastName = getInput("Last Name: ", isStringInputValid);
  let startDateYear = getInput(
    "Employee Start Year (1990-2023): ",
    isIntegerValid(1990, 2023)
  );
  let startDateMonth = getInput(
    "Employee Start Date Month (1-12): ",
    isIntegerValid(1, 12)
  );
  let startDateDay = getInput(
    "Employee Start Date Day (1-31): ",
    isIntegerValid(1, 31)
  );
  employee.startDate = new Date(
    startDateYear,
    startDateMonth - 1,
    startDateDay
  );
  employee.isActive = getInput(
    "Is employee active (yes or no): ",
    isBooleanInputValid,
    (i) => i === "yes"
  );
  employee.salaryEUR = getInput(
    "Annual salary in EUR: ",
    isIntegerValid(10000, 1000000)
  );
  employee.localCurrency = getInput(
    "Local currency (3 letter code): ",
    isCurrencyCodeValid
  );
  employees.push(employee);
  await writeData();

  // Output Employee JSON
  const json = JSON.stringify(employee, null, 2);
  console.log(`Employee: ${json}`);
}

// Search for employees by id
function searchById() {
  const id = getInput("Employee ID: ", null, Number);
  const result = employees.find((e) => e.id === id);
  if (result) {
    console.log("");
    logEmployee(result);
  } else {
    console.log("No results...");
  }
}

// Search for employees by name
function searchByName() {
  const firstNameSearch = getInput("First Name: ").toLowerCase();
  const lastNameSearch = getInput("Last Name: ").toLowerCase();
  const results = employees.filter((e) => {
    if (
      firstNameSearch &&
      !e.firstName.toLowerCase().includes(firstNameSearch)
    ) {
      return false;
    }
    if (lastNameSearch && !e.lastName.toLowerCase().includes(lastNameSearch)) {
      return false;
    }
    return true;
  });
  results.forEach((e, idx) => {
    console.log("");
    console.log(
      `Search Result ${idx + 1} -------------------------------------`
    );
    logEmployee(e);
  });
}

// Application execution -------------------------------------------------

// Get the command the user wants to exexcute
const main = async () => {
  const command = process.argv[2].toLowerCase();

  switch (command) {
    case "list":
      listEmployees();
      break;

    case "add":
      addEmployee();
      break;

    case "search-by-id":
      searchById();
      break;

    case "search-by-name":
      searchByName();
      break;

    case "get-currency-data":
      await getCurrencyConversionData();
      console.log(currencyData);

    default:
      console.log("Unsupported command. Exiting...");
      process.exit(1);
  }
};

Promise.all([loadData(), getCurrencyConversionData()])
  .then(main)
  .catch((err) => {
    console.error("Cannot complete startup.");
    throw err;
  });
