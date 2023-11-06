package dash

import (
	"database/sql"
	"log"
)

func TodaySales(db *sql.DB) (float32, error) {
	log.Println("TodaySales+")
	var todaySale float32

	// ! Today Sales

	CoreString := `Select nvl(SUM(b.BillAmt),0) From billmaster b,userdata u Where u.User_Id  = b.User_Id  and b.BillDate = curdate()`

	rows, err := db.Query(CoreString)
	if err != nil {
		log.Println(err)
		return todaySale, err
	} else {
		for rows.Next() {
			err := rows.Scan(&todaySale)
			log.Println(todaySale)
			if err != nil {
				log.Println(err)
				return todaySale, err
			}
		}
	}
	log.Println("TodaySales-")
	return todaySale, nil
}
