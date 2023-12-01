import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import MentorService from "../services/MentorService";
import axios from "axios";
import Base from "./Base";

const AddMentorComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateMentor = (e) => {
    e.preventDefault();

    const mentor = { name, email, courseCode };

    if (id) {
      MentorService.updateMentor(id, mentor)
        .then((response) => {
          //   const { id } = useParams();
          console.log("hi", id);

          navigate("/mentor");
          //<Navigate path= '/mentor' />
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      MentorService.createMentor(mentor)
        .then((response) => {
          console.log(response.mentor);

          navigate("/mentor");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    MentorService.getMentorById(id)
      .then((response) => {
        setName(response.mentor.name);
        setEmail(response.mentor.email);
        setCourseCode(response.mentor.courseCode);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (id) {
      return (
        <h2
          className="text-center"
          style={{ marginTop: "2rem", textAlign: "center" }}
        >
          Update Mentor
        </h2>
      );
    } else {
      return (
        <h2
          className="text-center"
          style={{ marginTop: "2rem", textAlign: "center" }}
        >
          Add Mentor
        </h2>
      );
    }
  };

  return (
    <Base>
      <div>
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {title()}
              <div className="card-body">
                <form>
                  <div className="form-group mb-2">
                    <label
                      className="form-label"
                      style={{
                        fontFamily: "Fuse",
                        fontSize: "20px",
                        marginLeft: "1rem",
                        marginTop: "2rem",
                      }}
                    >
                      {" "}
                      Name :
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        color: "black",
                        border: "dark",
                      }}
                    ></input>
                  </div>

                  <div className="form-group mb-2">
                    <label
                      className="form-label"
                      style={{
                        fontFamily: "Fuse",
                        fontSize: "20px",
                        marginLeft: "1rem",
                        marginTop: "2rem",
                      }}
                    >
                      {" "}
                      Email Id :
                    </label>
                    <input
                      type="email"
                      placeholder="Enter email Id"
                      name="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        color: "black",
                        border: "dark",
                      }}
                    ></input>
                  </div>

                  <div className="form-group mb-2">
                    <label
                      className="form-label"
                      style={{
                        fontFamily: "Fuse",
                        fontSize: "20px",
                        marginLeft: "1rem",
                        marginTop: "2rem",
                      }}
                    >
                      {" "}
                      Course Code :
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Course Code"
                      name="courseCode"
                      className="form-control"
                      value={courseCode}
                      onChange={(e) => setCourseCode(e.target.value)}
                      style={{
                        color: "black",
                        border: "dark",
                      }}
                    ></input>
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={(e) => saveOrUpdateMentor(e)}
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
    </Base>
  );
};

export default AddMentorComponent;
