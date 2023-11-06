package main

import (
	"log"
	"net/http"

	api "medic/Api"
	dash "medic/Dash"
)

func main() {
	log.Println("Api Server started...")

	http.HandleFunc("/checkValid", api.CheckLog)

	http.HandleFunc("/getMedMas", api.GetMedMas)
	http.HandleFunc("/getStock", api.GetStock)
	http.HandleFunc("/getBillEntry", api.BillEntry)
	http.HandleFunc("/getLogin", api.GetLogin)
	http.HandleFunc("/Logout", api.Logout)
	http.HandleFunc("/getLoghistory", api.GetLoghistory)
	http.HandleFunc("/addUser", api.Adduser)
	http.HandleFunc("/getbillerDash", dash.GetBillerdash)

	http.HandleFunc("/getManagerDash", dash.GetManagerdash)

	http.HandleFunc("/updatedStock", api.StockEntrys)
	http.HandleFunc("/insertMed", api.InsertMedMas)
	http.HandleFunc("/getSalesReport", api.GetSalesReport)
	http.HandleFunc("/getBillNo", api.GetBillNo)

	http.ListenAndServe(":29092", nil)

}
