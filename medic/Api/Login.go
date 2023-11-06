package Api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"medic/Db"
)

type Login_data struct {
	UserName string `json:"username"`
	Password string `json:"password"`
}

type Login_resp struct {
	UserId int    `json:"user_id"`
	Name   string `json:"username"`
	Role   string `json:"role"`
}

type Login_result struct {
	// LogInData []Login_resp `json:"loginData"`
	LogInData Login_resp `json:"loginData"`
	Status    string     `json:"status"`
	ErrMsg    string     `json:"errMsg"`
}

func GetLogin(w http.ResponseWriter, r *http.Request) {
	log.Println("Login operation (+)")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "PUT")
	//? Body

	(w).Header().Set("Access-Control-Allow-Headers", "Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")

	if r.Method == "PUT" {

		var data Login_data
		var result Login_resp
		var resp Login_result
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

			CoreString := `Select User_Id,User,Role From userdata Where User = ? and Password = ?`

			rows, err := db.Query(CoreString, &data.UserName, &data.Password)
			log.Println("data from front", data.UserName, data.Password)

			if err != nil {
				resp.Status = "E"
				resp.ErrMsg = "Error : " + err.Error()
				log.Println(err)
			} else {
				for rows.Next() {
					err := rows.Scan(&result.UserId, &result.Name, &result.Role)
					// log.Println("response from Db", result.UserId, result.Name, result.Role)
					// log.Println("db result", result)
					if err != nil {
						resp.Status = "E"
						resp.ErrMsg = "Error : " + err.Error()
						log.Println(err)
					} else {
						if result.UserId == 0 && result.Name == "" && result.Role == "" {
							resp.ErrMsg = "Login failed"
							resp.Status = "E" //! Artifacial Error
						} else {

							sqlString := `select log_entry(?)`

							_, err := db.Exec(sqlString, result.UserId)
							if err != nil {
								log.Println(err)
								resp.Status = "E"
								resp.ErrMsg = "Error : " + err.Error()
							} else {
								log.Println("User Login Insert Successfully")
							}
							resp.LogInData = result
							// resp.LogInData = append(resp.LogInData,result )
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
		log.Println("Login operation (-)")
	}
}
