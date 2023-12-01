import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { withRouter } from "../common/with-router";
import { Card } from "reactstrap";
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      userName: "",
      userPassword: "",
      loading: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      userName: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      userPassword: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.userName, this.state.userPassword).then(
        () => {
          this.props.router.navigate("/admin-dashboard");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <Base>
        <div>
          <h2 style={{marginTop: "2rem", textAlign:"center"}}>Login</h2>
          <Card
            style={{
              width: "30rem",
              background: "white",
              height: "20rem",
              marginLeft: "27rem"
            }}
          >
            <Form
              style={{ marginLeft: "30px", marginRight: "30px" }}
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
            >
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
                  value={this.state.userName}
                  onChange={this.onChangeUsername}
                  validations={[required]}
                  style={{
                    color: "black",
                    border: "dark",
                  }}
                  placeholder="Enter Username"
                />
              </div>
              <br />
              <div className="form-group">
                <label
                  htmlFor="password"
                  style={{
                    fontFamily: "Fuse",
                    fontSize: "20px",
                    marginLeft: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  Password
                </label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.userPassword}
                  onChange={this.onChangePassword}
                  validations={[required]}
                  style={{
                    color: "black",
                    border: "dark",
                  }}
                  placeholder="Enter Password"
                />
              </div>
              <br />
              <div
                className="form-group"
                style={{ marginBottom: "1rem", marginLeft: "5rem" }}
              >
                <button
                  className="btn btn-warning btn-block"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>
                    <b>Login</b>
                  </span>
                </button>
              </div>

              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
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

export default withRouter(Login);
