import axios from "axios";
import authHeader from '../util/authHeader';

const API_URL = process.env.REACT_APP_API_ADDRESS;
class StatisticService {
    getStatistics() {
        return axios
            .get(`${API_URL}/statistics`, {headers:authHeader()})
            .then(response => {
                return response.data;
            });
    }
}

export default new StatisticService();