import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CourseService from "../services/CourseServices";
import axios from "axios";
import Base from "./Base";

const AddCourseComponent = () => {
  const [courseName, setCourseName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const navigate = useNavigate();
  const { courseId } = useParams();

  const saveOrUpdateCourse = (e) => {
    e.preventDefault();

    const course = { courseName, startDate, endDate, courseCode };

    if (courseId) {
      CourseService.updateCourse(courseId, course)
        .then((response) => {
          //   const { id } = useParams();
          console.log("hi", courseId);

          navigate("/course");
          //<Navigate path= '/mentor' />
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      CourseService.createCourse(course)
        .then((response) => {
          console.log(response.data);

          navigate("/course");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    CourseService.getCourseById(courseId)
      .then((response) => {
        setCourseName(response.data.courseName);
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
        setCourseCode(response.data.courseCode);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const title = () => {
    if (courseId) {
      return (
        <h2
          className="text-center"
          style={{ marginTop: "2rem", textAlign: "center" }}
        >
          Update Course
        </h2>
      );
    } else {
      return (
        <h2
          className="text-center"
          style={{ marginTop: "2rem", textAlign: "center" }}
        >
          Add Course
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
                      Course Name :
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      className="form-control"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
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
                      Start Date :
                    </label>
                    <input
                      type="date"
                      placeholder="Enter Start Date"
                      name="startDate"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
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
                      End Date :
                    </label>
                    <input
                      type="date"
                      placeholder="Enter End Date"
                      name="endDate"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
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
                    onClick={(e) => saveOrUpdateCourse(e)}
                  >
                    Submit{" "}{" "}
                  </button>
                  <Link to="/course" className="btn btn-danger">
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

export default AddCourseComponent;
