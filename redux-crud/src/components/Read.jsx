import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";

const Read = () => {
  const dispatch = useDispatch();

  const [id, setID] = useState();

  const [showPopup, setShowPopup] = useState(false);

  const { users, loading } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  if (loading) {
    return <h2> Loading... </h2>;
  }

  return (
    <div>
      {showPopup && (
        <CustomModal
          id={id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
      <h2>All Data</h2>

      <div>
        {users &&
          users.map((ele, index) => (
            <div key={`${ele.id}-${index}`} className="card w-50 mx-auto">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {ele.email}
                </h6>
                <p className="card-text">{ele.gender}</p>

                <button
                  type="button"
                  className="card-link"
                  onClick={() => {
                    setID(ele.id);
                    setShowPopup(true);
                  }}
                >
                  View
                </button>

                <button type="button" className="card-link">
                  Edit
                </button>
                <button
                  type="button"
                  className="card-link"
                  onClick={() => dispatch(deleteUser(ele.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Read;
