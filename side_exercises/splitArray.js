const splitArray = (arr) => {
  let halfSum = arr.reduce((prev, val) => (prev += val)) / 2;
  let checkArrayCombsSum = (
    subArray = arr,
    initialSum = 0,
    sumGoal = halfSum
  ) => {
    for (let i = 0; i < subArray.length; i++) {
      let currentSum = initialSum + subArray[i];
      if (currentSum === sumGoal) return true;
      if (checkArrayCombsSum(subArray.slice(i + 1), currentSum)) return true;
    }
    return false;
  };
  return checkArrayCombsSum();
};

console.log(splitArray([1, 2, 3, 4]));
