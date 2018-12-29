package main

import (
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/zhengkai/rtm"
)

var (
	clientBotID  = int64(10001)
	clientEchoID = int64(10002)
)

func main() {

	rand.Seed(time.Now().UTC().UnixNano())

	rtm.SetConfig(&rtm.Config{
		ProjectID:          configProjectID,
		SignatureSecretKey: configSignatureSecretKey,
		ServerGate:         configServerGate,
		ClientGate:         configClientGate,
	})

	token, err := rtm.ServerGettoken(654321)
	fmt.Println(token, err)

	go func() {
		for {
			log.Println(`echo connect`)
			echo(clientEchoID)
			time.Sleep(time.Second)
		}
	}()

	go func() {
		for {
			log.Println(`bot connect`)
			bot(clientBotID)
			time.Sleep(time.Second)
		}
	}()

	for i := int64(0); i < 10; i++ {
		// go archer(20000 + i)
	}

	server()
}
