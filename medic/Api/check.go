package Api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"medic/Db"
)

type Check struct {
	Valid  string `json:"valid"`
	Status string `json:"status"`
	ErrMsg string `json:"errMsg"`
}

func CheckLog(w http.ResponseWriter, r *http.Request) {
	log.Println("Bill No (+)")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "GET")
	//? Body

	(w).Header().Set("Access-Control-Allow-Headers", "Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")

	if r.Method == "GET" {

		var resp Check
		resp.Status = "S"

		db, err := Db.LocalDBConnect()

		if err != nil {
			resp.Status = "E"
			resp.ErrMsg = "Error : " + err.Error()
			log.Println(err)
		} else {
			defer db.Close()

			CoreString := `select "Not"
			where not exists (
			select *
			from loginhistory l 
			where curdate() = date(l.Login_Time))`

			rows, err := db.Query(CoreString)
			if err != nil {
				resp.Status = "E"
				resp.ErrMsg = "Error : " + err.Error()
				log.Println(err)
			} else {
				resp.Valid = ""
				for rows.Next() {
					err := rows.Scan(&resp.Valid)
					if err != nil {
						resp.Status = "E"
						resp.ErrMsg = "Error : " + err.Error()
						log.Println(err)
					} else {
						log.Println("valid", resp.Valid)

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
