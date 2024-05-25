import React, { useState, useEffect } from "react";
import { Box, Paper, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../utils/store";
import { toast } from "react-toastify";
import Layout from "../Layout";
import { getErrMsg, validateForm } from "../../utils/helpers/functions";
import { AuthServices } from "../../services";

function Signup() {
  const navigate = useNavigate();

  const { isLoggedIn, login } = useUserStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(form)) {
      return toast.error("Please fill all the fields");
    }

    if (form.name.length > 30) {
      return toast.error("Name cannot be more than 30 characters");
    }

    setDisabled(true);
    try {
      const { data } = await AuthServices.signup(form);

      if (data.success) {
        const { user } = data.data;

        login(user);
        toast.success("Signup successful");
        setDisabled(false);
      }
    } catch (err) {
      toast.error(getErrMsg(err));
      setDisabled(false);
    }
  };

  return (
    <Layout className="mt-11">
      <Box className="flex items-center justify-center min-h-screen">
        <Paper elevation={3} className="p-4 w-11/12 md:w-6/12 lg:w-3/12">
          <h1 className="font-bold text-2xl text-center">Signup</h1>
          <form onSubmit={handleSubmit} className="p-2 pt-0 text-center">
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              type="text"
              fullWidth
              required
              margin="normal"
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              required
              margin="normal"
              value={form.email}
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              margin="normal"
              value={form.password}
              onChange={handleChange}
            />
            {/* <p className="text-right">
              <Link to="/forgotpassword" className="text-blue-500">
                Forgot password?
              </Link>
            </p> */}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                // marginTop: "0.5rem",
                marginTop: "1rem",
              }}
              disabled={disabled}
            >
              Signup
            </Button>
          </form>
          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </Paper>
      </Box>
    </Layout>
  );
}

export default Signup;
