import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { refreshToken } from "../utils/api";

export const AuthContext = createContext({});

const AuthProvider = (props) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(false);

  const isValidToken = async () => {
    try {
      const authData = await refreshToken();
      if (authData.error) {
        setIsAuthenticated(false);
        router.push("/login");
        throw new Error("Error during auth");
      } else {
        setIsAuthenticated(true);
        setUser(authData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isValidToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
