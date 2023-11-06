package Api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"medic/Db"
)

type BillNo_resp struct {
	Bill_No int    `json:"billres"`
	Status  string `json:"status"`
	ErrMsg  string `json:"errMsg"`
}

func GetBillNo(w http.ResponseWriter, r *http.Request) {
	log.Println("Bill No (+)")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "GET")
	//? Body

	(w).Header().Set("Access-Control-Allow-Headers", "Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")

	if r.Method == "GET" {

		var resp BillNo_resp
		resp.Status = "S"

		db, err := Db.LocalDBConnect()

		if err != nil {
			resp.Status = "E"
			resp.ErrMsg = "Error : " + err.Error()
			log.Println(err)
		} else {
			defer db.Close()

			CoreString := `Select max(b.Bill_No)+1
			 from billmaster b `

			rows, err := db.Query(CoreString)
			if err != nil {
				resp.Status = "E"
				resp.ErrMsg = "Error : " + err.Error()
				log.Println(err)
			} else {
				for rows.Next() {
					err := rows.Scan(&resp.Bill_No)
					if err != nil {
						resp.Status = "E"
						resp.ErrMsg = "Error : " + err.Error()
						log.Println(err)
					}
				}
			}
		}
		data, err := json.Marshal(resp)
		if err != nil {
			fmt.Fprintf(w, "Error taking data"+err.Error())
		} else {
			fmt.Fprintf(w, string(data))
		}
		log.Println("Bill No (-)")
	}

}
