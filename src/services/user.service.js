    //Data service
import axios from "axios";
import authHeader from "./auth-header";
import config from "config";

const API_ROOT_PATH = "http://192.168.2.129:8080"

const API_URL = "";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

//Public APIs
export const getHomeScheduleItems = (date) => {
    return axios.get(API_ROOT_PATH + `/scheduleItem/home/${date}`)
}

export const getTripInfo = (tripId) => {
    return axios.get(API_ROOT_PATH + `/scheduleItem/singleTrip/${tripId}` )
}

//Authorized APIs

//Holidays
export const apiGetAllHolidays = () => {
  return axios.get(API_ROOT_PATH + "/holidays/all", {headers: authHeader()})
}

export const apiPostHolidaysSave = (newHoliday) => {
  return axios.post(`${API_ROOT_PATH}/holidays/save1`, newHoliday, {headers: authHeader()} )
}

export const apiHolidayDel = (id) => {
  axios.delete(`${API_ROOT_PATH}/holidays/del1?id=${id}`, {headers: authHeader()})
}

//Bus stops

export const apiGetBusStopsAll = () => {
  return axios.get(`${API_ROOT_PATH}/busstop/get/all`, {headers: authHeader()})
}

export const apiPostBusStopSave = (formData) => {
  return axios.post(`${API_ROOT_PATH}/busstop/save/one`, formData, {headers: authHeader()})
}

export const apiGetBusStopSearch = (query) => {
  return axios.get(`${API_ROOT_PATH}/busstop/searchresults?query=${query}`, {headers: authHeader()})
}

export const apiDelBusStop = (id) => {
  axios.delete(`${API_ROOT_PATH}/busstop/delete/${id}`, {headers: authHeader()})
}

//Bus lines

export const apiGetLinesPreview = () => {
  return axios.get(`${API_ROOT_PATH}/line/preview`, {headers: authHeader()})
}

export const apiGetLineEager = (id) => {
  return axios.get(`${API_ROOT_PATH}/line/line-eager?id=${id}`, {headers: authHeader()})
}




