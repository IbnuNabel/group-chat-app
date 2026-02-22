window.Auth = (function () {
  const TOKEN_KEY = "groupchat_jwt_token";
  const USER_KEY = "groupchat_user_data";

  function getStorage() {
    if (localStorage.getItem(TOKEN_KEY)) return localStorage;
    if (sessionStorage.getItem(TOKEN_KEY)) return sessionStorage;
    return null;
  }

  function getToken() {
    const storage = getStorage();
    return storage ? storage.getItem(TOKEN_KEY) : null;
  }

  function getUser() {
    const storage = getStorage();
    const userStr = storage ? storage.getItem(USER_KEY) : null;
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  }

  function setSession({ token, user, remember }) {
    const storage = remember ? localStorage : sessionStorage;

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);

    storage.setItem(TOKEN_KEY, token);
    if (user) {
      storage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  }

  function buildAuthHeaders() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  function requireAuth(redirectTo) {
    const token = getToken();
    if (!token) {
      window.location.replace(redirectTo || "login.html");
    }
  }

  // Redirect otomatis \
  (function checkAccess() {
    const token = getToken();
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf("/") + 1);

    if ((page === "chat.html" || page === "") && !token) {
      window.location.replace("login.html");
    }

    if (page === "login.html" && token) {
      window.location.replace("chat.html");
    }
  })();

  return {
    getToken,
    getUser,
    setSession,
    clearSession,
    buildAuthHeaders,
    requireAuth,
  };
})();
