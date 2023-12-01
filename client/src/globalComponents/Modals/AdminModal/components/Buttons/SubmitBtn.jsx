import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdminAction,
} from "../../../../../redux/actions/adminsActions";
import { createAdminAction } from "../../../../../redux/actions/userAction";
import { ReactComponent as DeleteIcon } from "../../../../../assets/icons/Delete button.svg";
import { ADMINS_MODAL_ACTION_TYPE } from "../../../../../redux/actions-type";
import LoadingBtn from "../../../../Loading/components/LoadingBtn/LoadingBtn";

const SubmitBtn = ({
  formik,
  adminsModalData,
  funcType,
  setShowDeleteModal,
}) => {
  const dispatch = useDispatch();
  const { adminsModalLoading } = useSelector((state) => state.adminsModal);
  const { user } = useSelector((state) => state.user);
  const [isDisabled, setIsDisabled] = useState(() => {
    if (funcType === "update") {
      return false;
    } else {
      return true;
    }
  });

  const adminCreate = () => {
    if (adminsModalData?._id) {
      dispatch(updateAdminAction(adminsModalData?._id, adminsModalData));
    } else {
      dispatch(
        createAdminAction({
          ...adminsModalData
        })
      );
    }
  };

  useEffect(() => {
    setIsDisabled(() => {
      if (funcType === "update") {
        if (
          Object.keys(formik.errors).length === 0 &&
          adminsModalData?.fullName
        ) {
          return false;
        } else if (
          Object.keys(formik.errors).length === 1 &&
          formik.errors.password === "Bu xana tələb olunur."
        ) {
          return false;
        } else {
          return true;
        }
      } else {
        if (formik.isValid && adminsModalData?.fullName) {
          return false;
        } else {
          return true;
        }
      }
    });
  }, [formik.errors]);


  return (
    <div>
      {funcType === "update" ? (
        <div className="create-update-modal-btn update ">
          <button disabled={isDisabled || adminsModalLoading} onClick={adminCreate}>
            {adminsModalLoading ? (
              <LoadingBtn />
            ) : funcType === "update" ? (
              "Yenilə"
            ) : (
              "Yarat"
            )}
          </button>
          <div className="delete-income-modal-btn">
            <DeleteIcon onClick={() => setShowDeleteModal(true)} />
          </div>
          <button
            className="delete-income-modal-btn-mobile"
            onClick={() => setShowDeleteModal(true)}
          >
            Sil
          </button>
        </div>
      ) : (
        <div className="create-update-modal-btn">
          <button disabled={isDisabled || adminsModalLoading} onClick={adminCreate}>
            {adminsModalLoading ? (
              <LoadingBtn />
            ) : funcType === "update" ? (
              "Yenilə"
            ) : (
              "Yarat"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SubmitBtn;
