const checkPrice = (_: any, value: { number: number }) => {
  
    if (value.number > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Price must be greater than zero!'));
  };
  const checkPrice2 = (_: any, value:  number ) => {
    console.log(value)
    if (value > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Price must be greater than zero!'));
  };
  export { checkPrice,checkPrice2};