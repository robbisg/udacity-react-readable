export const arrayToObject = (arr) =>
   arr.reduce((obj, item) => {
     obj[item.id] = item
     return obj
   }, {})
