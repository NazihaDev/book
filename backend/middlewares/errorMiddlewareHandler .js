const errorMiddlewareHandler = (err, req, res, next) => {
  //set status code
  const errorStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(errorStatusCode);
  res.json({
    message: err.message,
  });
};

module.exports = { errorMiddlewareHandler };

//naziha

/*const {body,validationResult} = require('express-validation');

exports.registerValidator = [
  body('email','please put a valid email').isEmail(),
  body('password','please put a password with min 6 caract').isLength({min:6})
]
  exports.loginValidator = [
    body('email','please put a valid email').isEmail(),
]
exports.validation = async(req,res,next) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  next()
}*/
