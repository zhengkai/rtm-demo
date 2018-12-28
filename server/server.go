package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/zhengkai/rtm"
)

func server() {

	port := flag.Int("port", 21003, "http port")
	flag.Parse()

	addr := `127.0.0.1:` + strconv.Itoa(*port)

	mux := http.NewServeMux()
	mux.HandleFunc(`/api/token`, getToken)
	mux.HandleFunc(`/api/pid`, getPID)
	fmt.Printf("port = %s\n", addr)
	err := http.ListenAndServe(addr, mux)
	if err != nil {
		fmt.Println(`http`, addr, `start fail:`)
		fmt.Println(err.Error())
	}
}

func getToken(w http.ResponseWriter, r *http.Request) {

	s, ok := r.URL.Query()[`uid`]
	if !ok {
		return
	}

	i, err := strconv.Atoi(s[0])
	if err != nil || i < 1 {
		return
	}

	log.Println(`get token`, i)

	token, _ := rtm.ServerGettoken(int64(i))

	b := []byte(token)

	w.Write(b)
}

func getPID(w http.ResponseWriter, r *http.Request) {

	w.Write([]byte(strconv.Itoa(configProjectID)))
}
