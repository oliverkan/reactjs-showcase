import axios from "axios";
import authHeader from "../util/authHeader";
const API_URL = process.env.REACT_APP_API_ADDRESS;
class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + '/auth/login', {
                userName:username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password, name, lastName, nationality, roles) {
        console.log(username)
        return axios.post(API_URL + "/auth/register", {
            userName:username,
            email,
            password,
            name,
            lastName,
            nationality,
            roles
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    getRoles() {
        return axios
            .get(`${API_URL}/auth/roles`).then(response => {
                return response.data;
            });
    }
}

export default new AuthService();