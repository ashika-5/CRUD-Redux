import React from "react";
import { useSelector } from "react-redux";
import "./CustomModal.css";

const CustomModal = ({ id, setShowPopup }) => {
  const allUsers = useSelector((state) => state.app.users);

  const singleUser = allUsers.find(
    (ele) => Number(ele.id) === Number(id)
  );

  if (!singleUser) {
    return null;
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">

        <button
          onClick={() => setShowPopup(false)}
          className="btn btn-danger"
        >
          Close
        </button>

        <h2>{singleUser.name}</h2>
        <h4>{singleUser.email}</h4>
        <h4>{singleUser.age}</h4>
        <h4>{singleUser.gender}</h4>

      </div>
    </div>
  );
};

export default CustomModal;