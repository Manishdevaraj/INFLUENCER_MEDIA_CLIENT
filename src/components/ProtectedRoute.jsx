//@ts-nocheck
import { useEffect, useState } from "react";
import { useFirebase } from "../Service/Firebase.context.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../Service/Api.js";

function ProtectedRoute({ children }) {
  const { user } = useFirebase();
  const [dbUser, setDbUser] = useState(undefined); // undefined = loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        navigate("/auth"); // match your route
        return;
      }
      try {
        const u = await getUser(user.uid);
        setDbUser(u.user);
      } catch (err) {
        console.error(err);
        navigate("/auth"); // fallback if DB fetch fails
      }
    };
    fetchUser();
  }, [user, navigate]);

  // Show nothing or loader while fetching
  if (dbUser === undefined) return null;

  return <Outlet />;;
}

export default ProtectedRoute;
