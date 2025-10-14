
//@ts-nocheck

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Alert, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";
import { useTheme } from "./theme-provider";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Moon,
  Sun,
} from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";


import {
  useSignInWithEmailAndPassword,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import {  updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {auth,db} from "../Service/Firebase.config.js"
import {useFirebase} from "../Service/Firebase.context.jsx"
import { getUser, registerUser } from "@/Service/Api.js";
export function AuthPage() {
  const { theme, toggleTheme } = useTheme();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {signInWithGoogle,googleLoading,googleError,user}=useFirebase();
  // firebase hooks
  const [
    signInWithEmailAndPassword,
    signInUser,
    signInLoading,
    signInError,
  ] = useSignInWithEmailAndPassword(auth);
  const [
    createUserWithEmailAndPassword,
    createdUser,
    createLoading,
    createError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [clientMessage, setClientMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    companyName: "",
  });

  // validation helpers
  const emailRegex =
    // simple but effective regex
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const minPasswordLen = 6;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (clientMessage.type) setClientMessage({ type: null, text: "" });
  };

 const [searchParams,setSearchParams] = useSearchParams();
const paramType = searchParams.get("type"); // "influencer" or "brand"

const [userType, setUserType] = useState<'brand' | 'influencer'>(
  paramType === 'influencer' ? 'influencer' : 'brand'
);;

  // if sign in/up succeed -> redirect (once firebase user available)
  useEffect(() => {
    if (signInUser || createdUser  ) {
      // redirect to dashboard
      setTimeout(async()=>{
        if(authMode==='signup'){
        navigate(`/${userType}-dashboard`);}
        else
        {
          const data=await getUser(user.uid);
          console.log(data);
          navigate(`/${data.user.role}-dashboard`);
        }
      },1000)
    }
  }, [signInUser, createdUser, navigate, user, userType, authMode]);

  const showErrorFromFirebase = (err: any) => {
    console.log(err.code);
    if (!err) return null;
    // firebase error object has message property
    let message;
     switch (err.code) {
        case "auth/invalid-credential":
          message =
            "Invalid email or password. Please check your credentials and try again.";
          break;
        case "auth/user-not-found":
          message = "No account found with this email. Please sign up first.";
          break;
        case "auth/wrong-password":
          message = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          message = "Invalid email format.";
          break;
        case "auth/email-already-in-use":
          message = "This email is already registered. Please sign in instead.";
          break;
        case "auth/weak-password":
          message = "Password is too weak. Try a stronger one.";
          break;
     }
       return message;
   
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientMessage({ type: null, text: "" });

    // Client-side validation
    if (!formData.email || !formData.password) {
      setClientMessage({
        type: "error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setClientMessage({ type: "error", text: "Please enter a valid email." });
      return;
    }

    if (formData.password.length < minPasswordLen) {
      setClientMessage({
        type: "error",
        text: `Password must be at least ${minPasswordLen} characters.`,
      });
      return;
    }

    if (authMode === "signup") {
      if (formData.password !== formData.confirmPassword) {
        setClientMessage({ type: "error", text: "Passwords do not match." });
        return;
      }
      if (!formData.firstName || !formData.lastName) {
        setClientMessage({
          type: "error",
          text: "Please provide your first and last name.",
        });
        return;
      }
      if (userType === "brand" && !formData.companyName) {
        setClientMessage({
          type: "error",
          text: "Please provide your company name.",
        });
        return;
      }

     
        const creds = await createUserWithEmailAndPassword(
          formData.email,
          formData.password
        );
        // createUserWithEmailAndPassword from react-firebase-hooks returns a Promise that resolves
        // but hooks wrapper sometimes returns user in `createdUser`. For safety handle update here if creds available.
        const user = creds?.user ?? createdUser?.user;
        if (user) {
          // update displayName
          const displayName = `${formData.firstName} ${formData.lastName}`;
          await updateProfile(user, { displayName });

          // create a user document in firestore
          const userDocRef = doc(db, "users", user.uid);
          await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            displayName,
            firstName: formData.firstName,
            lastName: formData.lastName,
            userType,
            companyName: formData.companyName || null,
            createdAt: serverTimestamp(),
          });
          if (!user) return; // stop if no user

        const userData = {
          uid: user.uid,
          email: user.email!,
          name: `${formData.firstName} ${formData.lastName}`,
          role: userType ?? "influencer",
        };
        await registerUser(userData);
                  setClientMessage({
                    type: "success",
                    text: "Account created. Redirecting...",
                  });
          // navigate will run via useEffect because createdUser becomes truthy
        } else {
          // If createdUser not present yet, let the hook handle state; provide user feedback.
          setClientMessage({
            type: "success",
            text: "Account created. Finalizing...",
          });
        }
      }
      else {
      // login
    
        await signInWithEmailAndPassword(formData.email, formData.password);
        setClientMessage({ type: "success", text: "Login successful. Redirecting..." });
        // navigate will run in useEffect when signInUser becomes available
      
    }
  };

  // aggregate loading and errors
  const isLoading = signInLoading || createLoading;
  const firebaseError = signInError || createError;
  const finalErrorText = firebaseError ? showErrorFromFirebase(firebaseError) : clientMessage.text;
  const finalErrorType = firebaseError ? "error" : clientMessage.type;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900/20 dark:via-background dark:to-pink-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>

        {/* Brand */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <span className="font-bold text-2xl">InfluenceHub</span>
          </div>
          <p className="text-muted-foreground">Connect. Create. Grow.</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-4">
            <Tabs
              value={authMode}
              onValueChange={(value) => setAuthMode(value as "login" | "signup")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* User Type */}
            {authMode==='signup'&&<div className="flex items-center justify-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Building className={`h-4 w-4 ${userType === "brand" ? "text-purple-600" : "text-muted-foreground"}`} />
                <span className={userType === "brand" ? "font-medium text-purple-600" : "text-muted-foreground"}>
                  Brand
                </span>
              </div>
              <Switch
                    checked={userType === "influencer"}
                    onCheckedChange={(checked) => {
                      const newType = checked ? "influencer" : "brand";
                      setUserType(newType);
                      setSearchParams({ type: newType }); // <-- updates URL
                    }}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
                  />
              <div className="flex items-center space-x-2">
                <User className={`h-4 w-4 ${userType === "influencer" ? "text-pink-600" : "text-muted-foreground"}`} />
                <span className={userType === "influencer" ? "font-medium text-pink-600" : "text-muted-foreground"}>
                  Influencer
                </span>
              </div>
            </div>}
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login (keeps your earlier stub) */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full h-11 hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/20 dark:hover:border-blue-800"
                onClick={
                  async () => {
                        const user = await signInWithGoogle();
                        if (user) {
                          setClientMessage({ type: "success", text: "Google sign-in successful! Redirecting..." });
                          navigate(`${userType}-dashboard`);
                        } else if (googleError) {
                          setClientMessage({ type: "error", text: "Google sign-in failed." });
                        }
                      }}
                      disabled={isLoading || googleLoading}
                >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === "signup" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="h-11"
                      required={authMode === "signup"}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="h-11"
                      required={authMode === "signup"}
                    />
                  </div>
                </div>
              )}

              {authMode === "signup" && userType === "brand" && (
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Your Company"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    className="h-11"
                    required={userType === "brand" && authMode === "signup"}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-11 pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="h-11 pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">At least {minPasswordLen} characters</p>
              </div>

              {authMode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className="h-11 pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Error/Success Messages */}
              {(finalErrorType || (finalErrorType === null && clientMessage.type === "success")) && (
                <Alert
                  className={
                    finalErrorType === "error"
                      ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                      : "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                  }
                >
                  {finalErrorType === "error" ? (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                  <AlertDescription
                    className={finalErrorType === "error" ? "text-red-700 dark:text-red-300" : "text-green-700 dark:text-green-300"}
                  >
                    {finalErrorText}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{authMode === "login" ? "Signing In..." : "Creating Account..."}</span>
                  </div>
                ) : authMode === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>

              {authMode === "login" && (
                <div className="text-center">
                  <Button type="button" variant="link" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                    Forgot your password?
                  </Button>
                </div>
              )}
            </form>

            {authMode === "signup" && (
              <div className="text-center text-sm text-muted-foreground">
                By creating an account, you agree to our{" "}
                <Button variant="link" className="p-0 h-auto text-purple-600 hover:text-purple-700">
                  Terms of Service
                </Button>{" "}
                and{" "}
                <Button variant="link" className="p-0 h-auto text-purple-600 hover:text-purple-700">
                  Privacy Policy
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AuthPage;
