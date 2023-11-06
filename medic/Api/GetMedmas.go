package Api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"medic/Db"
)

type Master struct {
	Id      int    `json:"med_id"`
	MedName string `json:"medName"`
	Brand   string `json:"brand"`
}
type Master_resp struct {
	MasterArr []Master `json:"masterArr"`
	ErrMsg    string   `json:"errMsg"`
	Status    string   `json:"status"`
}

func GetMedMas(w http.ResponseWriter, r *http.Request) {
	log.Println("Medicine Master (+)")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "GET")

	//* Header
	(w).Header().Set("Access-Control-Allow-Headers", "STRUCT,Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")
	if r.Method == "GET" {
		var medMass Master
		var resp Master_resp

		resp.Status = "S"
		db, err := Db.LocalDBConnect()
		if err != nil {
			log.Println(err)
			resp.ErrMsg = err.Error()
			resp.Status = "E"
		} else {
			defer db.Close()

			CoreString := `select Med_Id,MedicineName,Brand from medicinemaster`
			rows, err := db.Query(CoreString)
			if err != nil {
				log.Println(err)
				resp.ErrMsg = err.Error()
				resp.Status = "E"
			} else {
				for rows.Next() {
					err := rows.Scan(&medMass.Id, &medMass.MedName, &medMass.Brand)
					if err != nil {
						log.Println(err)
						resp.ErrMsg = err.Error()
						resp.Status = "E"
					} else {
						resp.MasterArr = append(resp.MasterArr, medMass)
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
		log.Println("Medicine Master (-)")

	}
}
