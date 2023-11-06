package dash

import (
	"database/sql"
	"log"
)

func MonthlySales(db *sql.DB) ([]Monthlysale, error) {
	log.Println("Monthly Sales Trend +")
	var MS Monthlysale
	//var DailySaleArr []DailySale

	var Mntharr []Monthlysale

	// ! Monthly Sales Trend

	MSval := `select mw.mnth finalMnth,nvl(b.totalSale, '0') FinalAmt
	from monthwise mw
	left join  (
	select a.months resmnth, sum(a.amount) totalSale
	from (select monthname(b.BillDate) months,b.BillAmt amount
	from billmaster b  
	where b.BillDate between date_sub(curdate(),interval 1 year) and curdate() ) a 
	group by a.months )b
	on mw.mnth = b.resmnth`

	rows, err := db.Query(MSval)
	if err != nil {
		log.Println(err)
		return Mntharr, err
	} else {
		for rows.Next() {
			err := rows.Scan(&MS.Month, &MS.MonthVal)

			if err != nil {
				log.Println(err)
				return Mntharr, err
			} else {
				Mntharr = append(Mntharr, MS)
			}
		}
	}
	log.Println("Monthly Sales Trend -")
	// log.Println(Mntharr)
	return Mntharr, nil

}
