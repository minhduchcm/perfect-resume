export default errors => {
  let results = {};
  errors.forEach(error => {
    results[error.param] = error.msg;
  });
  return results;
};
