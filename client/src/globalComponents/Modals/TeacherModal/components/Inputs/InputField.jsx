import { TextField } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { ReactComponent as Eye } from "../../../../../assets/icons/eye.svg";
import { ReactComponent as EyeSlash } from "../../../../../assets/icons/eye-slash.svg";
import { ReactComponent as ManatIcon } from "../../../../../assets/icons/manat.svg";
import { ReactComponent as ModalArrowIcon } from "../../../../../assets/icons/modal-arrow-down.svg";
import { TEACHERS_MODAL_ACTION_TYPE } from '../../../../../redux/actions-type';
import { useDispatch } from "react-redux";

export default function InputField ({
    formik,
    setInputValue,
    teachersModalData,
    inputName,
}) {
    const dispatch = useDispatch();
    const [shrink, setShrink] = useState(false);
    const [viewPass, setViewPass] = useState(true);
    const [openSalary, setOpenSalary] = useState(false)
    const [selectedSalary, setSelectedSalary] = useState(teachersModalData.salary?.hourly ? 'hourly' : 'monthly' )
    const inputData = [
    {
        inputName: "fullName",
        label: "Ad soyad",
        type: "text",
        marginTop: "0",
        marginBottom: "0",
        inputValue: teachersModalData[inputName] || "",
    },
    {
        inputName: "birthday",
        label: "Doğum tarixi",
        type: "date",
        marginTop: "0",
        marginBottom: "0",
        inputValue: (teachersModalData[inputName] && inputName === "birthday")
        ? moment(teachersModalData[inputName]).format("YYYY-MM-DD") 
        : "",
        className: 'birthday-input'
    },
    {
      inputName: "fin",
      label: "FIN",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: teachersModalData[inputName] || "",
    },
    {
      inputName: "seria",
      label: "Seriya nömrəsi",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: teachersModalData[inputName] || "",
    },
    {
      inputName: "phone",
      label: "Telefon nömrəsi",
      type: "tel",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: teachersModalData[inputName] || "",
    },
    {
      inputName: "workExperience",
      label: "İş təcrübəsi",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: teachersModalData[inputName] || "",
    },
    {
      inputName: "disability",
      label: "Əlillik dərəcəsi",
      type: "text",
      marginTop: "24px",
      marginBottom: "16px",
      inputValue: teachersModalData[inputName] || "",
    },
    {
      inputName: "healthStatus",
      label: "Sağlamlıq statusu",
      type: "text",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: teachersModalData[inputName] || "",
    },
    {
      inputName: "email",
      label: "Email",
      type: "email",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: teachersModalData[inputName] || "",
    },
    {
      inputName: "password",
      label: !teachersModalData._id ? "Şifrə" : "Şifrəni dəyiş",
      type: viewPass ? "password" : "text",
      marginTop: "24px",
      marginBottom: "0",
      paddingRight: '50px',
      className: 'password-input'
    },
    {
      inputName: "salary",
      label: "Əmək haqqı",
      type: "number",
      marginTop: "24px",
      marginBottom: "0",
      inputValue: teachersModalData[inputName]?.value || "",
      className: 'salary-input'
    },
    ];

    const handleChange = (e) => {
      if(inputName === 'salary') {
        dispatch({type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL, payload:
          {data: {...teachersModalData, 
            [inputName]: {monthly: selectedSalary === 'monthly', hourly: selectedSalary === 'hourly', value: e.target.value}}, 
            openModal: true} 
          })

        setInputValue(inputName, e.target.value);
      } else {
        dispatch({type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL, payload:{data: {...teachersModalData, [inputName]: e.target.value}, openModal: true} })
        setInputValue(inputName, e.target.value);
      }
    }
    const selectSalary = (value) => {
      setSelectedSalary(value)
      setOpenSalary(false)
    }

    useEffect(() => {
      if(inputName === 'salary') {
        dispatch({type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL, payload:
          {data: {...teachersModalData, 
            [inputName]: {...teachersModalData[inputName], monthly: selectedSalary === 'monthly', hourly: selectedSalary === 'hourly'}}, 
            openModal: true} 
          })
      }
    }, [selectedSalary])

  return (
    <div className={inputData.find((item) => item.inputName === inputName).className}>
        <TextField
        sx={{
          "& input": { fontSize: "12px",
          paddingRight: inputData.find((item) => item.inputName === inputName)?.paddingRight },
          marginTop: inputData.find((item) => item.inputName === inputName).marginTop,
          marginBottom: inputData.find((item) => item.inputName === inputName)?.marginBottom,
        }}
        InputLabelProps={{
          shrink:
            inputName === "birthday"
              ? true
              : (inputData.find((item) => item.inputName === inputName)
                  .inputValue
              ? true
              : shrink),
          style: {
            fontSize: "12px",
            color: "#3F3F3F",
            marginBottom: inputData.find((item) => item.inputName === inputName)
              .marginBottom,
          },
        }}
        fullWidth
        id={inputName}
        name={inputName}
        type={inputData.find((item) => item.inputName === inputName).type}
        label={inputData.find((item) => item.inputName === inputName).label}
        value={
          inputData.find((item) => item.inputName === inputName)?.inputValue
        }
        onWheel={(e) => e.target.blur()}
        onChange={(e) => handleChange(e)}
        onBlur={(e) => {
          formik.setFieldTouched(inputName, true);
          setShrink(!!e.target.value);
        }}
        onFocus={() => setShrink(true)}
      />

      {(inputName === 'password' && teachersModalData?._id) ?
        (
          (formik.errors[inputName] && formik.errors[inputName] !== 'Bu xana tələb olunur.') && 
          formik.touched[inputName] && 
          (<small className="validation-err-message">{formik.errors[inputName]}</small>)
        ) :
        (
          (formik.errors[inputName]) && 
          formik.touched[inputName] && 
          (<small className="validation-err-message">{formik.errors[inputName]}</small>)
        )
      } 

    {inputName === 'salary' &&
      <div className={`salary-dropdown ${openSalary ? 'active' : ''}`}>
        <div onClick={() => setOpenSalary(!openSalary)} className="dropdown-head">
          <div className="manat-icon"><ManatIcon /></div>
          <div className="divider"></div>
          <label htmlFor="">{selectedSalary === 'monthly' ? 'Aylıq' : 'Saatlıq'}</label>
          <div className="arrow-icon"><ModalArrowIcon /></div>
        </div>
        <div className="dropdown-body">
          <ul>
            <li onClick={() => selectSalary('monthly')}>Aylıq</li>
            <li onClick={() => selectSalary('hourly')}>Saatlıq</li>
          </ul>
        </div>
      </div>
    }
    {inputName === 'password' &&
      <div className="modal-view-icon" onClick={() => setViewPass(!viewPass)}>
        {viewPass ? <EyeSlash /> : <Eye />}
      </div>
    }
    </div>
  )
}
