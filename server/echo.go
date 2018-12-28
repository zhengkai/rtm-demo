package main

import (
	"fmt"
	"log"
	"strconv"

	"github.com/zhengkai/rtm"
)

// 接收遍历显示所有消息
func echo(id int64) {

	c := rtm.NewClient(id)
	err := c.Connect()
	if err != nil {
		fmt.Println(`client connect err`, err)
		return
	}

	fmt.Println(`start read`)
	for {
		ra, err := c.Read()
		if err != nil {
			fmt.Println(`read error:`, err)
			break
		}

		for x, r := range ra {

			if r.Method == `ping` || r.Method == `` {
				continue
			}
			fmt.Println(`#`, x)

			if r.Method == `pushmsg` {
				s, _ := rtm.GetPushmsg(r.Content)

				go func() {
					for i := 0; i < 200; i++ {
						// time.Sleep(80 * time.Millisecond)
						err := c.Sendmsg(s.From, `r`+strconv.Itoa(i)+` `+s.Msg)
						if err != nil {
							log.Println(`echo send msg error`, err)
							break
						}
					}
				}()

			} else {
				log.Println(string(r.Content))
			}

			if err != nil {

				fmt.Println(`client err`, err)
				return
			}
		}
		// fmt.Println(`loop`)
	}
}
