import axios from "axios";
 
const API_URL = "http://localhost:9090/";
 
class AuthService {
  async login(userName, userPassword) {
    const response = await axios
      .post(API_URL + "authenticate", {
        userName,
        userPassword
      });
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }
 
  logout() {
    localStorage.removeItem("user");
  }
 
  register(userName, email, userPassword) {
    return axios.post(API_URL + "registerNewUser", {
      userName,
      email,
      // mobileNumber,
      // updatedRole,
      userPassword
    });
 
  }
 
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
 
export default new AuthService();