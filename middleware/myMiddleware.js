module.exports = function(req, res, next) { //* middleware is a function that takes in 3 parameters (req, res, next)
    console.log(`Time: ${Date.now()}`); 
    next();
  }