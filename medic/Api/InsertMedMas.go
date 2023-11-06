package Api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"medic/Db"
)

type MedMas struct {
	UserId  int    `json:"user_id"`
	MedName string `json:"medName"`
	Brand   string `json:"brand"`
}
type check struct {
	MedName string `json:"medicinename"`
	Brand   string `json:"medicinebrand"`
}
type MedMas_resp struct {
	Status string `json:"status"`
	ErrMsg string `json:"errMsg"`
}

func InsertMedMas(w http.ResponseWriter, r *http.Request) {
	log.Println("Insert MedMas  Entry (+) ")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "PUT")
	//? Body

	(w).Header().Set("Access-Control-Allow-Headers", "Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")

	if r.Method == "PUT" {

		var med MedMas
		var check check
		var resp MedMas_resp

		resp.Status = "S"

		body, err := ioutil.ReadAll(r.Body)
		db, err := Db.LocalDBConnect()

		if err != nil {
			resp.Status = "E"
			resp.ErrMsg = "Error : " + err.Error()
			log.Println(err)
		} else {
			defer db.Close()
			err = json.Unmarshal(body, &med)
			log.Println(&med)
			if err != nil {
				resp.Status = "E"
				resp.ErrMsg = "Error : " + err.Error()
				log.Println(err)
			} else {
				CoreString := `Select MedicineName,Brand from medicinemaster`

				rows, err := db.Query(CoreString)
				if err != nil {
					resp.Status = "E"
					resp.ErrMsg = "Error : " + err.Error()
					log.Println(err)
				} else {
					for rows.Next() {
						err := rows.Scan(&check.MedName,&check.Brand)
						if err != nil {
							resp.Status = "E"
							resp.ErrMsg = "Error : " + err.Error()
							log.Println(err)
						} else {
							if med.MedName == check.MedName && med.Brand == check.Brand {
								resp.Status = "E" //! Artificial Error
								resp.ErrMsg = "Error : Medicine Name Already Exist"
							} else {

								sqlString := `select med_entry(?,?,?)`

								_, err := db.Exec(sqlString, med.MedName, med.Brand, med.UserId)
								if err != nil {
									log.Println(err)
									resp.Status = "E"
									resp.ErrMsg = "Error : " + err.Error()
								} else {
									log.Println("New Medicine Added successfully")
								}
							}
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
		log.Println("Insert MedMas Entry  (-)")
	}
}
