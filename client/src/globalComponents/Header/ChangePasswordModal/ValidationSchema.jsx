import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const ValidationSchema = yup.object().shape({
    oldPassword: yup.string().required("Köhnə şifrənizi daxil edin."),
    newPassword: yup.string().min(6, 'Şifrə minimum 6 hərfdən ibarət olmalıdır.').required("Yeni şifrənizi daxil edin."),
    confirmNewPass: yup.string().oneOf([yup.ref('newPassword'), null], 'Daxil etdiyiniz şifrələr fərqlidir.'),
  });
