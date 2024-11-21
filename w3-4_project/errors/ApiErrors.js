const ApiError = require('.')

class Api404 extends ApiError {
    constructor(message) {
        super(404, message)
    }
}

class Api500 extends ApiError {
    constructor(message) {
        super(500, message)
    }
}

class MongooseError extends ApiError {
    constructor(message) {
        super(400, message)
    }
}

module.exports = {
    Api404,
    Api500,
    MongooseError
}