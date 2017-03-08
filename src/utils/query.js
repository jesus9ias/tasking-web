
export default (data) => {
  const qs = Object.keys(data).map((value) => {
    return [value, data[value]];
  });
  let querySring = '';
  qs.map((value, index) => {
    querySring += (index === 0) ? '?' : '';
    querySring += (index > 0) ? '&' : '';
    querySring += `${value[0]}=${value[1]}`;
    return querySring;
  });
  return querySring;
};
