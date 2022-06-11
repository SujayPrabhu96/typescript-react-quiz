import axios from "axios";

export default axios.create({
    baseURL: "https://opentdb.com",
    headers: {
        "Content-type": "application/json"
    }
});