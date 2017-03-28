
const errors = {
  0(msg) {
    return msg || 'An unexpected error has ocurred';
  },
  404(msg) {
    return msg || 'Data not found';
  }
};

export default (code, msg = null) => {
  return errors[code](msg) || [0](msg);
};
