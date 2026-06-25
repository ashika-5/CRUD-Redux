import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showUser, updateUser } from "../features/userDetailSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading } = useSelector((state) => state.app);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(showUser());
      return;
    }

    const selectedUser = users.find((user) => String(user.id) === String(id));
    if (selectedUser) {
      setFormData({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        age: selectedUser.age || "",
        gender: selectedUser.gender || "",
      });
    }
  }, [dispatch, id, users]);

  const getUserData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUser({ id, data: formData }));
    navigate("/read");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2 className="my-2">Edit the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={getUserData}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={getUserData}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            name="age"
            className="form-control"
            value={formData.age}
            onChange={getUserData}
          />
        </div>

        <div className="mb-3 form-check">
          <input
            className="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            checked={formData.gender === "Male"}
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
            checked={formData.gender === "Female"}
            onChange={getUserData}
          />
          <label className="form-check-label">Female</label>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
