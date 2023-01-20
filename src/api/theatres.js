import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllTheatres = async () => {
    const getUrl = `${BASE_URL}/mba/api/v1/theatres`;
    return await axios.get(getUrl);
};

