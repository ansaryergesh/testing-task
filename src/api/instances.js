import axios from "axios";
import { apiUrl } from "./apiUrl";
export const instance = axios.create({
    baseURL: apiUrl
});