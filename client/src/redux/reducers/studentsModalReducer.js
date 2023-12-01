import { STUDENTS_MODAL_ACTION_TYPE } from "../actions-type";

const initialState = {
  studentsModalData: {
    lessonAmount: "",
    motherName: "",
    fin: "",
    seria: "",
    fatherName: "",
    birthday: "",
    courses: "",
    email: "",
    fullName: "",
    password: "",
    motherPhone: "",
    fatherPhone: "",
    createdAt: "",
    payment: "",
    sector: "",
    whereComing: "",
    educationalInstitution: "",
    educationDegree: "",
    healthStatus: "",
    emergencyPhone: "",
    whereFrom: "",
  },
  studentsOpenModal: false,
  studentsModalLoading: false,
};

export const studentsModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL:
      return {
        ...state,
        studentsModalData: action.payload.data,
        studentsOpenModal: action.payload.openModal,
      };
    case STUDENTS_MODAL_ACTION_TYPE.STUDENT_OPEN_MODAL:
      return {
        ...state,
        studentsOpenModal: action.payload,
      };
    case STUDENTS_MODAL_ACTION_TYPE.STUDENT_MODAL_LOADING:
      return {
        ...state,
        studentsModalLoading: action.payload,
      };
    default:
      return state;
  }
};
