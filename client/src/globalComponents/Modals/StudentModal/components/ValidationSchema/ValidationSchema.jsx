import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const ValidationSchema = yup.object().shape({
    fullName: yup.string().min(3, 'Mininum 3 hərfdən ibarət olmalıdır.').required('Bu xana tələb olunur.'),
    email: yup.string().email('Emaili doğru daxil edin.').required('Bu xana tələb olunur.'),
    password: yup.string().min(6, 'Şifrə minimum 6 hərfdən ibarət olmalıdır.').required("Bu xana tələb olunur."),
    lessonAmount: yup.number('Rəqəm olmalıdır.').required("Dərs və dərs sayı əlavə edilməlidir."),
    payment: yup.number().typeError('Rəqəm olmalıdır.').moreThan(0, 'Müsbət ədəd olmalıdır.').required("Bu xana tələb olunur."),
    // sector: yup.string().required('Dil seçmək tələb olunur.'),
    // whereFrom: yup.string().required('Bu xana tələb olunur.'),
    // educationalInstitution: yup.string().required('Bu xana tələb olunur.'),
    // educationDegree: yup.string().required('Bu xana tələb olunur.'),
    // healthStatus: yup.string().required('Bu xana tələb olunur.'),
    // motherName: yup.string().min(3, 'Mininum 3 hərfdən ibarət olmalıdır.').required('Bu xana tələb olunur.'),
    // fatherName: yup.string().min(3, 'Mininum 3 hərfdən ibarət olmalıdır.').required('Bu xana tələb olunur.'),
    // birthday: yup.string().required('Bu xana tələb olunur.'),
    // motherPhone: yup.string().required("Bu xana tələb olunur."),
    // fatherPhone: yup.string().required("Bu xana tələb olunur."),
    // emergencyPhone: yup.string().required("Bu xana tələb olunur."),
    // course: yup.string().required('Fənn seçmək tələb olunur.'),
    // whereComing: yup.string().required('Bu xana tələb olunur.'),
    // fin: yup.string().required('Bu xana tələb olunur.'),
    // seria: yup.string().required('Bu xana tələb olunur.'),
  });
