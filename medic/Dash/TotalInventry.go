package dash

import (
	"database/sql"
	"log"
)

func TotalInvEntry(db *sql.DB) (float32, error) {
	log.Println("Total Inventry +")
	var totalInventryVal float32

	// ! Total Inventory Value

	Inval := `Select SUM(s.Qty * s.Price) as Total From stock s;`

	rows, err := db.Query(Inval)
	if err != nil {
		log.Println(err)
		return totalInventryVal, err
	} else {
		for rows.Next() {
			err := rows.Scan(&totalInventryVal)
			// log.Println(totalInventryVal)
			if err != nil {
				log.Println(err)
				return totalInventryVal, err
			}
		}
	}
	log.Println("Total Inventry -")
	return totalInventryVal, nil
}
