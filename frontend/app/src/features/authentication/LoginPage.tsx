import React, { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAsync, reset } from "../../Reducers/authSlice";



const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { userName, isLoading, isSuccess, isLogged, isError, message } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/")
    }
    
    if (isError) {
      toast.error(message)
    }

    dispatch(reset())

  }, [userName, isSuccess, navigate, isError])


  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    
    const userData = {
      username,
      password,
    }
    if (userData.username != "" && userData.password != "") {
      dispatch(loginAsync(userData))
    } else {toast.error("Those fields can't stay empty.")}
  };

  return (
    <>
      <div style={{ color: "#66C0F4" }}>
        <section className="heading">
          <h1>
            <FaSignInAlt /> Login
          </h1>
          <p>Login and start gaming.</p>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={username}
                placeholder="Enter your username"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <button type="submit">Submit</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default LoginPage