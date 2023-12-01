import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const ValidationSchema = yup.object().shape({
    // phoneNumber: yup.string().required('Nömrə daxil edin.'),
    email: yup.string().email('Emaili doğru daxil edin.').required('Email daxil edin.'),
    // phoneNumber: yup.string().required('Nömrə daxil edin.'),
    password: yup.string().required("Şifrə daxil edin."),
  });

