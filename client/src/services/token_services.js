const getUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user'));
    } catch (e) {
        return null;
    }
};

// Normalize user object stored in localStorage so other parts of app
// (e.g. Navbar) can expect user.username, user.name, user.email, user.token
const setUser = (user) => {
    if (!user) return;
    const normalized = {
        // prefer top-level fields, fall back to nested userinfo
        username: user.username || user.userinfo?.username || "",
        name: user.name || user.userinfo?.name || "",
        email: user.email || user.userinfo?.email || "",
        token: user.token || user.accessToken || user.userinfo?.token || "",
    };
    localStorage.setItem('user', JSON.stringify(normalized));
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