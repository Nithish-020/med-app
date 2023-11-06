package Api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"medic/Db"
)

type SalesReport struct {
	From string `json:"fromDate"`
	To   string `json:"toDate"`
}

type SalesReport_resp struct {
	BilNo        int     `json:"bil_no"`
	Date         string  `json:"date"`
	MedicineName string  `json:"medName"`
	Qty          int     `json:"qty"`
	Amount       float32 `json:"amt"`
}

type SalesReport_result struct {
	SalesReportArr []SalesReport_resp `json:"salesReportArr"`
	Status         string             `json:"status"`
	ErrMsg         string             `json:"errMsg"`
}

func GetSalesReport(w http.ResponseWriter, r *http.Request) {
	log.Println("Sales Report (+)")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "PUT")
	//? Body

	(w).Header().Set("Access-Control-Allow-Headers", "Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")

	if r.Method == "PUT" {

		var srep SalesReport
		var result SalesReport_resp
		var resp SalesReport_result
		resp.Status = "S"

		body, err := ioutil.ReadAll(r.Body)
		db, err := Db.LocalDBConnect()

		if err != nil {
			resp.Status = "E"
			resp.ErrMsg = "Error : " + err.Error()
			log.Println(err)
		} else {
			defer db.Close()
			err = json.Unmarshal(body, &srep)

			CoreString := `select bd.Bill_No ,date(bm.BillDate) Dates  ,mm.MedicineName ,bd.Qty  ,bd.Amt  
			from billdetails bd ,billmaster bm ,medicinemaster mm
			where bd.Bill_No = bm.Bill_No  and mm.Med_Id  = bd.Med_id  and bm.BillDate  between date(?) and date(?)`

			rows, err := db.Query(CoreString, &srep.From, &srep.To)

			if err != nil {
				resp.Status = "E"
				resp.ErrMsg = "Error : " + err.Error()
				log.Println(err)
			} else {
				for rows.Next() {
					err := rows.Scan(&result.BilNo, &result.Date, &result.MedicineName, &result.Qty, &result.Amount)

					log.Println("db result", result)
					if err != nil {
						resp.Status = "E"
						resp.ErrMsg = "Error : " + err.Error()
						log.Println(err)
					} else {
						resp.SalesReportArr = append(resp.SalesReportArr, result)

					}
				}
			}
		}

		datas, err := json.Marshal(resp)
		if err != nil {
			fmt.Fprintf(w, "Error taking data"+err.Error())
		} else {
			fmt.Fprintf(w, string(datas))
		}
		log.Println("Sales Report (-)")
	}
}
