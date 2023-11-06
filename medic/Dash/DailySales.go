package dash

import (
	"database/sql"
	"log"
)

func DailySales(db *sql.DB) ([]DailySale, error) {
	log.Println("Daily Sales Trend +")
	var DS DailySale
	//var DailySaleArr []DailySale

	var arr []DailySale

	// ! Daily Sales Trend

	DSval := `select dayname(date_wise), nvl(sum(b.BillAmt), '0')  bill_amount
	from weekwise w
	left join billmaster  b 
	 on w.date_wise = b.BillDate
	 group by date_wise`

	rows, err := db.Query(DSval)
	if err != nil {
		log.Println(err)
		return arr, err
	} else {
		for rows.Next() {
			err := rows.Scan(&DS.WeekDay, &DS.Values)
			log.Println()
			if err != nil {
				log.Println(err)
				return arr, err
			} else {
				arr = append(arr, DS)
			}
		}
	}
	log.Println("Daily Sales Trend -")
	// log.Println(arr)
	return arr, nil
	
}
