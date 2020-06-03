import axios from "axios";
const API_URL = process.env.REACT_APP_API_ADDRESS;
class CountryService {
    getCountryList() {
        return axios
            .get(`${API_URL}/countries`)
            .then(response => {
                return response.data;
            });
    }
}

export default new CountryService();