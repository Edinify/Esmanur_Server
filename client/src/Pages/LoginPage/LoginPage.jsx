import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Eye } from "../../assets/icons/eye.svg";
import { ReactComponent as EyeSlash } from "../../assets/icons/eye-slash.svg";
import { ReactComponent as LoginLogo } from "../../assets/icons/Login-Logo.svg";
import { Box, TextField } from "@mui/material";
import { loginAction } from "../../redux/actions/auth";
import { goToForgetPageAction } from "../../redux/actions/forgetPasswordAction";
import { useFormik } from "formik";
import { ValidationSchema } from "./components/Validation/ValidationSchema";
import Loading from "../../globalComponents/Loading/Loading";
import PreviewImg from "./components/PreviewImg/PreviewImg";
import { useCustomHook } from "../../globalComponents/GlobalFunctions/globalFunctions";

export const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [view, setView] = useState(true);
  const [title, setTitle] = useState({
    email: "",
    password: "",
  });

  // formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ValidationSchema,
  });
  const setInputValue = useCallback(
    (key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );

  const forgotNavigate = () => {
    dispatch(goToForgetPageAction());
  };
  const handleView = () => {
    setView(!view);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    authFunc();
  };
  const authFunc = () => {
    formik.setFieldTouched("password", true);
    formik.setFieldTouched("email", true);
    if (
      formik.isValid &&
      !(title.email.trim() === "" && title.password.trim() === "")
    ) {
      dispatch(loginAction(title));
    }
  };

  return (
    <div className="login">
      <>
        <PreviewImg />
      </>

      <div className="login-right">
        <div className="login-right-header">
          {/* <LoginLogo /> */}
          <h1 className="logo-title">
            <span>E</span>
            <span>s</span>
            <span>m</span>
            <span>a</span>
            <span>n</span>
            <span>u</span>
            <span>r</span>
          </h1>
          <h2>Daxil olun</h2>
        </div>

        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            width: "416px",
            display: "flex",
            flexDirection: "column",
            "@media (max-width: 600px)": {
              width: "100%",
            },
          }}
          noValidate
          autoComplete="off"
        >
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
            }}
            label="Email adresiniz"
            type="text"
            name="email"
            InputLabelProps={{
              style: {
                fontSize: "16px",
                color: "#3F3F3F",
                backgroundColor: "white",
              },
            }}
            helperText={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : ""
            }
            error={formik.errors.email && formik.touched.email ? true : false}
            value={title.email}
            onChange={(e) => {
              setTitle({ ...title, email: e.target.value });
              setInputValue("email", e.target.value);
            }}
          />

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
              type={view ? "password" : "text"}
              name="password"
              fullWidth
              InputLabelProps={{
                style: {
                  fontSize: "16px",
                  color: "#3F3F3F",
                  backgroundColor: "white",
                },
              }}
              helperText={
                formik.errors.password && formik.touched.password
                  ? formik.errors.password
                  : ""
              }
              error={
                formik.errors.password && formik.touched.password ? true : false
              }
              value={title.password}
              onChange={(e) => {
                setTitle({ ...title, password: e.target.value });
                setInputValue("password", e.target.value);
              }}
            />
            <div className="view-icon" onClick={handleView}>
              {view ? <EyeSlash /> : <Eye />}
            </div>
          </div>
          <h6 onClick={forgotNavigate}>Şifrəni unutmusunuz?</h6>

          <button className="login-btn">
            {loading ? <Loading mode="in-button" /> : " Daxil olun "}
          </button>
        </Box>
      </div>
    </div>
  );
};
