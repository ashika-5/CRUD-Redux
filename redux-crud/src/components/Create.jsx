import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../features/userDetailSlice";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createUser(users));
    setUsers({ name: "", email: "", age: "", gender: "" });
    navigate("/read");
  };

  return (
    <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={users.name}
          onChange={getUserData}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={users.email}
          onChange={getUserData}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Age</label>
        <input
          type="number"
          name="age"
          className="form-control"
          value={users.age}
          onChange={getUserData}
        />
      </div>

      <div className="mb-3 form-check">
        <input
          className="form-check-input"
          name="gender"
          value="Male"
          type="radio"
          checked={users.gender === "Male"}
          onChange={getUserData}
        />
        <label className="form-check-label">Male</label>
      </div>
      <div className="mb-3 form-check">
        <input
          className="form-check-input"
          name="gender"
          value="Female"
          type="radio"
          checked={users.gender === "Female"}
          onChange={getUserData}
        />
        <label className="form-check-label">Female</label>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Create;
