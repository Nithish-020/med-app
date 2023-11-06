package dash

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"medic/Db"
)

type Billdash struct {
	UserId int `json:"user_id"`
}

type Billdash_resp struct {
	Day    string `json:"day"`
	Amount int    `json:"amt"`
}

type Billdash_result struct {
	BillerRes []Billdash_resp `json:"billerRes"`
	Status    string          `json:"status"`
	ErrMsg    string          `json:"errMsg"`
}

func GetBillerdash(w http.ResponseWriter, r *http.Request) {
	log.Println("Request Details+")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "PUT")
	//? Body
	(w).Header().Set("Access-Control-Allow-Headers", "Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")

	log.Println("Biller Dashboard (+)")

	if r.Method == "PUT" {

		var bill Billdash
		var value Billdash_resp
		var resp Billdash_result

		body, err := ioutil.ReadAll(r.Body)
		resp.Status = "S"
		if err != nil {
			log.Println("Error :", err)
			resp.Status = "E"
			resp.ErrMsg = "Error : " + err.Error()

		} else {

			err = json.Unmarshal(body, &bill)

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
					CoreString := `select  (case when c.date_wise = curdate() then 'Today' else 'yesterday' end)days,nvl(a.amount,'0') amount
					from( 
						select bm.BillDate bill,sum(bm.BillAmt) amount,u.User_Id  
						from billmaster bm , userdata u 
						where bm.User_id =  u.User_Id  and u.User_Id  = ?
						group by bm.BillDate )a 
					right join 
					  (
						SELECT  date_sub(curdate(),interval n day) AS date_wise
						FROM (
							 SELECT 0 n  UNION SELECT 1 
						   )numbers
					  ) c
					 on a.bill = c.date_wise`
					rows, err := db.Query(CoreString, bill.UserId)

					if err != nil {
						resp.Status = "E"
						resp.ErrMsg = "Error : " + err.Error()
						log.Println(err)
					} else {
						for rows.Next() {
							err := rows.Scan(&value.Day, &value.Amount)

							if err != nil {
								log.Print(err)
								resp.Status = "E"
								resp.ErrMsg = "Error : " + err.Error()

							} else {
								resp.BillerRes = append(resp.BillerRes, value)

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
		log.Println("Biller Dashboard (-)")
	}
}
