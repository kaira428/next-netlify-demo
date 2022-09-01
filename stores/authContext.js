import { createContext, useState, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    netlifyIdentity.on('login', (user) => {
      setUser(user);
      netlifyIdentity.close();
      console.log('Login event');
    });

    netlifyIdentity.on('logout', () => {
      setUser(null);
      console.log('Logout event');
    });

    netlifyIdentity.on('init', () => {
      setAuthReady(true);
      console.log('event initialised')
    });

    // init netlify identity connection
    netlifyIdentity.init();

    // Clean up functions
    return () => {
        netlifyIdentity.off('login');
        netlifyIdentity.off('logout');
        netlifyIdentity.off('init');
    }
  }, [user]);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  }

  const context = { user, login, logout, authReady };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export default AuthContext;
