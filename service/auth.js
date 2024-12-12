const jwt = require("jsonwebtoken");

const secret = "Demongod$123$";

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret);
}

function getUser(token) {
    if (!token || token.split('.').length !== 3) {
        return null;
    }
    try {
        return jwt.verify(token, secret);
    } 
    catch (err) {
        console.error("JWT Verification Error:", err.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}