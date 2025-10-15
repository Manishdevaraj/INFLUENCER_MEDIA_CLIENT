//@ts-nocheck
import { useEffect, useState } from "react";
import { useFirebase } from "../Service/Firebase.context.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../Service/Api.js";

function ProtectedRoute() {
  const { user, dbUser, setDuser, loading } = useFirebase();
  const [fetching, setFetching] = useState(false);
  const navigate = useNavigate();

  // 🔹 Wait for Firebase to finish checking user before fetching from your API
  useEffect(() => {
    const fetchDbUser = async () => {
      if (user) {
        setFetching(true);
        try {
          console.log("Getting User");
          const res = await getUser(user.uid);

          setDuser(res.user);
        } catch (err) {
          console.error("Error fetching dbUser:", err);
        } finally {
          setFetching(false);
        }
      }
    };
    if (user) fetchDbUser();
  }, [user]);

  // 🔹 While Firebase is still initializing
  if (loading || fetching) {
    return <div>Loading...</div>;
  }

  // 🔹 After Firebase finishes loading but user not logged in
  if (!user && !loading) navigate("/auth");


  // 🔹 If dbUser still not found (e.g., first login or deleted record)
  if (!dbUser) {
    return <div>Setting up your profile...</div>;
  }

  // 🔹 All good, show the protected routes
  return <Outlet />;
}

export default ProtectedRoute;
