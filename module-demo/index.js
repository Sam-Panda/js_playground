import chalk from 'chalk';
import { logObject, numEmployeesLogged } from './logging.js';

// console.log(`${chalk.blue.bold('First Name: ')} David`);
// console.log(`${chalk.green.bold('Last Name: ')} Tucker`);

const employee = {
  id: 0,
  email: "lauren_shaffer@globomantics.com",
  firstName: "Lauren",
  lastName: "Shaffer",
  salaryUSD: 246463,
  localCurrency: "PEN",
  dateBirth: "1988-02-08",
  startDate: "2006-02-14",
  isActive: true
};

logObject(employee);
logObject(employee);
console.log(`${chalk.red('Employees Logged: ')} ${chalk.gray.bold(numEmployeesLogged)}`);
