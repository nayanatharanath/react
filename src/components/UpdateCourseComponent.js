import React from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CourseService from "../services/CourseServices";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FormFeedback } from "reactstrap";
// import { updateMentor } from "./services/MentorService";
// import { updateCourse } from "./services/CourseServices";
const UpdateCourseComponent = () => {
  const [course, setCourse] = useState("");

  const { courseId } = useParams();

  useEffect(() => {
    loadCourse();
  }, []);

  const loadCourse = async () => {
    const result = await axios.get(
      `${"http://localhost:8081/api/course/"}/${courseId}`
    );
    setCourse(result.course);
  };

  const handleChange = (event, property) => {
    setErrors({
      errors: {},
      isError: false,
    });
    console.log(course.courseId);
    setCourse({ ...course, [property]: event.target.value });
  };

  const [error, setErrors] = useState({
    errors: {},
    isError: false,
  });

  const submitForm = (event) => {
    event.preventDefault();

    CourseService.updateCourse(courseId, course)
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
            <h2 className="text-center">Update Course</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Course Name :</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    name="courseName"
                    className="form-control"
                    value={course?.courseId}
                    onChange={(e) => handleChange(e, "courseName")}
                    invalid={error.errors?.response?.data?.id ? true : false}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Start Date :</label>
                  <input
                    type="date"
                    placeholder="Enter Start Date"
                    name="startDate"
                    className="form-control"
                    value={course?.startDate}
                    onChange={(e) => handleChange(e, "startDate")}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> End Date :</label>
                  <input
                    type="date"
                    placeholder="Enter End Date"
                    name="endDate"
                    className="form-control"
                    value={course?.endDate}
                    onChange={(e) => handleChange(e, "endDate")}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Course Code :</label>
                  <input
                    type="text"
                    placeholder="Enter Course Code"
                    name="courseCode"
                    className="form-control"
                    value={course?.courseCode}
                    onChange={(e) => handleChange(e, "courseCode")}
                  ></input>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => submitForm(e)}
                >
                  Submit{" "}
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
  );
};

export default UpdateCourseComponent;
