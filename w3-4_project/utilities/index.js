exports.HandleError = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

exports.validateDate = function (date, d="Date") {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(date)) {
      throw new Error(`${d} must be in the format MM/DD/YYYY`);
    } else if (new Date(date) > new Date()) {
      throw new Error(`${d} cannot be in the future`);
    } else {
      return true;
    }
  }