import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerAsync, reset } from "../../Reducers/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { userName, isLoading, isSuccess, isLogged, isError, message } = useAppSelector(
    (state) => state.auth
  );



  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess) {
      toast.success(message)
      console.log(message)
      navigate("/")
    }

    dispatch(reset())
  }, [userName, isSuccess, navigate, dispatch, isError])

  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match!");
    } else {
      const userData = {
        username,
        email,
        password,
      };

      dispatch(registerAsync(userData));
    }
  };

  return (
    <>
      <div style={{ color: "#66C0F4" }}>

        <section className="heading">
          <h1>
            <FaUser /> Register
          </h1>
          <p>Please Create an account.</p>
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
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
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
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Enter your password again"
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

export default Register;
