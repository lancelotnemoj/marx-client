export default (array, calculater) => {
  const success = [],
    failure = [];
  array.forEach(element => {
    const result = calculater(element);
    if (result === true) {
      success.push(element);
    } else {
      failure.push(element);
    }
  });
  return { success, failure };
};
