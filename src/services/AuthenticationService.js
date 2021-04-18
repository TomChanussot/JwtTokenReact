import {axiosInstance} from "../utils/AxiosInstance";
import {API_URL, JWT_ACCESS_TOKEN_KEY} from "../constants/constants";

class AuthenticationService {

    login = (username, password) =>
        axiosInstance.post(`${API_URL}authenticate`, {username, password}, {withCredentials: true})
            .then(response => {
                localStorage.setItem(JWT_ACCESS_TOKEN_KEY, response.data.jwtAccessToken);
                return response.data.jwtAccessToken;
            });

    refreshToken = () =>
        axiosInstance.get(`${API_URL}refreshtoken`, {withCredentials: true})
            .then(response => localStorage.setItem(JWT_ACCESS_TOKEN_KEY, response.data.jwtAccessToken));

    testToken = () =>
        axiosInstance.get(`${API_URL}hello`)
            .then(response => response.data.message);
}

export default new AuthenticationService();
