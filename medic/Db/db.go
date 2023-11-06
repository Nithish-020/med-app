package Db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func LocalDBConnect() (*sql.DB, error) {
	log.Println("LocalDBConnect +")
	connString := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", "root", "root", "192.168.2.5", 3306, "nithish")
	db, err := sql.Open("mysql", connString)
	if err != nil {
		log.Println("Open connection failed:", err.Error())
		return db, err
	}
	log.Println("LocalDBConnect -")
	return db, nil
}
