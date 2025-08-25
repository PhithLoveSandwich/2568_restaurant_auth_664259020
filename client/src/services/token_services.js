const getUser = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const setUser = (user) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Error saving user to localStorage:", error);
  }
};

const getLocalAccessToken = () => {
  const user = getUser();
  return user?.token || null; // กันกรณีไม่มี token
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const TokenService = {
  getUser,
  setUser,
  getLocalAccessToken,
  removeUser,
};

export default TokenService;
