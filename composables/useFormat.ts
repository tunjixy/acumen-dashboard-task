export default function useFormat() {
  function formatNumberWithComma(number: string | number) {
    return number
      ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : '0'
  }

  function formatDate(date: string) {
    if (date) {
      return useDateFormat(date, 'Do MMM, YYYY').value
    }
  }

  function dynamicSort(property: string, order: string) {
    let sortOrder = 1
    if (order === 'desc') {
      sortOrder = -1
    }
    return function (a: any, b: any) {
      if (a[property] < b[property]) {
        return -1 * sortOrder
      } else if (a[property] > b[property]) {
        return 1 * sortOrder
      } else {
        return 0 * sortOrder
      }
    }
  }

  return {
    formatNumberWithComma,
    formatDate,
    dynamicSort,
  }
}
