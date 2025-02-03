import axios from "axios";

const REST_API_BASE_URL='http://localhost:8080/api/course';
export const listCourse=()=>axios.get(REST_API_BASE_URL);
export const createCourse = (course) => axios.post(REST_API_BASE_URL,course);
export const getCourse=(courseId)=>axios.get(REST_API_BASE_URL +'/' + courseId);
export const updateCourse=(courseId,course)=>axios.put(REST_API_BASE_URL +"/"+courseId,course);
export const deletecourse=(courseId)=>axios.delete(REST_API_BASE_URL + "/"+ courseId);


export const getCourses = () => {
    return axios.get(REST_API_BASE_URL);
  };