export default ({ loading = jest.fn(), loader = jest.fn() }) => {
  // const isOkay = true;
  // if (isOkay) {
  //   return loading;
  // }
  if (loading) {
    return loading;
  }
  return loader;
};
