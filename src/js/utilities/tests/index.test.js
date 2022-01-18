import { dateToString, stringToDate, dateStringReg } from '../utils.js';

describe('Tests for util functions: ', () => {
  it('dateToString should return dd/mm/yyyy format', () => {
    const DATE = new Date('2099-11-12');
    expect(dateToString(DATE)).toEqual('12/11/2099');
  });

  it('dateToString uses current time as argument fallback', () => {
    const DATE = new Date();
    expect(dateToString()).toMatch(dateStringReg);
  });

  it('stringToDate returns undefined if param is in wrong format', () => {
    expect(stringToDate(123)).toEqual(undefined);
  });

  it('stringToDate returns date format', () => {
    expect(stringToDate('11/11/1990')).toBeInstanceOf(Date);
  });
});
