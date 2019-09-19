package httptest_test

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Sigilita/GoTest/routes"
)

func TestGetAllPeople(t *testing.T) {
	req, err := http.NewRequest("GET", "/app/people/all", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(routes.ReturnAllpeople)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.

	// The body is exactly as expected but still the equality fails.
	expected := `[{"id":"2","name":"Jane","age":"30","balance":"10.2","email":"second@doe.com","address":"JaneLand"},{"id":"1","name":"John","age":"35","balance":"10.1","email":"first.doe@gmail.com","address":"JonhLand"},{"id":"3","name":"Jule","age":"34","balance":"10.3","email":"third.doe@gmail.com","address":"JuleLand"}]`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestCreatePerson(t *testing.T) {
	var json_data = []byte(`{"name":"Mary","age":"30","balance":"10.12","email":"mjane@doe.com","address":"JaneLand"}`)
	req, err := http.NewRequest("POST", "/app/people", bytes.NewBuffer(json_data))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(routes.CreateNewPerson)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.

	// The body is exactly as expected but still the equality fails.
	expected := `{"id":"4","name":"Mary","age":"30","balance":"10.12","email":"mjane@doe.com","address":"JaneLand"}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestUpdatePeople(t *testing.T) {
	var json_data = []byte(`{"id":"2","name":"Mary","age":"30","balance":"10.2","email":"jane@doe.com","address":"JaneLand"}`)
	req, err := http.NewRequest("PUT", "/app/people/2", bytes.NewBuffer(json_data))
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(routes.UpdatePerson)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.

	// The body is exactly as expected but still the equality fails.
	expected := `{"id":"2","name":"Mary","age":"30","balance":"10.2","email":"jane@doe.com","address":"JaneLand"}`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func TestDeletePerson(t *testing.T) {
	req, err := http.NewRequest("DELETE", "/app/people/1", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(routes.DeletePerson)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.

	// The body is exactly as expected but still the equality fails.
	if rr.Body.String() != "" {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), "")
	}
}

func TestGetSortPeople(t *testing.T) {
	req, err := http.NewRequest("GET", "/app/people/sort", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(routes.ReturnSortByEmail)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	// Check the response body is what we expect.

	// The body is exactly as expected but still the equality fails.
	expected := `[{"id":"1","name":"John","age":"35","balance":"10.1","email":"first.doe@gmail.com","address":"JonhLand"},{"id":"2","name":"Mary","age":"30","balance":"10.2","email":"jane@doe.com","address":"JaneLand"},{"id":"4","name":"Mary","age":"30","balance":"10.12","email":"mjane@doe.com","address":"JaneLand"},{"id":"3","name":"Jule","age":"34","balance":"10.3","email":"third.doe@gmail.com","address":"JuleLand"}]`
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}
