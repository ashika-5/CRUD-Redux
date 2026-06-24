import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { showUser } from "../features/userDetailSlice";
const Read = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, []);



  if (loading) {
    return <h2> Loading... </h2>;
  }

  return (
    <div>
      <h2>All Data</h2>

      <div>
        {users && users.map((ele) => (
          <div className="card w-50 mx-auto">
          <div className="card-body">
            <h5 className="card-title">{ele.name}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              Card subtitle
            </h6>
            <p className="card-text">
             
            </p>
            <a href="#" className="card-link">
              Card link
            </a>
            <a href="#" class="card-link">
              Another link
            </a>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Read;
