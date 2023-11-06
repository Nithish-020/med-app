import axios from "axios";

const baseApiClient = axios.create({
  baseUrL: "",
  withCredentials: true, //this is default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  //* Medicine Master Details
  GetMedMas() {
    return baseApiClient.get("http://localhost:29092/getMedMas");
  },
  //TODO Bill Entry
  BillEntry(body) {
    return baseApiClient.put("http://localhost:29092/getBillEntry", body);
  },
  GetStock() {
    return baseApiClient.get("http://localhost:29092/getStock");
  },
  // TODO Get Bill No
  GetBillNo() {
    return baseApiClient.get("http://localhost:29092/getBillNo");
  },
  //? Get Login
  GetLogin(body) {
    return baseApiClient.put("http://localhost:29092/getLogin", body);
  },
  // ? Put Logout
  Logout(body) {
    return baseApiClient.put("http://localhost:29092/Logout", body);
  },
  // ? Get Logout Login history
  GetLoghistory() {
    return baseApiClient.get("http://localhost:29092/getLoghistory");
  },

  //* Add User
  Adduser(body) {
    return baseApiClient.put("http://localhost:29092/addUser", body);
  },

  //* Biller Dash
  GetBillerdash(body) {
    return baseApiClient.put("http://localhost:29092/getbillerDash", body);
  },

  // * Manager Dash
  GetManagerdash() {
    return baseApiClient.get("http://localhost:29092/getManagerDash");
  },

  // ! Stock Entry
  StockEntry(body) {
    return baseApiClient.put("http://localhost:29092/updatedStock", body);
  },

  // ! Insert Medicine master
  InsertMed(body) {
    return baseApiClient.put("http://localhost:29092/insertMed", body);
  },

  // * Sales Report
  GetSalesReport(body) {
    return baseApiClient.put("http://localhost:29092/getSalesReport", body);
  },


  CheckValid() {
    return baseApiClient.get("http://localhost:29092/checkValid");
  },
  
};
