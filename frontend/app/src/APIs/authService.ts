import axios from "axios";
import { authRegister, authLogin, authRegisterStaff } from "../globalVariables/endpoints";
import { LoginAcc, RegisterAcc } from "../models/InterfaceAuth";

// register user

const register = async (userData: RegisterAcc) => {
  const response = await axios.post(authRegister, userData);
  return response.data;
};

const registerStaff = async (userData: RegisterAcc) => {
  const response = await axios.post(authRegisterStaff, userData);
  return response.data;
};



// Logout user
const logout = () => {
  localStorage.removeItem('token')
}


// Login user
const login = async (userData: LoginAcc) => {
  const response = await axios.post(authLogin, userData);

  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }
  console.log(response.data)
  return response.data;
};





const authService = {
  register,
  registerStaff,
  logout,
  login,
};

export default authService;
