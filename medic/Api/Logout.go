package Api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"medic/Db"
)

type Log_out struct {
	UserId int `json:"user_id"`
}
type Logout_result struct {
	Status string `json:"success"`
	ErrMsg string `json:"errMsg"`
}

func Logout(w http.ResponseWriter, r *http.Request) {
	log.Println("Request Details+")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "PUT")
	//? Body
	(w).Header().Set("Access-Control-Allow-Headers", "Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")

	log.Println("Logout operation (+)")

	if r.Method == "PUT" {
		var logout Log_out
		var resp Logout_result
		body, err := ioutil.ReadAll(r.Body)

		if err != nil {
			log.Println("Error :", err)
			resp.Status = "E"
			resp.ErrMsg = "Error : " + err.Error()

		} else {
			err = json.Unmarshal(body, &logout)

			if err != nil {
				resp.Status = "E"
				resp.ErrMsg = "Error : " + err.Error()
				log.Println(err)
			} else {
				db, err := Db.LocalDBConnect()

				if err != nil {
					resp.Status = "E"
					resp.ErrMsg = "Error : " + err.Error()
					log.Println(err)
				} else {
					defer db.Close()

					sqlString := `select log_entry(?)`
					log.Println("Logout value", logout.UserId)
					_, err := db.Exec(sqlString, logout.UserId)
					if err != nil {
						log.Println(err)
						resp.Status = "E"
						resp.ErrMsg = "Error : " + err.Error()
					} else {
						log.Println("User Logout Successfully")
					}
				}

				datas, err := json.Marshal(resp)
				if err != nil {
					fmt.Fprintf(w, "Error taking data"+err.Error())
				} else {
					fmt.Fprintf(w, string(datas))
				}
				log.Println("Logout operation (-)")
			}
		}
	}
}
