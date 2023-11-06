package Api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"medic/Db"
)

type StockEntry struct {
	UserId int `json:"user_id"`
	MedId  int `json:"med_id"`
	Qty    int `json:"qty"`
	Price  int `json:"price"`
}
type StockEntry_resp struct {
	Status string `json:"status"`
	ErrMsg string `json:"errMsg"`
}

func StockEntrys(w http.ResponseWriter, r *http.Request) {
	log.Println("Stock Entry (+) ")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "PUT")
	//? Body

	(w).Header().Set("Access-Control-Allow-Headers", "Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")

	if r.Method == "PUT" {

		var data StockEntry
		var resp StockEntry_resp

		resp.Status = "S"

		body, err := ioutil.ReadAll(r.Body)
		db, err := Db.LocalDBConnect()

		if err != nil {
			resp.Status = "E"
			resp.ErrMsg = "Error : " + err.Error()
			log.Println(err)
		} else {
			defer db.Close()
			err = json.Unmarshal(body, &data)
			log.Println(&data)
			if data.UserId == 0 || data.MedId == 0 || data.Qty == 0 || data.Price == 0 {
				resp.Status = "E" //! Artificial Error
				log.Println("Please Fill the Respective feilds")
			} else {

				sqlString := `Select stockEntry(?,?,?,?)`

				_, err := db.Exec(sqlString, data.UserId, data.MedId, data.Qty, data.Price)
				if err != nil {
					log.Println(err)
					resp.Status = "E"
					resp.ErrMsg = "Error : " + err.Error()
				} else {
					log.Println("Stock Entry performed Successfully")
				}
			}
			// resp.LogInData = append(resp.LogInData,result )
		}
		datas, err := json.Marshal(resp)
		if err != nil {
			fmt.Fprintf(w, "Error taking data"+err.Error())
		} else {
			fmt.Fprintf(w, string(datas))
		}
		log.Println("Stock Entry  (-)")
	}
}
