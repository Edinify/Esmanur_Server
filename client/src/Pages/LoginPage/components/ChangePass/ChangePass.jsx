import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField } from "@mui/material";
import { ReactComponent as Eye } from "../../../../assets/icons/eye.svg";
import { ReactComponent as EyeSlash } from "../../../../assets/icons/eye-slash.svg";
import { changePasswordAction } from "../../../../redux/actions/forgetPasswordAction";
import PreviewImg from "../PreviewImg/PreviewImg";
import { ReactComponent as LoginLogo } from "../../../../assets/icons/Login-Logo.svg";
import Loading from "../../../../globalComponents/Loading/Loading";
import { useCustomHook } from "../../../../globalComponents/GlobalFunctions/globalFunctions";

export const ChangePass = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [view, setView] = useState(true);
  const [passView, setPassView] = useState(true);
  const forgetPassword = useSelector((state) => state.forgetPassword);
  const { loading } = useSelector((state) => state.forgetPassword);
  const [title, setTitle] = useState({
    password: "",
    changePass: "",
  });
  const [error, setError] = useState({
    newPasswordMessage: "",
    confirmNewPasswordMessage: "",
  });
  //

  const handleView = () => {
    setView(!view);
  };
  const handleChangeView = () => {
    setPassView(!passView);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setTitle({ ...title, [e.target.name]: e.target.value });
  };
  const handleChangePassword = () => {
    if (title.password.trim() === "" && title.changePass.trim() === "") {
      setError((message) => ({
        ...message,
        newPasswordMessage: "Şifrə daxil edin",
        confirmNewPasswordMessage: "Şifrə daxil edin",
      }));
      return;
    }
    if (title.password.trim() === "") {
      setError((message) => ({
        ...message,
        newPasswordMessage: "Şifrə daxil edin",
      }));
    } else if (title.changePass.trim() === "") {
      setError((message) => ({
        ...message,
        confirmNewPasswordMessage: "Şifrə daxil edin",
      }));
    } else if (title.password !== title.changePass) {
      setError((message) => ({
        ...message,
        confirmNewPasswordMessage: "Daxil etdiyiniz şifrələr fərqlidir",
      }));
    } else {
      setError({
        newPasswordMessage: "",
        confirmNewPasswordMessage: "",
      });
      dispatch(changePasswordAction(title.password, forgetPassword.userId));
    }
  };

  return (
    <div className="login">
      <>
        <PreviewImg />
      </>
      <div className="login-right change">
        <div className="login-right-header">
          {/* <LoginLogo/> */}
          <h1 className="logo-title">
            <span>E</span>
            <span>s</span>
            <span>m</span>
            <span>a</span>
            <span>n</span>
            <span>u</span>
            <span>r</span>
          </h1>
          <h2>Şifrəni dəyiş</h2>
        </div>
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            width: "416px",
            display: "flex",
            flexDirection: "column",
            "@media (max-width: 550px)": {
              width: "100%",
            },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="password-class">
            <TextField
              sx={{
                "& input": {
                  fontSize: "16px",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "12px",
                  color: "#FF462A",
                  fontWeight: 400,
                },
                marginTop: "20px",
              }}
              label="Şifrə"
              helperText={error.newPasswordMessage}
              error={error.newPasswordMessage !== ""}
              type={view ? "password" : "text"}
              onChange={handleChange}
              name="password"
              value={title.password}
              fullWidth
              InputLabelProps={{
                style: {
                  fontSize: "16px",
                  color: "#3F3F3F",
                  backgroundColor: "white",
                },
                // onFocus:{fontSize:"12px"}
              }}
            />

            <div className="view-icon" onClick={handleView}>
              {view ? <EyeSlash /> : <Eye />}
            </div>
          </div>

          <div className="password-class">
            <TextField
              sx={{
                "& input": {
                  fontSize: "16px",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "12px",
                  color: "#FF462A",
                  fontWeight: 400,
                },
                marginTop: "20px",
              }}
              label="Şifrəni təsdiqlə"
              type={passView ? "password" : "text"}
              helperText={error.confirmNewPasswordMessage}
              error={error.confirmNewPasswordMessage !== ""}
              onChange={handleChange}
              name="changePass"
              value={title.changePass}
              fullWidth
              InputLabelProps={{
                style: {
                  fontSize: "16px",
                  color: "#3F3F3F",
                  backgroundColor: "white",
                },
              }}
            />

            <div className="view-icon" onClick={handleChangeView}>
              {passView ? <EyeSlash /> : <Eye />}
            </div>
          </div>
        </Box>

        <button
          type="submit"
          onClick={handleChangePassword}
          className="login-btn"
        >
          {loading ? <Loading mode="in-button" /> : "Şifrəni dəyiş "}
        </button>
        <h6 className="back-btn" onClick={() => navigate("/send")}>
          Geri
        </h6>
      </div>

      {/* {error} */}
    </div>
  );
};
