module.exports = (fun) => (req, res, next) => {
  Promise.resolve(fun(req, res, next)).catch((e) => {
    console.log(e);
    next(e);
  });
};
