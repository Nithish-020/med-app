import axios from "axios";

const baseApiClient = axios.create({
  baseURL: "http://localhost:29092",
  withCredentials: true,
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

baseApiClient.interceptors.request.use(
  (config) => {
    console.log(
      "API Request:",
      config.method?.toUpperCase(),
      config.url,
      config.data,
    );
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  },
);

baseApiClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error(
      "Response Error:",
      error.response?.status,
      error.response?.data,
      error.message,
    );
    return Promise.reject(error);
  },
);

const EventService = {
  GetMedMas: () => baseApiClient.get("/getMedMas"),
  BillEntry: <T>(body: T) => baseApiClient.put("/getBillEntry", body),
  GetStock: () => baseApiClient.get("/getStock"),
  GetBillNo: () => baseApiClient.get("/getBillNo"),
  GetLogin: <T>(body: T) => baseApiClient.put("/getLogin", body),
  Logout: <T>(body: T) => baseApiClient.put("/Logout", body),
  GetLoghistory: () => baseApiClient.get("/getLoghistory"),
  Adduser: <T>(body: T) => baseApiClient.put("/addUser", body),
  GetBillerdash: <T>(body: T) => baseApiClient.put("/getbillerDash", body),
  GetManagerdash: () => baseApiClient.get("/getManagerDash"),
  StockEntry: <T>(body: T) => baseApiClient.put("/updatedStock", body),
  InsertMed: <T>(body: T) => baseApiClient.put("/insertMed", body),
  GetSalesReport: <T>(body: T) => baseApiClient.put("/getSalesReport", body),
  CheckValid: () => baseApiClient.get("/checkValid"),
};

export default EventService;
