const jsonWebToken = require('jsonwebtoken');

const generateToken = (userId) => {
    return jsonWebToken.sign({id: userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d',
    })
}
module.exports = generateToken;