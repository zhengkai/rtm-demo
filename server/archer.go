package main

import (
	"fmt"
	"strconv"
	"time"

	"github.com/zhengkai/rtm"
)

// 负责发送消息
func archer(id int64) {

	target := clientBotID

	c := rtm.NewClient(id)
	err := c.Connect()
	if err != nil {
		fmt.Println(`client connect err`, err)
		return
	}

	i := 0

	for {

		i++

		time.Sleep(time.Second)

		c.Sendmsg(target, `test `+strconv.Itoa(i))
	}
}
