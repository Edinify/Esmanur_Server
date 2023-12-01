import React, { useState, useCallback } from "react";
import "./changePasswordModal.css";
import { useDispatch,useSelector } from "react-redux";
import { ReactComponent as Eye } from "../../../assets/icons/eye.svg";
import { ReactComponent as EyeSlash } from "../../../assets/icons/eye-slash.svg";
import { Box, TextField } from "@mui/material";
import { ReactComponent as CloseIcon} from "../../../assets/icons/Icon.svg"
import { changeAdminPasswordAction, changeStudentPasswordAction, changeTeacherPasswordAction } from "../../../redux/actions/changePasswordAction";
import { CHANGE_PASSPWORD_ACTION_TYPE } from "../../../redux/actions-type";
import { useFormik } from "formik";
import { ValidationSchema } from "./ValidationSchema";
import Loading from "../../Loading/Loading";

export const ChangePasswordModal = ({ setOpenModal }) => {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.user);
  const {loading} = useSelector(state=>state.changePass);
  const [view, setView] = useState(true);
  const[passView,setPassView]=useState(true)
  const [confirmPassView,setConfirmPassView]=useState(true)


  const[title,setTitle]=useState({
      oldPassword:"",
      newPassword:"",
    confirmNewPass:""
  })

  // formik
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPass: "",
    },
    validationSchema: ValidationSchema,
  });
  const setInputValue = useCallback((key, value) =>
      formik.setValues({
        ...formik.values,
        [key]: value,
      }),
    [formik]
  );

  const handleView = () => {
    setView(!view);
  };
  const handleConfirmPass=()=>{
    setConfirmPassView(!confirmPassView)
  }
  const handleChangeView = () => {
    setPassView(!passView);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChangePassword=()=>{

    formik.setFieldTouched('oldPassword', true)
    formik.setFieldTouched('newPassword', true)
    formik.setFieldTouched('confirmNewPass', true)

    if(formik.isValid && title.oldPassword ) {
      if(user.role==="admin"){
        dispatch(changeAdminPasswordAction(title.oldPassword,title.newPassword))
        dispatch({type:CHANGE_PASSPWORD_ACTION_TYPE.START_LOADING,payload:true})

      }
    else if(user.role==="super-admin"){
        dispatch(changeAdminPasswordAction(title.oldPassword,title.newPassword))
        dispatch({type:CHANGE_PASSPWORD_ACTION_TYPE.START_LOADING,payload:true})

      }
      else if (user.role==="teacher"){
        dispatch(changeTeacherPasswordAction(title.oldPassword,title.newPassword))
        dispatch({type:CHANGE_PASSPWORD_ACTION_TYPE.START_LOADING,payload:true})

      }
      else if (user.role==="student"){
        dispatch(changeStudentPasswordAction(title.oldPassword,title.newPassword))
        dispatch({type:CHANGE_PASSPWORD_ACTION_TYPE.START_LOADING,payload:true})

      }
    } 
    
  }

  return (
    <div className="change-modal">
      <div className="change-modal-form">
        <div className="close-icon" onClick={()=>setOpenModal(false)}><CloseIcon/></div>
        <h2>Şifrəni dəyiş</h2>
        <div className="change-password-con">
        <Box 
          onSubmit={handleSubmit} 
          component="form" 
          sx={{
            width: "416px",
            display: "flex",
            flexDirection: "column",
            "@media (max-width: 800px)": {
              display: "flex",
              alignItems:"center",
            },
          }}
          noValidate
          autoComplete="off"
        >

          <div className="password-class">
            <TextField
              sx={{"& input": {fontSize: "16px"},"@media (max-width: 800px)": {
                  // width: "348px",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "12px",
                  color:"#FF462A",
                  fontWeight:400 
                },
              }}
              fullWidth
              InputLabelProps={{style: { fontSize: "16px", color: "#3F3F3F",backgroundColor:"white" }}}
              label="Köhnə şifrə"
              name="oldPassword"
              type={view ? "password" : "text"}
              helperText={(formik.errors.oldPassword && formik.touched.oldPassword) ? formik.errors.oldPassword : ''}
              error={(formik.errors.oldPassword && formik.touched.oldPassword) ? true : false}
              value={title.password}
              onChange={(e) => { 
                setTitle({...title, oldPassword: e.target.value})
                setInputValue("oldPassword", e.target.value )
                }
              }
            />

            <div className="old-view-icon" onClick={handleView}>
              {view ? (
              <EyeSlash/>
              ) : (
              <Eye/>
              )}
            </div>
          </div>

          <div className="password-class">
            <TextField
              sx={{
                "& input": {
                  fontSize: "16px",
                },
                marginTop: "20px",
                "@media (max-width: 800px)": {
                  // width: "348px",
                },
                "& .MuiFormHelperText-root": {
                  fontSize: "12px",
                  color:"#FF462A",
                  fontWeight:400 
                },
              }}
              fullWidth
              InputLabelProps={{
                style: { fontSize: "16px", color: "#3F3F3F",backgroundColor:"white" },
              }}
              label="Yeni şifrə"
              name="newPassword"
              value={title.changePass}
              type={passView ? "password" : "text"}
              helperText={(formik.errors.newPassword && formik.touched.newPassword) ? formik.errors.newPassword : ''}
              error={(formik.errors.newPassword && formik.touched.newPassword) ? true : false}
              onChange={(e) => { 
                setTitle({...title, newPassword: e.target.value})
                setInputValue("newPassword", e.target.value )
                }
              }
            />

            <div className="new-view-icon" onClick={handleChangeView}>
              {passView ? (
                <EyeSlash/>
              ) : (
                <Eye/>
              )}
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
                  color:"#FF462A",
                  fontWeight:400 
                },
                marginTop: "20px",
                "@media (max-width: 800px)": {
                  // width: "348px",
                },
              }}
              fullWidth
              InputLabelProps={{ style: { fontSize: "16px", color: "#3F3F3F",backgroundColor:"white" }}}
              label="Yeni şifrəni təsdiqlə"
              name="confirmNewPass"
              type={confirmPassView ? "password" : "text"}
              value={title.confirmNewPass}
              helperText={(formik.errors.confirmNewPass && formik.touched.confirmNewPass) ? formik.errors.confirmNewPass : ''}
              error={(formik.errors.confirmNewPass && formik.touched.confirmNewPass) ? true : false}
              onChange={(e) => { 
                setTitle({...title, confirmNewPass: e.target.value})
                setInputValue("confirmNewPass", e.target.value )
                }
              }
            />

            <div className="new-view-icon" onClick={handleConfirmPass}>
              {confirmPassView ? (
              <EyeSlash/>
              ) : (
                <Eye/>
              )}
            </div>
          </div>

        </Box>
        <button type="submit" onClick={handleChangePassword} className="changepass-btn">
          {loading ?  <Loading mode={"in-button"} />:' Şifrəni dəyiş '}
        </button>
        </div>
      </div>
    </div>
  );
};
