const createError = require("http-errors");

// 404 Not Found Handler
function notFoundHandler(req, res, next) {
    next(createError(404, "Your Requested Content Was Not Found!"));
}

// Default Error Handler
function errorHandler(err, req, res, next) {
    res.locals.error = process.env.NODE_ENV === 'development' ? err : {message: err.message};
    res.status(err.status || 500);
    if(res.locals.html){
        // HTML Response
        res.render("error", {
            title: "Error Page"
        });
    }
    else{
        res.json(res.locals.error);
    }
}

module.exports = {
    notFoundHandler,
    errorHandler,
}