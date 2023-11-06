package dash

import (
	"database/sql"
	"log"
)

func TodaySalePerfs(db *sql.DB) ([]TodaySalePerf, error) {
	log.Println("Daily Sales Trend +")
	var TSP TodaySalePerf
	//var DailySaleArr []DailySale

	var TSPArr []TodaySalePerf

	// ! Today Sales Performance

	TSPval := `select a.user,nvl(b.Amt,'0') amount
	from (
   select u.User_Id as id,u.User  
   from userdata u 
   where u.Role ='biller')a
   left join (
   select bm.User_Id as UserId ,sum(bm.BillAmt) Amt
   from billmaster bm
   where bm.BillDate = curdate()
   group by bm.user_id)b
   on a.id=b.UserId`

	rows, err := db.Query(TSPval)
	if err != nil {
		log.Println(err)
		return TSPArr, err
	} else {
		for rows.Next() {
			err := rows.Scan(&TSP.UserName, &TSP.Amount)
			
			if err != nil {
				log.Println(err)
				return TSPArr, err
			} else {
				TSPArr = append(TSPArr, TSP)
			}
		}
	}
	log.Println("Daily Sales Trend -")
	// log.Println(TSPArr)
	return TSPArr, nil

}
