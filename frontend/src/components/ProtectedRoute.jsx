// Front-end protection route

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);

      if (!token) {
        setIsAuthorized(false);
        return;
      }

      const decoded = jwtDecode(token);

      // Check if the access token is expired or not
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000; //To get now in seconds
      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        setIsAuthorized(true);
      }
    };

    auth().catch(() => setIsAuthorized(false));
  }, [])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      }
    } catch (error) {
      console.log(`error in refreshToken: ${error}`);
      setIsAuthorized(false);
    }
  };


  if (isAuthorized === null) return <div>Loading...</div>;

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
