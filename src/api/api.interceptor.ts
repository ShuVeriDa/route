import axios from "axios";

const axiosOptions = {
  baseURL: "http://router.project-osrm.org/route/v1/driving/",
}

export const axiosClassic = axios.create(axiosOptions)