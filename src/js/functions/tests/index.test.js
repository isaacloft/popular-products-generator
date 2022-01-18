import { flattenOrders, validateOrders, pickBestSellerOfDate, pickBestSellerOverPeriod } from '../productSelector.js';
import orderObject from '../../../../inputs/orders.json';
import productObject from '../../../../inputs/products.json';

import flattenedOrders from './data/flattenedOrders.json';
import validOrders from './data/validOrders.json';

describe('Tests for product selector functions: ', () => {
  it('flattenOrders should return correct data', () => {
    const result = flattenOrders(orderObject, productObject);
    expect(result).toEqual(flattenedOrders);
  });

  it('flattenOrders returns expected values if wrong params are used', () => {
    const result1 = flattenOrders(1, 1);
    const result2 = flattenOrders();

    expect(result1).toEqual(undefined);
    expect(result2).toEqual([]);
  });

  it('validateOrders should return correct data', () => {
    const result = validateOrders(flattenedOrders);
    expect(result).toEqual(validOrders);
  });

  it('validateOrders returns expected values if wrong params are used', () => {
    const result1 = validateOrders(1, 1);
    const result2 = validateOrders();
    expect(result1).toEqual(undefined);
    expect(result2).toEqual([]);
  });

  it('pickBestSellerOfDate returns expected values if wrong params are used', () => {
    const result1 = pickBestSellerOfDate(1, 1);
    const result2 = pickBestSellerOfDate();
    expect(result1).toEqual(undefined);
    expect(result2).toEqual(undefined);
  });

  it('pickBestSellerOverPeriod returns expected values if wrong params are used', () => {
    const result1 = pickBestSellerOverPeriod(1, 1);
    const result2 = pickBestSellerOverPeriod();
    expect(result1).toEqual(undefined);
    expect(result2).toEqual(undefined);
  });
});
