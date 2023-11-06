package Api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"medic/Db"
)

type Stock struct {
	MedId        int    `json:"medId"`
	MedicineName string `json:"medName"`
	Qty          int    `json:"qty"`
	Price        int    `json:"price"`
	Test         string `json:"test"`
}
type Stock_resp struct {
	StockArr []Stock `json:"stockArr"`
	ErrMsg   string  `json:"errMsg"`
	Status   string  `json:"status"`
}

func GetStock(w http.ResponseWriter, r *http.Request) {
	log.Println("Stock (+)")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "GET")

	//* Header
	(w).Header().Set("Access-Control-Allow-Headers", "STRUCT,Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")
	if r.Method == "GET" {
		var stock Stock
		var resp Stock_resp

		resp.Status = "S"
		db, err := Db.LocalDBConnect()
		if err != nil {
			log.Println(err)
			resp.ErrMsg = err.Error()
			resp.Status = "E"
		} else {
			defer db.Close()
			CoreString := `select  m.MedicineName,s.Med_Id ,s.Qty ,s.Price ,nvl(m.test,'')
			from stock s,medicinemaster m where m.Med_Id = s.Med_id `
			rows, err := db.Query(CoreString)
			if err != nil {
				log.Println(err)
				resp.ErrMsg = err.Error()
				resp.Status = "E"
			} else {
				for rows.Next() {
					err := rows.Scan(&stock.MedicineName, &stock.MedId,
						&stock.Qty, &stock.Price, &stock.Test)
					if err != nil {
						log.Println(err)
						resp.ErrMsg = err.Error()
						resp.Status = "E"
					} else {
						resp.StockArr = append(resp.StockArr, stock)
					}
				}
			}
		}
		data, err := json.Marshal(resp)
		if err != nil {
			log.Println(err)
			resp.ErrMsg = err.Error()
			resp.Status = "E"
		} else {
			fmt.Fprintf(w, string(data))

		}
		log.Println("Stock (-)")

	}
}
