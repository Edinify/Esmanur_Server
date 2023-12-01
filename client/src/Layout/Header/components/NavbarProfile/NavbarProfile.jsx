import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ReactComponent as UserProfileIcon } from "../../../../assets/icons/header/user-02.svg";
import { ReactComponent as UserProfileBlueIcon } from "../../../../assets/icons/header/change-user-icon.svg";
import { ReactComponent as ChangePasswordIcon } from "../../../../assets/icons/password-check.svg";
import { ReactComponent as LogoutIcon } from "../../../../assets/icons/log-out-03.svg";
import { logoutAction } from "../../../../redux/actions/auth";
import { ChangePasswordModal } from "../../../../globalComponents/Header/ChangePasswordModal/ChangePasswordModal";
import { getBranchesAction } from "../../../../redux/actions/branchesActions";

const NavbarProfile = () => {
  const dispatch = useDispatch();
  const { branchesData } = useSelector((state) => state.branchesData);
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [changeUserIcon, setChangeUserIcon] = useState(false);

  const navigateExit = () => {
    // window.location = "/login";
    // navigate("/login");
    dispatch(logoutAction());
  };

  window.onclick = function () {
    setIsOpen(false);
    setChangeUserIcon(false);
  };

  const handleActive = (e) => {
    setIsOpen(!isOpen);
    setChangeUserIcon(!changeUserIcon);

    e.stopPropagation();
  };

  const handleOpenModal = () => {
    setOpenModal(!openModal);
    setIsOpen(false);
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "overlay";
    }
  }, [openModal]);

  useEffect(() => {
    dispatch(getBranchesAction());
  }, []);

  return (
    <>
      <div className="main-nav-icons">
        {branchesData.length > 0 && (
          <h6 className="branch-name">
            filial:{" "}
            <span>
              {branchesData.find((item) => item._id === user?.branch)?.name}
            </span>
          </h6>
        )}

        <div className="profile-img-con">
          <div className="profile-img" onClick={(e) => handleActive(e)}>
            {changeUserIcon ? (
              <div className="change-user-icon">
                <UserProfileBlueIcon />
              </div>
            ) : (
              <div className="user-icon-head">
                <UserProfileIcon />
              </div>
            )}
          </div>
          <div className={`user-modal-con ${isOpen ? "active" : ""}`}>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="user-modal"
            >
              {user.role === "super-admin" ? (
                <div className="user-func">
                  <div className="password-change-func">
                    <ChangePasswordIcon />
                    <p onClick={handleOpenModal}>Şifrəni dəyiş</p>
                  </div>

                  <div className="logout-func" onClick={navigateExit}>
                    <LogoutIcon />
                    <p>Çıxış</p>
                  </div>
                </div>
              )
              :
              <div className="user-func admin ">
              <div className="logout-func " onClick={navigateExit}>
                    <LogoutIcon />
                    <p>Çıxış</p>
                  </div>
                  </div>
            }
            </div>

            <div className="user-modal-bg"></div>
          </div>
        </div>
      </div>
      {openModal && <ChangePasswordModal setOpenModal={setOpenModal} />}
    </>
  );
};

export default NavbarProfile;
