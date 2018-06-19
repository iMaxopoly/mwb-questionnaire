/*
* var expense = { type : 'Business', amount: '$50' }
* var type = expense.type;
* var amount = expense. amount;
*
* Write the above using ES6 conventions.
* */

const expense = {
  type: "Business",
  amount: "$50"
};

export const { type, amount } = expense;
