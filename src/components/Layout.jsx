import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Paper } from "@mui/material";
import { Brightness6Rounded } from "@mui/icons-material";
import { useUserStore, useThemeStore } from "../utils/store";
import { getErrMsg } from "../utils/helpers/functions";
import { AuthServices } from "../services";

function Layout({ children, ...props }) {
  const navigate = useNavigate();
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const { isLoggedIn, user, logout } = useUserStore();
  const { theme, toggleTheme } = useThemeStore();

  const handleProfileOptions = (e) => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleLogout = async () => {
    try {
      const { data } = await AuthServices.logout();

      if (data.success) {
        navigate("/");
        logout();
        setShowProfileOptions(false);
        toast.success("Logged out successfully");
      }
    } catch (err) {
      toast.error(getErrMsg(err));
    }
  };

  const switchTheme = () => {
    toggleTheme();
  };

  return (
    <div>
      <div className="shadow-md w-full fixed top-0 left-0 z-30">
        <header
          className={`flex items-center justify-between py-2 px-7 ${
            theme === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          <div>
            <Link to="/">
              <div className="w-28 h-8">
                <h1 className="text-xl font-bold text-orange-600">VPlayer</h1>
              </div>
            </Link>
          </div>
          <div className="flex fixed right-6">
            <div className="flex mr-2 items-center justify-center gap-6">
              {isLoggedIn ? (
                <Fragment>
                  <div className="flex gap-5 items-center justify-center">
                    <Button
                      component={Link}
                      to="/upload"
                      variant="outlined"
                      color="warning"
                      size="small"
                    >
                      Upload
                    </Button>
                    <div
                      className="-mb-1 cursor-pointer"
                      onClick={handleProfileOptions}
                    >
                      <span className="relative inline-block">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={`https://eu.ui-avatars.com/api/?name=${user.name}`}
                          alt={user.name}
                        />
                      </span>
                    </div>
                    <Paper
                      elevation={3}
                      className={`${
                        !showProfileOptions && "hidden"
                      } absolute top-9 right-1 rounded-lg shadow-lg z-50 w-32 overflow-hidden text-sm select-none`}
                    >
                      <ul className="text-center overflow-hidden">
                        <li
                          className="p-2 cursor-pointer hover:bg-gray-200 hover:text-black"
                          // onClick={handleMove}
                        >
                          Profile
                        </li>
                        <li
                          className="p-2 cursor-pointer hover:bg-gray-200 hover:text-black"
                          onClick={switchTheme}
                        >
                          Switch Theme
                        </li>
                        <li
                          className="p-2 cursor-pointer hover:bg-gray-200 hover:text-black"
                          onClick={handleLogout}
                        >
                          Logout
                        </li>
                      </ul>
                    </Paper>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <Button
                    component={Link}
                    to="/upload?redirect=upload"
                    variant="outlined"
                    color="warning"
                    size="small"
                  >
                    Upload
                  </Button>
                  <button
                    className="border-none bg-transparent text-gray-400 cursor-pointer inline"
                    onClick={switchTheme}
                  >
                    <Brightness6Rounded />
                  </button>
                </Fragment>
              )}
            </div>
          </div>
        </header>
      </div>

      <main onClick={() => setShowProfileOptions(false)} {...props}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
