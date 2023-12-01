import React, { useEffect, useState } from "react";
import MentorService from "../services/MentorService";
import { Link } from "react-router-dom";
import Base from "./Base";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const ListMentorcomponent = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    MentorService.getAllMentors()
      .then((response) => {
        setMentors(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getAllMentors = () => {
    MentorService.getAllMentors()
      .then((response) => {
        setMentors(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteMentor = (mentorId) => {
    MentorService.deleteMentor(mentorId)
      .then((response) => {
        getAllMentors();
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
          List Mentors
        </h2>
        <Link to="/add-mentor" className="btn btn-primary mb-2">
          {" "}
          Add Mentor <IoMdAdd />
        </Link>
        <table className="table table-bordered table-stripped">
          <thead>
            <th> Mentor Id </th>
            <th> Mentors Name </th>
            <th> Mentors Email </th>
            <th> Mentors CourseCode </th>
            <th>Actions </th>
          </thead>

          <tbody>
            {mentors.map((mentor) => (
              <tr key={mentor.id}>
                <td> {mentor.id}</td>
                <td> {mentor.name}</td>
                <td> {mentor.email}</td>
                <td> {mentor.courseCode}</td>
                <td>
                  <Link
                    className="btn btn-info"
                    to={`/edit-mentor/${mentor.id}`}
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteMentor(mentor.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    {" "}
                    Delete <MdDelete />
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

export default ListMentorcomponent;
