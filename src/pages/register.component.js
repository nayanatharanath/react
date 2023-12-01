import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Card } from "reactstrap";
import { toast } from "react-toastify";
import AuthService from "../services/auth.service";
import { textAlign } from "@mui/system";
import Base from "../components/Base";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        (response) => {
          toast.success("Registered Successfully");
          this.setState(
            {
              message: response.data.message,
              successful: true,
            },
            () => {
              setInterval(() => {
                window.location.href = "/login";
              });
            }
          );
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <Base>
        <div className="mt-5">
          <h2 style={{ textAlign: "center" }}>Sign Up</h2>
          <Card
            style={{
              width: "50rem",
              background: "white",
              height: " 30rem",
            }}
          >
            <Form
              style={{ marginLeft: "30px", marginRight: "30px" }}
              onSubmit={this.handleRegister}
              ref={(c) => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <div className="form-group">
                    <label
                      htmlFor="username"
                      style={{
                        fontFamily: "Fuse",
                        fontSize: "20px",
                        marginLeft: "1rem",
                        marginTop: "2rem",
                      }}
                    >
                      Username
                    </label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                      style={{
                        color: "black",
                        border: "dark",
                      }}
                      placeholder="Enter Username"
                    />
                  </div>
                  <br />
                  <br />
                  <div className="form-group">
                    <label
                      htmlFor="email"
                      style={{
                        color: "black",
                        fontFamily: "Fuse",
                        fontSize: "20px",
                        marginLeft: "1rem",
                        marginTop: "1rem",
                      }}
                    >
                      Email
                    </label>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                      style={{
                        color: "black",
                        border: "dark",
                      }}
                      placeholder="Enter EmailId"
                    />
                  </div>
                  <br />
                  <br />
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      style={{
                        color: "black",
                        fontFamily: "Fuse",
                        fontSize: "20px",
                        marginLeft: "1rem",
                        marginTop: "1rem",
                      }}
                    >
                      Password
                    </label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                      style={{
                        color: "black",
                        border: "dark",
                      }}
                      placeholder="Enter Password"
                    />
                  </div>
                  <br />
                  <br />
                  <div
                    className="form-group"
                    style={{ marginBottom: "1rem", marginLeft: "1rem" }}
                  >
                    <button className="btn btn-warning btn-block">
                      <b>Sign Up</b>
                    </button>
                  </div>
                </div>
              )}

              {this.state.message && (
                <div className="form-group">
                  <div
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </Card>
        </div>
      </Base>
    );
  }
}

/*Card
style={{
  background: "radial-gradient(circle, #0f2027, #203a43, #2c5364)",
  width: "40rem",
  marginTop: "10rem",
  marginRight: "10rem",
}}

Source, destination, date - label tag
style={{ color: "white" }}

search - button
style={{ marginRight: "15rem", opacity: "none" }}
color="warning"
*/
