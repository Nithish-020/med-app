package Db

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strconv"
	"time"

	_ "github.com/jackc/pgx/v5/stdlib"
)

// pgEnv reads an environment variable, returning fallback if it's empty.
func pgEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

// LocalPgConnect opens a connection to the local PostgreSQL server.
//
// Configuration is read from environment variables with safe defaults so the
// same binary works both in development (defaults) and deployed environments.
//
//	PG_HOST      default "localhost"
//	PG_PORT      default 5432
//	PG_USER      default "postgres"
//	PG_PASSWORD  default "postgres"
//	PG_DB        default "nithish"
//	PG_SSLMODE   default "disable"  (use "require" or "verify-full" in prod)
//
// The returned *sql.DB is a pool; callers should Close() it when done
// (matching the existing LocalDBConnect convention).
func LocalPgConnect() (*sql.DB, error) {
	log.Println("LocalPgConnect +")

	host := pgEnv("PG_HOST", "localhost")
	port := pgEnv("PG_PORT", "5433")
	user := pgEnv("PG_USER", "postgres")
	pass := pgEnv("PG_PASSWORD", "postgres")
	dbname := pgEnv("PG_DB", "nithish_20589")
	sslmode := pgEnv("PG_SSLMODE", "disable")

	if _, err := strconv.Atoi(port); err != nil {
		return nil, fmt.Errorf("invalid PG_PORT %q: %w", port, err)
	}

	// key=value DSN form — safer than URL form because passwords don't need
	// percent-encoding.
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		host, port, user, pass, dbname, sslmode,
	)

	db, err := sql.Open("pgx", dsn)
	if err != nil {
		log.Println("Postgres open failed:", err.Error())
		return nil, err
	}

	// sql.Open is lazy. Ping once so we surface bad config / unreachable
	// server immediately instead of on the first query.
	db.SetConnMaxLifetime(30 * time.Minute)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(5)

	if err := db.Ping(); err != nil {
		log.Printf("Postgres ping failed (host=%s port=%s db=%s): %v", host, port, dbname, err)
		_ = db.Close()
		return nil, err
	}

	log.Println("LocalPgConnect -")
	return db, nil
}
