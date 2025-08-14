const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

const getLocalAcessToken = () => {
    const user = getUser();
    return user?.token;
};

const removeUser = () => {
    localStorage.removeItem('user');
}

const TokenServices = {
    getUser,
    setUser,
    getLocalAcessToken,
    removeUser
};

export default TokenServices;