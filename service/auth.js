const sessionIdUser = new Map();

function setUser(id, user) {
    sessionIdUser.set(id, user);
}

function getUser(id) {
    return sessionIdUser.get(id);
}

module.exports = {
    setUser,
    getUser,
}