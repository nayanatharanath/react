import React, { useState, useEffect } from "react";
import CourseServices from "../services/CourseServices";
import { Link } from "react-router-dom";
import Base from "./Base";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const ListCourseComponent = () => {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    CourseServices.getAllCourses()
      .then((response) => {
        setCourse(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const getAllCourses = () => {
    CourseServices.getAllCourses()
      .then((response) => {
        setCourse(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCourse = (courseId) => {
    CourseServices.deleteCourse(courseId)
      .then((response) => {
        getAllCourses();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Base>
      <div className="container">
        <h2
          className="text-center"
          style={{ marginTop: "2rem", textAlign: "center" }}
        >
          List Courses
        </h2>
        <Link to="/add-course" className="btn btn-primary mb-2">
          {" "}
          Add Course{" "}<IoMdAdd />
        </Link>
        <br/>
        <table className="table table-bordered table-stripped">
          <thead>
            <th> Course Id </th>
            <th> Course Name </th>
            <th> Start Date </th>
            <th> End Date </th>
            <th> Course Code </th>
            <th>Actions </th>
          </thead>

          <tbody>
            {course.map((course) => (
              <tr key={course.id}>
                <td> {course.courseId}</td>
                <td> {course.courseName}</td>
                <td> {course.startDate}</td>
                <td> {course.endDate} </td>
                <td> {course.courseCode}</td>
                <td>
                  <Link
                    className="btn btn-info"
                    to={`/edit-course/${course.courseId}`}
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCourse(course.courseId)}
                    style={{ marginLeft: "10px" }}
                  >
                    {" "}{" "}
                    Delete{" "} <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Base>
  );
};

export default ListCourseComponent;
