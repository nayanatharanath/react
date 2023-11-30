import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Input,
  Button,
  FormGroup,
} from "reactstrap";
import Base from "../components/Base";
import { signUp } from "../services/user-service";

function SignUp() {
  const [data, setData] = useState({
    fullName: "",
    emailId: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "",
    password: "",
  });

  //to show error
  const [error, setError] = useState({
    error: {},
    isError: false, //flag indicating, if there is a error or not
  });

  // to handle change
  const handleChange = (event, property) => {
    //dynamic setting the values
    setData({ ...data, [property]: event.target.value });
  };

  //reseting the form
  const resetData = () => {
    setData({
      fullName: "",
      emailId: "",
      mobileNumber: "",
      dateOfBirth: "",
      gender: "",
      password: "",
    });
  };

  // submit the form
  const submitForm = (event) => {
    event.preventDefault();

    //data validate

    //call server api for sending data
    signUp(data)
      .then((resp) => {
        console.log(resp);
        console.log("success log");
      })
      .catch((error) => {
        console.log(error);
        console.log("Error Log");
      });
  };

  return (
    <Base>
      <br />
      <br />
      <Container className="text-center">
        <h3>SignUp</h3>
      </Container>
      <Container>
        <Row className="mt-4">
          <Col md={{ size: 6, offset: 3 }}>
            <Card className="shadow sm p-3 mb-5 bg-white rounded">
              <CardBody>
                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Input
                      type="text"
                      id="fullName"
                      placeholder="Enter your full name"
                      onChange={(e) => handleChange(e, "fullName")}
                      value={data.fullName}
                    ></Input>
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <Input
                      type="email"
                      id="emailId"
                      placeholder="Enter your email"
                      onChange={(e) => handleChange(e, "emailId")}
                      value={data.emailId}
                    ></Input>
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <Input
                      type="number"
                      id="mobileNumber"
                      placeholder="Enter your Contact number"
                      onChange={(e) => handleChange(e, "mobileNumber")}
                      value={data.mobileNumber}
                    ></Input>
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <Input
                      type="date"
                      id="dateOfBirth"
                      placeholder="DOB"
                      onChange={(e) => handleChange(e, "dateOfBirth")}
                      value={data.date}
                    ></Input>
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <Input
                      type="select"
                      id="gender"
                      placeholder="Select"
                      onChange={(e) => handleChange(e, "gender")}
                      value={data.email}
                    >
                      <option>Female</option>
                      <option>Male</option>
                      <option>Prefer Not to Say!</option>
                    </Input>
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Create Password"
                      onChange={(e) => handleChange(e, "password")}
                      value={data.password}
                    ></Input>
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="primary">Signup</Button>
                    <Button
                      onClick={resetData}
                      type="reset"
                      outline
                      className="ms-2"
                    >
                      Reset
                    </Button>
                  </Container>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Base>
  );
}

export default SignUp;
