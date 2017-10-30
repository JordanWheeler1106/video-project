function dateToHash(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  }
}

function hashToDate(hash) {
  return new Date(hash.year, hash.month, hash.day);
}

function addedInfoToArray(addedInfo) {
  var result = [];
  for (key in addedInfo) {
    result.push(key);
    result.push(addedInfo[key])
  }
  return result;
}

function arrayToAddedInfo(array) {
  var result = {};
  var i = 0;
  if (array && array.length) {
    while (i<array.length) {
      result[array[i]] = array[i+1]
      i += 2;
    }
  }
  return result;
}
