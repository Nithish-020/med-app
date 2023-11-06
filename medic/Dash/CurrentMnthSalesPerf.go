package dash

import (
	"database/sql"
	"log"
)

func CurrentMnthPerfs(db *sql.DB) ([]CurrentMnthPerf, error) {
	log.Println("Current Month Sales Perf +")
	var CMP CurrentMnthPerf
	//var DailySaleArr []DailySale

	var CMPArr []CurrentMnthPerf

	// ! Current Month Sales Performance

	CMPval := ` select a.User,nvl(b.Amt,'0') amount
	from (
   select u.User_Id as id, u.User  
   from userdata u
   where u.Role = 'biller')a
   left join (
   select bm.User_id as UserId ,sum(bm.BillAmt) Amt
   from billmaster bm
   where bm.BillDate between DATE_FORMAT(NOW(), '%Y-%m-01') and date_add( DATE_FORMAT(NOW(), '%Y-%m-01'),interval 1 month)
   group by bm.User_id)b
   on a.id = b.UserId`

	rows, err := db.Query(CMPval)
	if err != nil {
		log.Println(err)
		return CMPArr, err
	} else {
		for rows.Next() {
			err := rows.Scan(&CMP.UserName, &CMP.Amount)
			if err != nil {
				log.Println(err)
				return CMPArr, err
			} else {
				CMPArr = append(CMPArr, CMP)
			}
		}
	}
	log.Println("Current Month Sales Perf -")
	// log.Println(CMPArr)
	return CMPArr, nil

}
