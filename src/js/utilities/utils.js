/**
 *
 * @param {string} dateString needs to be in dd/mm/yyyy
 * @returns date
 */
const stringToDate = (date = '') => {
  const dateString = `${date}`;
  if (!dateString.match(dateStringReg)) {
    return undefined;
  }
  const parts = dateString.split('/');
  return new Date(parts[2], parts[1] - 1, parts[0]);
};

/**
 *
 * @param {Date} date
 * @returns date in string format -> dd/mm/yyyy
 */
const dateToString = (date = new Date()) => `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

const dateStringReg = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;

export { dateToString, stringToDate, dateStringReg };
