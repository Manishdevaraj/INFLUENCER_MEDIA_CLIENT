//@ts-nocheck
import axios from "axios";
const url=import.meta.env.VITE_API_URL
// console.log(url);
interface RegisterUserData {
  uid: string;
  email: string;
  name: string;
  role?: "brand" | "influencer";
}

export const registerUser = async (userData: RegisterUserData) => {
  try {
    console.log('Registering User');
    const response = await axios.post(`${url}/user/register-user`, userData); // adjust route
    return response.data;
  } catch (error: any) {
    console.error("User registration failed:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const getUser = async (uid:string) => {
  try {
    console.log('Getting  User');
    
    const response = await axios.get(`${url}/user/get-user?uid=${uid}`); // adjust route
    return response.data;
  } catch (error: any) {
    console.error("Getting User data failed:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const InstaConnect = async (uid:string) => {
  try {
    
   window.location.href = `http://localhost:5000/insta/auth?userId=${uid}`;
  } catch (error: any) {
    console.error("Getting User data failed:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const getConnectedAccounts = async (uid:string) => {
  try {
    
    const response = await axios.get(`${url}/insta/get-account?uid=${uid}`);
    return response.data;
  } catch (error: any) {
    console.error("Getting User data failed:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};