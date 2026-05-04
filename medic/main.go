package main

import (
	"log"
	"net/http"
	"os"
	"time"

	api "medic/Api"
	dash "medic/Dash"
)

// CORS middleware function
func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func main() {
	log.Println("Server Started")
	f, err := os.OpenFile("./log/logfile"+time.Now().Format("02012006.15.04.05.000000000")+".txt", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer f.Close()

	log.SetOutput(f)

	http.HandleFunc("/checkValid", enableCORS(api.CheckLog))

	http.HandleFunc("/getMedMas", enableCORS(api.GetMedMas))
	http.HandleFunc("/getStock", enableCORS(api.GetStock))
	http.HandleFunc("/getBillEntry", enableCORS(api.BillEntry))
	http.HandleFunc("/getLogin", enableCORS(api.GetLogin))
	http.HandleFunc("/Logout", enableCORS(api.Logout))
	http.HandleFunc("/getLoghistory", enableCORS(api.GetLoghistory))
	http.HandleFunc("/addUser", enableCORS(api.Adduser))
	http.HandleFunc("/getbillerDash", enableCORS(dash.GetBillerdash))

	http.HandleFunc("/getManagerDash", enableCORS(dash.GetManagerdash))

	http.HandleFunc("/updatedStock", enableCORS(api.StockEntrys))
	http.HandleFunc("/insertMed", enableCORS(api.InsertMedMas))
	http.HandleFunc("/getSalesReport", enableCORS(api.GetSalesReport))
	http.HandleFunc("/getBillNo", enableCORS(api.GetBillNo))

	log.Println("Server listening on port 29092...")
	if err := http.ListenAndServe(":29092", nil); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
