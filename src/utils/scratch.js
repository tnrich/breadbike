const _ = require("lodash");

const itemsByType = {
  "Cookie - Chocolate Chip": 1,
  "Loaf - Sourdough": 1,
  "Loaf - Country": 1,
  "Loaf - Walnut": 1,
};
let itemCountsDescription = "";
const b = _.forEach(
  // sort loaves/baguettes to the front
  _.sortBy(_.toPairs(itemsByType), ([type, quantity]) => {
    return type.includes("Loaf")
      ? -5
      : type.includes("Baguette")
      ? -4
      : type.includes("Cookie")
      ? -3
      : type.includes("Coffee")
      ? -2
      : type.includes("Fromage Blanc")
      ? -1
      : 0;
  }),
  ([type, quantity]) => {
    itemCountsDescription += `${quantity} ${type}, `;
  }
);
console.log(`b:`, b);
console.log(`itemCountsDescription:`, itemCountsDescription);
