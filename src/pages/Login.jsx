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

function Login() {
  const [data, setData] = useState({
    emailId: "",
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
      emailId: "",
      password: "",
    });
  };
  return (
    <Base>
      <br />
      <br />
      <Container className="text-center">
        <h3>Login</h3>
      </Container>
      <Container>
        <Row className="mt-4">
          <Col md={{ size: 6, offset: 3 }}>
            <Card className="shadow sm p-3 mb-5 bg-white rounded">
              <CardBody>
                <Form>
                  <FormGroup>
                    <br />
                    <Input
                      type="email"
                      id="emailId"
                      placeholder="Enter your email"
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                    <br />
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter Password"
                    ></Input>
                  </FormGroup>
                  <Container className="text-center">
                    <Button color="primary">Login</Button>
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

export default Login;
