import axios from "axios";
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

    register(username, email, password, name, lastName, nationality) {
        console.log(username)
        return axios.post(API_URL + "/auth/register", {
            userName:username,
            email,
            password,
            name,
            lastName,
            nationality
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();