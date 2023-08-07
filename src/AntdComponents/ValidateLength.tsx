const validateLength = (_:any, value:any) => {
    if (value && value.length < 5) {
      return Promise.reject('Ít nhất 3 kí tự');
    }
    return Promise.resolve();
  };
  const validateCustomLength = (n:number) =>(_:any, value:any) => {
    if (value && value.length < n) {
      return Promise.reject(`Phải có ít nhất ${n} kí tự`);
    }
    return Promise.resolve();
  };
  export {validateLength,validateCustomLength} 