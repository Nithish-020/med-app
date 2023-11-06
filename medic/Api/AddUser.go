package Api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"medic/Db"
)

// * From Front side
type AddUser struct {
	UserId   int    `json:"user_id"`
	UserName string `json:"username"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

// * from DB side
type Check_user struct {
	UserName string `json:"username"`
	Password string `json:"password"`
	Role     string `json:"role"`
}
type AddUser_resp struct {
	Status string `json:"status"`
	ErrMsg string `json:"errMsg"`
}

func Adduser(w http.ResponseWriter, r *http.Request) {
	log.Println("Request Details+")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "PUT")
	//? Body
	(w).Header().Set("Access-Control-Allow-Headers", "Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")

	log.Println("Adduser operation (+)")

	if r.Method == "PUT" {
		var add AddUser
		var resp AddUser_resp
		var check Check_user
		body, err := ioutil.ReadAll(r.Body)
		resp.Status = "S"
		if err != nil {
			log.Println("Error :", err)
			resp.Status = "E"
			resp.ErrMsg = "Error : " + err.Error()

		} else {
			err = json.Unmarshal(body, &add)

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
					CoreString := `select u.User,u.Password,u.Role from userdata u`
					rows, err := db.Query(CoreString)
					// log.Println("data from front", data.UserName, data.Password)
					if err != nil {
						resp.Status = "E"
						resp.ErrMsg = "Error : " + err.Error()
						log.Println(err)
					} else {
						for rows.Next() {
							err := rows.Scan(&check.UserName, &check.Password, &check.Role)
							if err != nil {
								log.Print(err)
								resp.Status = "E"
								resp.ErrMsg = "Error : " + err.Error()

							} else {
								if add.UserName == "" || add.Password == "" || add.Role == "" {
									resp.Status = "E" //! Artificial Error 1
								} else {
									if check.UserName == add.UserName && check.Password == add.Password && check.Role == add.Role {
										resp.Status = "E" //! Artificial Error 2
									} else {
										sqlString := `select add_user(?,?,?,?)`
										_, err := db.Exec(sqlString, add.UserName, add.Password, add.Role, add.UserId)
										if err != nil {
											log.Println(err)
											resp.Status = "E"
											resp.ErrMsg = "Error : " + err.Error()
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
						log.Println("Adduser operation (-)")
					}
				}
			}
		}
	}
}
