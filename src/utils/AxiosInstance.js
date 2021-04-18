import {API_URL, JWT_ACCESS_TOKEN_KEY} from "../constants/constants";
import axios from "axios";
import AuthenticationService from "../services/AuthenticationService";

const instance = axios.create({
    baseURL: API_URL,
});

instance.interceptors.request.use((config) => {
    const jwtAccessToken = localStorage.getItem(JWT_ACCESS_TOKEN_KEY);
    if (jwtAccessToken) {
        config.headers.authorization = `Bearer ${jwtAccessToken}`;
    }
    return config;
});

instance.interceptors.response.use(
    response => response,
    err => {
        const error = err.response.data;
        if (err.response.status === 401) {
            if (error.error && error.error.includes('ExpiredJwtException')) {
                return AuthenticationService.refreshToken().then(response => {
                    return instance.request(err.config);
                });
            }
            throw new Error('Authentication error');
        }
        else if (err.response.status === 400) {
            if (error.error && error.error.includes('ExpiredRefreshJwtException')) {
                // should disconnect user because refresh token is expired
            }
            const message = error.message || error.error;
            throw new Error(message);
        } else {
            throw new Error('Server is unreachable');
        }
    }
);

export const axiosInstance = instance;
