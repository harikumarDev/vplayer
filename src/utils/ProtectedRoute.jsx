import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserStore } from "./store";

function ProtectedRoute({ children }) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const searchParams = window.location.href.split("?");
  const query = searchParams.length > 1 ? `?${searchParams[1]}` : "";

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Login to access this page.");
    }
  }, [isLoggedIn]);

  return isLoggedIn ? children : <Navigate replace to={`/login${query}`} />;
}

export default ProtectedRoute;
