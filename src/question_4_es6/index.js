/**
 *
 * i) Find the total cost of all products with
 * using vanilla JS (ES6) quantity > n like , CostOfProductForQtyGreaterThan(n)
 * e.g., CostOfProductForQtyGreaterThan(100)
 *
 * ii) Write a function that can take a product name and return the total cost.
 * e.g., CostOfProduct('ipad') should output 7000
 */

let productCart = [
  { productname: "iphone-x", qty: 10, price: 1000 },
  { productname: "macbook pro", qty: 200, price: 2000 },
  { productname: "iwatch", qty: 100, price: 550 },
  { productname: "macbook air", qty: 100, price: 1000 },
  { productname: "iphone 8", qty: 300, price: 700 },
  { productname: "iphone 7", qty: 100, price: 550 },
  { productname: "ipad Retina", qty: 20, price: 1000 },
  { productname: "ipad", qty: 10, price: 700 },
  { productname: "Magic Mouse", qty: 50, price: 300 },
  { productname: "Magic Trackpad", qty: 75, price: 200 }
];

/**
 * Takes quantity of product and returns total cost of all products
 * exceeding that quantity.
 * @param qty
 * @returns {*|number}
 * @constructor
 */
export const CostOfProductForQtyGreaterThan = qty => {
  return productCart.reduce((accumulator, productentry) => {
    if (productentry.qty > qty) {
      return (accumulator += productentry.price);
    }
    return accumulator;
  }, 0);
};

/**
 * Takes a product name and returns the total cost of quantity available.
 * @param productname
 * @returns {*|number}
 * @constructor
 */
export const CostOfProduct = productname => {
  return productCart.reduce((accumulator, productentry) => {
    if (productname.toLowerCase() === productentry.productname.toLowerCase()) {
      return (accumulator += productentry.qty * productentry.price);
    }
    return accumulator;
  }, 0);
};
