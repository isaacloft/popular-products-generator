import _ from 'lodash';
import { dateToString, stringToDate } from '../utilities/utils.js';

const TODAY = '21/07/2021';

/**
 * @description flatten and validate array of orders, grouped by all available order date
 * @param {array} originalOrders example orders json
 * @param {array} productObject example products json
 * @returns Array of order objects
 */
const getOrdersByDate = (originalOrders, productObject) => {
  return { ordersByDate: _.groupBy(validateOrders(flattenOrders(originalOrders, productObject)), (order) => order.date) };
};

/**
 * @description flatten the original order array
 * @param {array} originalOrders example orders json
 * @param {array} productObject example products json
 * @returns Array of order objects
 */
const flattenOrders = (originalOrders, productObject) => {
  let flattenedOrders = [];
  originalOrders.forEach((order) => {
    if (order.status === 'completed') {
      order.entries.forEach((entry) => {
        const productName = _.find(productObject, { id: entry['id'] })['name'];
        const structuredOrder = { ..._.cloneDeep(_.omit(entry, ['id'])), ...{ productId: entry.id, date: order.date, customerId: order.customerId, productName } };
        flattenedOrders.push(structuredOrder);
      });
    }
  });

  return flattenedOrders;
};

/**
 *
 * @description take flattened order array and remove invalid orders
 * Note: Multiple orders of the same product for the same customer on the same day are not considered
 * @param {array} orders
 * @returns valid orders
 */
const validateOrders = (orders) => {
  const groupedOrders = _.groupBy(orders, (order) => `${order.productId}|${order.date}|${order.customerId}`);
  const cleanedOrders = [];
  for (const key in groupedOrders) {
    const ordersList = groupedOrders[key];
    if (ordersList.length === 1) {
      cleanedOrders.push(ordersList[0]);
    }
  }
  return cleanedOrders;
};

/**
 * @description For each date in dates array, find out the best seller of that date
 * @param {array} orders flattened and valid array of orders, ordered by date
 * @param {array} dates array of date in string
 * @returns array of best sellers
 */
const pickBestSellerOfDate = (orders = [], dates = []) => {
  if (orders.length === 0 || dates.length < 1) return undefined;

  const sorted = [];

  dates.forEach((date) => {
    // number of quantity in descending order
    // alphebetic product names in ascending order
    const sortedOrders = _.orderBy(orders[date], ['quantity', 'productName'], ['desc', 'asc']);
    sorted.push(sortedOrders[0]);
    console.info(`${date}: ${sortedOrders[0].productName}`);
  });

  return sorted;
};

/**
 * @description find out the best selling product over provided days
 * @param {array} orders flattened and valid array of orders, ordered by date
 * @param {number} numberOfDays N number of days used to find out the best seller
 * @returns sorted array of best sellers of given days
 */
const pickBestSellerOverPeriod = (orders = [], numberOfDays = 2) => {
  if (numberOfDays < 2) {
    console.warn(`** Warning: Period has to be at least two days **`);
    return [];
  }

  const arrayOfOrderDates = [TODAY];
  const today = stringToDate(TODAY);
  const resultInObj = {};
  const sortableResult = [];

  for (let i = numberOfDays; i > 1; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i + 1);
    arrayOfOrderDates.push(dateToString(day));
  }
  arrayOfOrderDates.forEach((dateString) => {
    const ordersOfDate = orders[dateString];

    if (!ordersOfDate) {
      console.warn(`** Warning: Cannot find orders for ${dateString} **`);
    } else {
      orders[dateString].forEach((order) => {
        if (resultInObj.hasOwnProperty(order.productId)) {
          resultInObj[order.productId]['quantity'] += order.quantity;
        } else {
          resultInObj[order.productId] = { quantity: order.quantity, productName: order.productName };
        }
      });
    }
  });
  for (const item in resultInObj) {
    sortableResult.push([item, resultInObj[item].quantity, resultInObj[item].productName]);
  }
  sortableResult.sort((a, b) => a[1] - b[1]).reverse();
  console.info(`Last ${numberOfDays} days: ${sortableResult[0][2]}`);
  return sortableResult;
};

export { getOrdersByDate, pickBestSellerOfDate, pickBestSellerOverPeriod };
