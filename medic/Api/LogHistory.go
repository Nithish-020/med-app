package Api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"medic/Db"
)

type Loghis struct {
	UserName   string `json:"username"`
	LoginDate  string `json:"login_date"`
	LoginTime  string `json:"login_time"`
	LogoutDate string `json:"logout_date"`
	LogoutTime string `json:"logout_time"`
}
type Loghis_resp struct {
	LoghisArr []Loghis `json:"loghisArr"`
	ErrMsg    string   `json:"errMsg"`
	Status    string   `json:"status"`
}

func GetLoghistory(w http.ResponseWriter, r *http.Request) {
	log.Println("Loghis (+)")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "GET")

	//* Header
	(w).Header().Set("Access-Control-Allow-Headers", "Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")
	if r.Method == "GET" {
		var loghis Loghis
		var resp Loghis_resp

		resp.Status = "S"
		db, err := Db.LocalDBConnect()
		if err != nil {
			log.Println(err)
			resp.ErrMsg = err.Error()
			resp.Status = "E"
		} else {
			defer db.Close()
			CoreString := `select u.User  ,date(lh.Login_Time) login_date,time(lh.Login_Time) login_time,
			nvl(date(lh.Logout_Time),'Working..')logout_date,nvl(time(lh.Logout_Time),'Working..')
			logout_time 
			from loginhistory lh ,userdata u 
			where u.User_Id  = lh.UserId `
			rows, err := db.Query(CoreString)
			if err != nil {
				log.Println(err)
				resp.ErrMsg = err.Error()
				resp.Status = "E"
			} else {
				for rows.Next() {
					err := rows.Scan(&loghis.UserName, &loghis.LoginDate, &loghis.LoginTime,
						&loghis.LogoutDate, &loghis.LogoutTime)
					if err != nil {
						log.Println(err)
						resp.ErrMsg = err.Error()
						resp.Status = "E"
					} else {
						resp.LoghisArr = append(resp.LoghisArr, loghis)
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
		log.Println("Loghis (-)")

	}
}
