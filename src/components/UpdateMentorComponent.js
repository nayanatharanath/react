import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MentorService from "../services/MentorService";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FormFeedback } from "reactstrap";
// import { updateMentor } from "./services/MentorService";

const UpdateMentorComponent = () => {
  const [mentor, setMentor] = useState("");

  const { id } = useParams();

  useEffect(() => {
    loadMentor();
  }, []);

  const loadMentor = async () => {
    const result = await axios.get(
      `${"http://localhost:9191/api/mentor/"}/${id}`
    );
    setMentor(result.mentor);
  };

  const handelChange = (event, property) => {
    setErrors({
      errors: {},
      isError: false,
    });
    console.log(mentor.id);
    setMentor({ ...mentor, [property]: event.target.value });
  };

  const [error, setErrors] = useState({
    errors: {},
    isError: false,
  });

  const submitForm = (event) => {
    event.preventDefault();

    MentorService.updateMentor(id, mentor)
      .then((responce) => {
        console.log(responce);
        console.log("success");
        toast.success("Updated Successfully");
        setErrors({
          errors: {},
          isError: false,
        });
      })
      .catch((error) => {
        console.log(error);
        console.log("ereor log");
        setErrors({
          errors: error,
          isError: true,
        });
        toast.error("Invalid Form details");
      });
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center">Update Mentor</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Name :</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    className="form-control"
                    value={mentor?.id}
                    onChange={(e) => handelChange(e, "id")}
                    invalid={
                      error.errors?.response?.data?.id ? true : false
                    }
                  ></input>
                  {/* <FormFeedback>
                    {error.errors?.response?.data?.id}
                  </FormFeedback> */}
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Email Id :</label>
                  <input
                    type="email"
                    placeholder="Enter email Id"
                    name="email"
                    className="form-control"
                    value={mentor?.email}
                    onChange={(e) => handelChange(e, "email")}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Course Code :</label>
                  <input
                    type="text"
                    placeholder="Enter Course Code"
                    name="courseCode"
                    className="form-control"
                    value={mentor?.courseCode}
                    onChange={(e) => handelChange(e, "courseCode")}
                  ></input>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => submitForm(e)}
                >
                  Submit{" "}
                </button>
                <Link to="/mentor" className="btn btn-danger">
                  {" "}
                  Cancel{" "}
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMentorComponent;
