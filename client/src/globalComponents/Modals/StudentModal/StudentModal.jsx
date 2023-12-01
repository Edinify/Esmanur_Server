import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import moment from "moment";
import { ReactComponent as CloseBtn } from "../../../assets/icons/Icon.svg";
import { setLoadingStudentsAction } from "../../../redux/actions/studentsActions";
import { Box } from "@mui/material";
import { ValidationSchema } from "./components/ValidationSchema/ValidationSchema";
import { STUDENTS_MODAL_ACTION_TYPE } from "../../../redux/actions-type";
import RadioInput from "./components/Inputs/RadioInput";
import Status from "./components/Buttons/Status";
import SubmitBtn from "./components/Buttons/SubmitBtn";
import WhereHeard from "./components/InputDropdowns/WhereHeard";
import RegionDropdown from "./components/InputDropdowns/RegionDropdown";
import InputField from "./components/Inputs/InputField";
import CoursesInput from "./components/Inputs/CoursesInput";

export const StudentModal = () => {
  const dispatch = useDispatch();
  const { studentsModalData, studentsOpenModal } = useSelector(
    (state) => state.studentsModal
  );
  const [classIcon, setClassIcon] = useState(false);
  const [selectedClassList, setSelectedClassList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [whereComingOpen, setwhereComingOpen] = useState(false);
  const [selectedWhereComing, setSelectedWhereComing] = useState(null);
  const selectedWhereComingList = [
    { name: "Tədbir", key: "event" },
    { name: "Instagram", key: "instagram" },
    { name: "Tövsiyə", key: "referral" },
    { name: "Çöl reklamı", key: "externalAds" },
    { name: "Digər", key: "other" },
  ];

  const [whereFromOpen, setwhereFromOpen] = useState(false);
  const [selectedWhereFrom, setSelectedWhereFrom] = useState(null);
  const selectedWhereFromList = [
    {
      mainArea: "Abşeron r.",
      parts: [
        "Ceyranbatan",
        "Çiçək",
        "Digah",
        "Fatmayı",
        "Görədil",
        "Hökməli",
        "Köhnə Corat",
        "Qobu",
        "Masazır",
        "Mehdiabad",
        "Məmmədli",
        "Novxanı",
        "Pirəkəşkül",
        "Saray",
        "Yeni Corat",
        "Zağulba",
        "Xırdalan",
      ],
    },
    {
      mainArea: "Binəqədi r.",
      parts: [
        "2-ci Alatava",
        "28 May",
        "6-cı mikrorayon",
        "7-ci mikrorayon",
        "8-ci mikrorayon",
        "9-cu mikrorayon",
        "Biləcəri",
        "Binəqədi",
        "Xocəsən",
        "Xutor",
        "M.Ə.Rəsulzadə",
        "Sulutəpə",
      ],
    },
    {
      mainArea: "Xətai r.",
      parts: ["Ağ şəhər", "Əhmədli", "Həzi Aslanov", "Köhnə Günəşli", "NZS"],
    },
    {
      mainArea: "Xəzər r.",
      parts: [
        "Binə",
        "Buzovna",
        "Dübəndi",
        "Gürgən",
        "Qala",
        "Mərdəkan",
        "Şağan",
        "Şimal DRES",
        "Şüvəlan",
        "Türkan",
        "Zirə",
      ],
    },
    {
      mainArea: "Qaradağ r.",
      parts: [
        "Ələt",
        "Qızıldaş",
        "Qobustan",
        "Lökbatan",
        "Müşfiqabad",
        "Puta",
        "Sahil",
        "Səngəçal",
        "Şubani",
      ],
    },
    {
      mainArea: "Nərimanov r.",
      parts: ["Böyükşor"],
    },
    {
      mainArea: "Nəsimi r.",
      parts: [
        "1-ci mikrorayon",
        "2-ci mikrorayon",
        "3-cü mikrorayon",
        "4-cü mikrorayon",
        "5-ci mikrorayon",
        "Kubinka",
      ],
    },
    {
      mainArea: "Nizami r.",
      parts: ["8-ci kilometr", "Keşlə"],
    },
    {
      mainArea: "Pirallahı r.",
      parts: ["Pirallahı"],
    },
    {
      mainArea: "Sabunçu r.",
      parts: [
        "Albalılıq",
        "Bakıxanov",
        "Balaxanı",
        "Bilgəh",
        "Kürdəxanı",
        "Maştağa",
        "Nardaran",
        "Pirşağı",
        "Ramana",
        "Sabunçu",
        "Savalan",
        "Yeni Balaxanı",
        "Yeni Ramana",
        "Zabrat",
      ],
    },
    {
      mainArea: "Səbail r.",
      parts: ["20-ci sahə", "Badamdar", "Bayıl", "Bibi Heybət", "Şıxov"],
    },
    {
      mainArea: "Suraxanı r.",
      parts: [
        "Bahar",
        "Bülbülə",
        "Dədə Qorqud",
        "Əmircan",
        "Günəşli",
        "Hövsan",
        "Qaraçuxur",
        "Massiv A",
        "Massiv B",
        "Massiv D",
        "Massiv G",
        "Massiv V",
        "Suraxanı",
        "Şərq",
        "Yeni Günəşli",
        "Yeni Suraxanı",
        "Zığ",
      ],
    },
    {
      mainArea: "Yasamal r.",
      parts: ["Yasamal", "Yeni Yasamal"],
    },
  ];
  const inputNameArr1 = [
    // "fin",
    // "seria",
    "birthday",
    "healthStatus",
    // "educationalInstitution",
    // "educationDegree",
    "motherName",
    "fatherName",
    "motherPhone",
    "fatherPhone",
  ];
  const inputNameArr2 = ["email", "password"];

  // formik
  const formik = useFormik({
    initialValues: {
      fullName: studentsModalData.fullName ? studentsModalData.fullName : "",
      email: studentsModalData.email ? studentsModalData.email : "",
      password: studentsModalData.password ? studentsModalData.password : "",
      lessonAmount: studentsModalData?.courses
        ? studentsModalData?.courses?.find((item) => !item.lessonAmount)
          ? ""
          : 1
        : "",
      payment: studentsModalData.payment ? studentsModalData.payment : "",
      // sector: studentsModalData?.sector ? studentsModalData?.sector : "",
      // educationalInstitution: studentsModalData.educationalInstitution
      //   ? studentsModalData.educationalInstitution
      //   : "",
      // educationDegree: studentsModalData.educationDegree
      //   ? studentsModalData.educationDegree
      //   : "",
      // healthStatus: studentsModalData.healthStatus
      //   ? studentsModalData.healthStatus
      //   : "",
      // motherName: studentsModalData.motherName
      //   ? studentsModalData.motherName
      //   : "",
      // fatherName: studentsModalData.fatherName
      //   ? studentsModalData.fatherName
      //   : "",
      // birthday: studentsModalData.birthday ? studentsModalData.birthday : "",
      // motherPhone: studentsModalData.motherPhone
      //   ? studentsModalData.motherPhone
      //   : "",
      // fatherPhone: studentsModalData.fatherPhone
      //   ? studentsModalData.fatherPhone
      //   : "",
      // emergencyPhone: studentsModalData.emergencyPhone
      //   ? studentsModalData.emergencyPhone
      //   : "",
      // course: studentsModalData?.courses ? "var" : "",
      // whereComing: studentsModalData.whereComing
      //   ? studentsModalData.whereComing
      //   : "",
      // whereFrom: studentsModalData.whereFrom
      //   ? studentsModalData?.whereFrom.mainArea
      //   : "",
      // fin: studentsModalData.fin ? studentsModalData.fin : "",
      // seria: studentsModalData.seria ? studentsModalData?.seria : "",
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
      type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL,
      payload: {
        data: { ...studentsModalData, [keyName]: value },
        openModal: true,
      },
    });
  };
  const closeModal = () => {
    dispatch({
      type: STUDENTS_MODAL_ACTION_TYPE.GET_STUDENTS_MODAL,
      payload: { data: {}, openModal: false },
    });
  };
  const changeIcon = () => {
    setClassIcon(!classIcon);
    setwhereComingOpen(false);
    setwhereFromOpen(false);
  };
  // where coming
  const WhereComingDropdown = () => {
    setwhereComingOpen(!whereComingOpen);
    setClassIcon(false);
    setwhereFromOpen(false);
  };
  const whereComingAddData = (item) => {
    setInputValue("whereComing", item.key);
    updateModalState("whereComing", item.key);
    setwhereComingOpen(false);
    setSelectedWhereComing(item);
  };
  // where from
  const WhereFromDropdown = () => {
    setwhereFromOpen(!whereFromOpen);
    setClassIcon(false);
    setwhereComingOpen(false);
  };
  const whereFromAddData = (mainArea, part) => {
    setInputValue("whereFrom", true);
    updateModalState("whereFrom", { mainArea: mainArea, part: part });
    setwhereFromOpen(false);
    setSelectedWhereFrom({ mainArea: mainArea, part: part });
  };

  useEffect(() => {
    dispatch(setLoadingStudentsAction(false));
  }, [dispatch]);

  useEffect(() => {
    if (studentsModalData?._id) {
      setSelectedClassList(studentsModalData.courses);
      if (studentsModalData.whereComing) {
        setSelectedWhereComing({
          name: selectedWhereComingList.filter(
            (item) => item.key === studentsModalData.whereComing
          )[0].name,
        });
      }

      if (
        studentsModalData.whereFrom?.mainArea &&
        studentsModalData.whereFrom?.part
      ) {
        setSelectedWhereFrom({
          mainArea: studentsModalData.whereFrom.mainArea,
          part: studentsModalData.whereFrom.part,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (studentsModalData?._id && selectedClassList) {
      const coursesIdList = selectedClassList?.map((course) => {
        return course._id
          ? { course: course.course._id, lessonAmount: course?.lessonAmount }
          : "";
      });
      const coursesId = selectedClassList.map((course) => {
        return course?.course?._id;
      });
      setCheckedList([...coursesId]);
      updateModalState("courses", [...coursesIdList]);
    } else {
      if (selectedClassList.length > 0) {
        const coursesIdList = selectedClassList.map((course) => {
          return {
            course: course.course._id,
            lessonAmount: course?.lessonAmount,
          };
        });
        const coursesId = selectedClassList.map((course) => {
          return course?.course?._id;
        });
        setCheckedList([...coursesId]);
        updateModalState("courses", [...coursesIdList]);
      }
    }
  }, [selectedClassList]);

  return (
    <div className="create-update-modal-con student-modal">
      <div className="create-update-modal">
        <div className="create-update-modal-head">
          <h2>{studentsModalData?._id ? "Tələbə yenilə" : "Tələbə yarat"}</h2>
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
            <InputField
              inputName={"fullName"}
              formik={formik}
              setInputValue={setInputValue}
              studentsModalData={studentsModalData}
              updateModalState={updateModalState}
            />

            <div className="input-couples">
              {inputNameArr1.map((name, index) => (
                <InputField
                  key={index}
                  inputName={name}
                  formik={formik}
                  setInputValue={setInputValue}
                  studentsModalData={studentsModalData}
                  updateModalState={updateModalState}
                />
              ))}
            </div>

            {/* <InputField
              inputName={"emergencyPhone"}
              formik={formik}
              setInputValue={setInputValue}
              studentsModalData={studentsModalData}
              updateModalState={updateModalState}
            /> */}
            {/* <RegionDropdown
              formik={formik}
              selectedWhereFrom={selectedWhereFrom}
              WhereFromDropdown={WhereFromDropdown}
              whereFromOpen={whereFromOpen}
              selectedWhereFromList={selectedWhereFromList}
              whereFromAddData={whereFromAddData}
            />
            <WhereHeard
              formik={formik}
              selectedWhereComing={selectedWhereComing}
              WhereComingDropdown={WhereComingDropdown}
              whereComingOpen={whereComingOpen}
              selectedWhereComingList={selectedWhereComingList}
              whereComingAddData={whereComingAddData}
            /> */}
            {/* sector */}

            <CoursesInput
              formik={formik}
              changeIcon={changeIcon}
              setClassIcon={setClassIcon}
              classIcon={classIcon}
              checkedList={checkedList}
              selectedClassList={selectedClassList}
              setSelectedClassList={setSelectedClassList}
              setInputValue={setInputValue}
              updateModalState={updateModalState}
              studentsModalData={studentsModalData}
            />
            <RadioInput
              studentsModalData={studentsModalData}
              setInputValue={setInputValue}
              formik={formik}
              updateModalState={updateModalState}
            />
            <div className="input-couples">
              {inputNameArr2.map((name, index) => (
                <InputField
                  key={index}
                  inputName={name}
                  formik={formik}
                  setInputValue={setInputValue}
                  studentsModalData={studentsModalData}
                  updateModalState={updateModalState}
                />
              ))}
            </div>

            <InputField
              inputName={"payment"}
              formik={formik}
              setInputValue={setInputValue}
              studentsModalData={studentsModalData}
              updateModalState={updateModalState}
            />
          </div>
        </Box>

        {studentsModalData?._id ? (
          <div className="create-update-modal-btn-con">
            <Status
              studentsModalData={studentsModalData}
              updateModalState={updateModalState}
            />
            <SubmitBtn
              formik={formik}
              studentsModalData={studentsModalData}
              closeModal={closeModal}
              funcType="update"
            />
          </div>
        ) : (
          <SubmitBtn
            formik={formik}
            studentsModalData={studentsModalData}
            closeModal={closeModal}
            funcType="create"
          />
        )}

        {studentsModalData?._id && (
          <div className="joined-time">
            Qoşuldu: {moment(studentsModalData.createdAt).format("YYYY.MM.DD")}
          </div>
        )}
      </div>
    </div>
  );
};
