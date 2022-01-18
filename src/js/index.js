import orderObject from '../../inputs/orders.json';
import productObject from '../../inputs/products.json';
import { getOrdersByDate, pickBestSellerOfDate, pickBestSellerOverPeriod } from '../js/functions/productSelector.js';

export default () => {
  const DATES = ['19/07/2021', '20/07/2021', '21/07/2021'];
  const { ordersByDate } = getOrdersByDate(orderObject, productObject);

  //Note: There is no need to save the returned value
  // as requirement is only to log results
  // while a function should always have explicit return(s);
  const arrayOfBestSeller = pickBestSellerOfDate(ordersByDate, DATES);
  const arrayOfOverallBestSeller = pickBestSellerOverPeriod(ordersByDate, 3);
};
