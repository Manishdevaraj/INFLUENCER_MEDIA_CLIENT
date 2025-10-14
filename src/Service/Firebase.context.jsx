//@ts-nocheck
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { auth, googleAuthProvider } from "./Firebase.config";
import {getUser} from "./Api";
import {useNavigate} from "react-router-dom";
const FirebaseContext = createContext();
export const FirebaseProvider=({children})=>
{
    const [user,setUser]=useState();
    const [dbUser,setDuser]=useState();
    const [googleLoading, setgoogleLoading] = useState(false);
    const [googleError, setgoogleError] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
              const unSubscribe = onAuthStateChanged(auth, async (user) => {
                // console.log("Auth state changed:", user);
                setUser(user);

                if (user) {
                  const u = await getUser(user.uid);
                  setDuser(u.user);
                } else {
                  setDuser(null);
                }
              });

          return () => unSubscribe();
        }, []);


    const signInWithGoogle = useCallback(async () => {
  setgoogleLoading(true);
  setgoogleError(null);

  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    const user = result.user;
    setUser(user);
    return user;
  } catch (err) {
    // console.log(err);
    setgoogleError(err);
    setUser(null);
  } finally {
    setgoogleLoading(false);
  }
}, []);

    async function logout()
             {
                 try {
                     await auth.signOut();
                     console.log('User signed out successfully!');
                     setUser(null);
                     setDuser(null);
                     navigate('/');
                     
                     
                   } catch (error) {
                     console.error('Error signing out:', error);
                     
                   }
                 
             }
         

   return <FirebaseContext.Provider value={{user,dbUser,setUser,signInWithGoogle,googleLoading,googleError,logout}}>
    {children}
   </FirebaseContext.Provider>
}

export const useFirebase = () => useContext(FirebaseContext);

