import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { Box } from "@mui/material";
import { setLoadingTeacherAction} from "../../../redux/actions/teachersActions";
import { TEACHERS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import Status from "./components/Buttons/Status";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import SectorRadio from "./components/RadioCheckbox/SectorRadio";
import InputField from "./components/Inputs/InputField";
import MaritalStatusCheckbox from "./components/RadioCheckbox/MaritalStatusCheckbox";
import CoursesInput from "./components/Inputs/CoursesInput";

const TeacherModal = () => {
  const dispatch = useDispatch();
  const { teachersModalData, teachersOpenModal } = useSelector(
    (state) => state.teachersModal
  );

  const [classIcon, setClassIcon] = useState(false);
  const [selectedClassList, setSelectedClassList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const inputNameArr1 = [
    "fullName",
    "birthday",
    "fin",
    "seria",
    "phone",
    "workExperience",
  ];
  const inputNameArr2 = [
    // "healthStatus",
    "email",
    "password",
    // 'salary',
  ];
  // formik
  const formik = useFormik({
    initialValues: {
      sector: teachersModalData?.sector ? teachersModalData?.sector : "",
      fullName: teachersModalData.fullName ? teachersModalData.fullName : "",
      birthday: teachersModalData?.birthday ? teachersModalData?.birthday : "",
      fin: teachersModalData.fin ? teachersModalData.fin : "",
      seria: teachersModalData.seria ? teachersModalData.seria : "",
      phone: teachersModalData.phone ? teachersModalData.phone : "",
      workExperience: teachersModalData.workExperience
        ? teachersModalData.workExperience
        : "",
      maritalStatus: teachersModalData?.maritalStatus
        ? teachersModalData?.maritalStatus
        : "",
      disability: teachersModalData.disability
        ? teachersModalData.disability
        : "",
      course: teachersModalData?.courses ? "var" : "",
      email: teachersModalData.email ? teachersModalData.email : "",
      password: teachersModalData.password ? teachersModalData.password : "",
      salary: teachersModalData.salary ? teachersModalData.salary.value : "",
      healthStatus: teachersModalData.healthStatus
        ? teachersModalData.healthStatus
        : "",
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

  const updateModalState = (keyName, value) => {
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
      payload: {
        data: { ...teachersModalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: TEACHERS_MODAL_ACTION_TYPE.GET_TEACHERS_MODAL,
      payload: { data: {}, openModal: false },
    });
  };
  const changeIcon = () => {
    setClassIcon(!classIcon);
  };

  useEffect(() => {
    dispatch(setLoadingTeacherAction(false));
  }, [dispatch]);

  useEffect(() => {
    if (teachersModalData?._id) {
      setSelectedClassList(teachersModalData.courses);
    }
  }, []);

  useEffect(() => {
    if (teachersModalData?._id) {
      const coursesIdList = selectedClassList.map((course) => {
        return course._id ? course._id : "";
      });
      setCheckedList([...coursesIdList]);
      updateModalState("courses", [...coursesIdList]);
    } else {
      if (selectedClassList.length > 0) {
        const coursesIdList = selectedClassList.map((course) => {
          return course._id;
        });
        setCheckedList([...coursesIdList]);
        updateModalState("courses", [...coursesIdList]);
      }
    }
  }, [selectedClassList]);




  return (
    <div className="create-update-modal-con teacher-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{teachersModalData?._id ? "Müəllim yenilə" : "Müəllim yarat"}</h2>
          <CloseBtn onClick={closeModal} />
        </div>

        <Box
          onSubmit={(e) => e.preventDefault()}
          component="form"
          sx={{
            width: 500,
            maxWidth: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="create-update-modal-form">
            <div className="input-couples">
              {inputNameArr1.map((name, index) => (
                <InputField
                  key={index}
                  inputName={name}
                  formik={formik}
                  setInputValue={setInputValue}
                  teachersModalData={teachersModalData}
                />
              ))}
            </div>
            <InputField
              inputName={"healthStatus"}
              formik={formik}
              setInputValue={setInputValue}
              teachersModalData={teachersModalData}
            />
            <InputField
              inputName={"disability"}
              formik={formik}
              setInputValue={setInputValue}
              teachersModalData={teachersModalData}
            />
            <MaritalStatusCheckbox
              formik={formik}
              teachersModalData={teachersModalData}
              setInputValue={setInputValue}
            />
            <SectorRadio
              formik={formik}
              teachersModalData={teachersModalData}
              updateModalState={updateModalState}
              setInputValue={setInputValue}
            />
            <CoursesInput
              formik={formik}
              changeIcon={changeIcon}
              classIcon={classIcon}
              checkedList={checkedList}
              selectedClassList={selectedClassList}
              setSelectedClassList={setSelectedClassList}
              setInputValue={setInputValue}
              updateModalState={updateModalState}
              setClassIcon={setClassIcon}
            />
            <InputField
              inputName={"salary"}
              formik={formik}
              setInputValue={setInputValue}
              teachersModalData={teachersModalData}
            />
            <div className="input-couples">
              {inputNameArr2.map((name, index) => (
                <InputField
                  key={index}
                  inputName={name}
                  formik={formik}
                  setInputValue={setInputValue}
                  teachersModalData={teachersModalData}
                />
              ))}
            </div>
          </div>
        </Box>

        {teachersModalData?._id ? (
          <div className="create-update-modal-btn-con">
            <Status
              teachersModalData={teachersModalData}
              updateModalState={updateModalState}
            />
            <SubmitBtn
              formik={formik}
              teachersModalData={teachersModalData}
              funcType="update"
              closeModal={closeModal}
            />
          </div>
        ) : (
          <SubmitBtn
            formik={formik}
            teachersModalData={teachersModalData}
            funcType="create"
            closeModal={closeModal}
          />
        )}

        {teachersModalData?._id && (
          <div className="joined-time">
            Qoşuldu: {moment(teachersModalData.createdAt).format("YYYY.MM.DD")}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherModal;
