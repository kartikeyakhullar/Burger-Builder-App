
import axios from "axios";

const instance = axios.create({
    baseURL : 'https://react-my-burger-47f48.firebaseio.com/'
});

export default instance;