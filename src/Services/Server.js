
import axios from 'axios';
import { DEFAULT_SERVER_URL } from '../Config/config';

export const server = async (METHOD, URL, BODY="") => {
    axios.defaults.baseURL = DEFAULT_SERVER_URL;

    if(METHOD === "GET") return await axios.get(URL);
    else if (METHOD === "POST") return await axios.post(URL, BODY);
    else if (METHOD === "PUT") return await axios.put(URL, BODY);
    else if (METHOD === "DELETE") return await axios.delete(URL, BODY);
} 