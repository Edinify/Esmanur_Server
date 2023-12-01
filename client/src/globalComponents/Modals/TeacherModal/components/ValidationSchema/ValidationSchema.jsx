import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


export const ValidationSchema = yup.object().shape({
    // sector: yup.string().required('Dil seçmək tələb olunur.'),
    fullName: yup.string().min(3, 'Mininum 3 hərfdən ibarət olmalıdır.').required('Bu xana tələb olunur.'),
    birthday: yup.string().required('Bu xana tələb olunur.'),
    fin: yup.string().required('Bu xana tələb olunur.'),
    seria: yup.string().required('Bu xana tələb olunur.'),
    phone: yup.string().required("Bu xana tələb olunur."),
    workExperience: yup.string().required('Bu xana tələb olunur.'),
    disability: yup.string().required('Bu xana tələb olunur.'),
    email: yup.string().email('Emaili doğru daxil edin.').required('Bu xana tələb olunur.'),
    course: yup.string().required('Fənn seçmək tələb olunur.'),
    password: yup.string().min(6, 'Şifrə minimum 6 hərfdən ibarət olmalıdır.').required("Bu xana tələb olunur."),
    // salary: yup.number('Rəqəm olmalıdır.').positive('Müsbət ədəd olmalıdır.').integer().required("Bu xana tələb olunur."),
    salary: yup.number().typeError('Rəqəm olmalıdır.').moreThan(0, 'Müsbət ədəd olmalıdır.').required("Bu xana tələb olunur."),
    healthStatus: yup.string().required('Bu xana tələb olunur.'),

  });