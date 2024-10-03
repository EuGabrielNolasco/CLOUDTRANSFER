package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/storage"
	"google.golang.org/api/option"
)

type EmailData struct {
	To    string   `json:"to"`
	Files []string `json:"files"`
}

func initializeApp() *firebase.App {
	conf := &firebase.Config{
		ProjectID: "your-project-id", // Replace with your project ID
	}
	opt := option.WithCredentialsFile("path/to/your/serviceAccountKey.json") // Replace with your key file path

	app, err := firebase.NewApp(context.Background(), conf, opt)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}
	return app
}

func shareHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método não permitido", http.StatusMethodNotAllowed)
		return
	}

	var emailData EmailData
	err := json.NewDecoder(r.Body).Decode(&emailData)
	if err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	app := initializeApp()
	client, err := app.Storage(context.Background())
	if err != nil {
		http.Error(w, "Erro ao obter cliente de storage", http.StatusInternalServerError)
		return
	}

	bucketName := "your-bucket-name.appspot.com" // Replace with your bucket name
	bucket, err := client.Bucket(bucketName)
	if err != nil {
		http.Error(w, "Erro ao obter bucket", http.StatusInternalServerError)
		return
	}

	for _, fileName := range emailData.Files {
		err = uploadFile(bucket, fileName, emailData.To)
		if err != nil {
			http.Error(w, "Erro ao armazenar arquivos", http.StatusInternalServerError)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Arquivos enviados com sucesso!"})
}

func uploadFile(bucket *storage.BucketHandle, fileName, userEmail string) error {
	// Create a reference to the file in the user's folder
	obj := bucket.Object(userEmail + "/" + fileName)

	// Create a new writer for the object
	writer := obj.NewWriter(context.Background())
	defer writer.Close()

	// Writing dummy data for the example (replace this with actual file content)
	_, err := writer.Write([]byte("Dummy file content for " + fileName))
	if err != nil {
		return err
	}

	return nil
}

func main() {
	http.HandleFunc("/share", shareHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
