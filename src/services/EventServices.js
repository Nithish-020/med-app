import axios from "axios";

const baseApiClient = axios.create({
  baseUrL: "http://localhost:29092",
  withCredentials: true, //this is default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  //* Medicine Master Details
  GetMedMas() {
    return baseApiClient.get("/getMedMas");
  },
  //TODO Bill Entry
  BillEntry(body) {
    return baseApiClient.put("/getBillEntry", body);
  },
  GetStock() {
    return baseApiClient.get("/getStock");
  },
  // TODO Get Bill No
  GetBillNo() {
    return baseApiClient.get("/getBillNo");
  },
  //? Get Login
  GetLogin(body) {
    return baseApiClient.put("/getLogin", body);
  },
  // ? Put Logout
  Logout(body) {
    return baseApiClient.put("/Logout", body);
  },
  // ? Get Logout Login history
  GetLoghistory() {
    return baseApiClient.get("/getLoghistory");
  },

  //* Add User
  Adduser(body) {
    return baseApiClient.put("/addUser", body);
  },

  //* Biller Dash
  GetBillerdash(body) {
    return baseApiClient.put("/getbillerDash", body);
  },

  // * Manager Dash
  GetManagerdash() {
    return baseApiClient.get("/getManagerDash");
  },

  // ! Stock Entry
  StockEntry(body) {
    return baseApiClient.put("/updatedStock", body);
  },

  // ! Insert Medicine master
  InsertMed(body) {
    return baseApiClient.put("/insertMed", body);
  },

  // * Sales Report
  GetSalesReport(body) {
    return baseApiClient.put("/getSalesReport", body);
  },


  CheckValid() {
    return baseApiClient.get("/checkValid");
  },
  
};
