import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useUserStore } from "../../utils/store";
import { Box, Paper, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import Layout from "../Layout";
import { getErrMsg, validateForm } from "../../utils/helpers/functions";
import { AuthServices } from "../../services";

function Login() {
  const navigate = useNavigate();
  const [queryParameters] = useSearchParams();

  const { isLoggedIn, login } = useUserStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      const redirect = queryParameters.get("redirect");

      if (redirect) {
        navigate(`/${redirect}`);
      } else {
        navigate("/");
      }
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm(form)) {
      toast.info("Please enter all the fields");
      return;
    }

    setDisabled(true);
    try {
      const { data } = await AuthServices.login(form);

      if (data.success) {
        const { user } = data.data;
        login(user);
        toast.success("Logged in successfully");
        setDisabled(false);
      }
    } catch (err) {
      toast.error(getErrMsg(err));
      setDisabled(false);
    }
  };

  return (
    <Layout>
      <Box className="flex items-center justify-center min-h-screen">
        <Paper elevation={3} className="p-4 w-11/12 md:w-6/12 lg:w-3/12">
          <h1 className="font-bold text-2xl text-center">Login</h1>
          <form onSubmit={handleSubmit} className="p-2 pt-0 text-center">
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
              Login
            </Button>
          </form>
          <p className="text-center mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 underline">
              Signup
            </Link>
          </p>
        </Paper>
      </Box>
    </Layout>
  );
}

export default Login;
