import axios from "axios";

const api = axios.create({
  baseURL: "https://goodluckynews.store", // 실제 API 주소 입력
  timeout: 10000, // 10초 타임아웃 설정
});

export default api;
