.PHONY: run build clean tidy

# Go 1.22 on macOS Sequoia+ produces binaries without LC_UUID when cgo uses the
# system linker, causing "dyld: missing LC_UUID load command" at runtime.
# github.com/go-sql-driver/mysql is pure Go, so disabling cgo uses the internal
# Go linker (which emits LC_UUID) and sidesteps the bug entirely.
# Upgrade to Go 1.23+ to drop this workaround.
export CGO_ENABLED = 0

run:
	go run .

build:
	go build -o bin/medic .

tidy:
	go mod tidy

clean:
	rm -rf bin
