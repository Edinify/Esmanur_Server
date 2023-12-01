import * as yup from "yup";

export const ValidationSchema = yup.object().shape({
    appointment: yup.string().required('Bu xana tələb olunur.'),
    amount: yup.number().typeError('Rəqəm olmalıdır.').moreThan(0, 'Müsbət ədəd olmalıdır.').required("Bu xana tələb olunur."),
    date: yup.string().required('Bu xana tələb olunur.'),
  });
