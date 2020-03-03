function errorHandler(error, request, response, next){
    console.log("hello-------222------");
    return response.status(error.status || 500).json({
        error:{
            message: error.message || "Oops! Something went wrong."
        }
    });
}

module.exports = errorHandler;