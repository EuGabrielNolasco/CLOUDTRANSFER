package main

import (
	"encoding/json"
	"net/http"
)

func messageHandler(w http.ResponseWriter, r *http.Request) {
	message := map[string]string{"message": "Hello World!"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(message)
}

func main() {
	http.HandleFunc("/api/message", messageHandler)
	http.ListenAndServe(":8080", nil)
}
