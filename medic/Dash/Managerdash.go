package dash

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"medic/Db"
)

type DailySale struct {
	WeekDay string `json:"weekDay"`
	Values  string `json:"dailyVal"`
}
type Monthlysale struct {
	Month    string `json:"months"`
	MonthVal string `json:"monthVal"`
}
type TodaySalePerf struct {
	UserName string  `json:"userName"`
	Amount   float32 `json:"amount"`
}
type CurrentMnthPerf struct {
	UserName string  `json:"userName"`
	Amount   float32 `json:"amount"`
}

type Combine struct {
	TodaySaleVal       float32           `json:"todaySaleVal"`
	TotalinventryVal   float32           `json:"totalInventryVal"`
	DailySaleArr       []DailySale       `json:"dailySaleArr"`
	MonthlysaleArr     []Monthlysale     `json:"monthlysaleArr"`
	TodaySalePerfArr   []TodaySalePerf   `json:"todaySalePerfArr"`
	CurrentMnthPerfArr []CurrentMnthPerf `json:"currentMnthPerfArr"`
}
type Manager_resp struct {
	Manager_respArr Combine `json:"manager_resp"`
	Status          string  `json:"status"`
	ErrMsg          string  `json:"errMsg"`
}

func GetManagerdash(w http.ResponseWriter, r *http.Request) {
	log.Println("Manager Dash (+)")
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Credentials", "true")
	(w).Header().Set("Access-Control-Allow-Methods", "GET")

	//* Header
	(w).Header().Set("Access-Control-Allow-Headers", "Accept,Content-Type,Content-Length,Accept-Encoding,X-CSRF-Token,Authorization")
	if r.Method == "GET" {

		var resp Manager_resp

		db, err := Db.LocalDBConnect()
		if err != nil {
			log.Println(err)
			resp.ErrMsg = err.Error()
			resp.Status = "E"
		} else {
			defer db.Close()

			resp.Manager_respArr.TodaySaleVal, err = TodaySales(db)

			if err != nil {
				log.Println(err)
				resp.ErrMsg = err.Error()
				resp.Status = "E"
			} else {
				resp.Manager_respArr.TotalinventryVal, err = TotalInvEntry(db)

				if err != nil {
					log.Println(err)
					resp.ErrMsg = err.Error()
					resp.Status = "E"
				} else {
					resp.Manager_respArr.DailySaleArr, err = DailySales(db)

					if err != nil {
						log.Println(err)
						resp.ErrMsg = err.Error()
						resp.Status = "E"
					} else {
						resp.Manager_respArr.MonthlysaleArr, err = MonthlySales(db)
						if err != nil {
							log.Println(err)
							resp.ErrMsg = err.Error()
							resp.Status = "E"
						} else {
							resp.Manager_respArr.TodaySalePerfArr, err = TodaySalePerfs(db)
							if err != nil {
								log.Println(err)
								resp.ErrMsg = err.Error()
								resp.Status = "E"
							} else {
								resp.Manager_respArr.CurrentMnthPerfArr, err = CurrentMnthPerfs(db)
								if err != nil {
									log.Println(err)
									resp.ErrMsg = err.Error()
									resp.Status = "E"
								}
							}
						}
					}

				}
			}

		}

		data, err := json.Marshal(resp)
		if err != nil {
			fmt.Fprintf(w, err.Error())
		} else {
			fmt.Fprintf(w, string(data))
		}
		log.Println("Manager Dash (-)")

	}
}
