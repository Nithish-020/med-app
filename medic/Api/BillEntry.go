package Api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"medic/Db"
)

type Billentry struct {
	UserId     int     `json:"user_id"`
	MedId      int     `json:"med_id"`
	BillNo     int     `json:"bill_no"`
	Qty        int     `json:"qty"`
	Unitprice  float32 `json:"unitPrice"`
	BillAmount float32 `json:"billAmt"`
}

type BillEntry_resp struct {
	Status string `json:"status"`
	ErrMsg string `json:"errMsg"`
}

func BillEntry(w http.ResponseWriter, r *http.Request) {
	log.Println("BillEntry (+)")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "PUT")
	//* Body
	(w).Header().Set("Access-Control-Allow-Headers", "Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")
	if r.Method == "PUT" {
		var bill Billentry
		var billArr []Billentry
		var resp BillEntry_resp

		body, err := ioutil.ReadAll(r.Body)
		db, err := Db.LocalDBConnect()
		if err != nil {
			resp.Status = "E"
			resp.ErrMsg = "Error : " + err.Error()
			log.Println(err)
		} else {
			defer db.Close()
			if err != nil {
				log.Println("Error :", err)
				resp.Status = "E"
				resp.ErrMsg = "Error : " + err.Error()

			} else {
				err = json.Unmarshal(body, &billArr)
				if err != nil {
					resp.Status = "E"
					resp.ErrMsg = "Error : " + err.Error()
					log.Println(err)
				} else {

					log.Println(billArr)
					for i := 0; i < len(billArr); i++ {
						bill.BillNo = billArr[i].BillNo
						bill.MedId = billArr[i].MedId
						bill.Qty = billArr[i].Qty
						bill.Unitprice = billArr[i].Unitprice
						bill.BillAmount = billArr[i].BillAmount
						bill.UserId = billArr[i].UserId

						sqlString := `select billEntry(?,?,?,?,?,?)`

						_, err := db.Exec(sqlString, bill.BillNo, bill.MedId, bill.Qty, bill.Unitprice, bill.BillAmount, bill.UserId)
						if err != nil {
							log.Println(err)
							resp.Status = "E"
							resp.ErrMsg = "Error : " + err.Error()
						} else {
							log.Println("Billing Successful")
						}

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
		log.Println("BillEntry (+)")
	}
}
