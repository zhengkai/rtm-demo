package main

import (
	"fmt"
	"log"

	"github.com/zhengkai/rtm"
)

// 接收遍历显示所有消息
func bot(id int64) {

	c := rtm.NewClient(id)
	err := c.Connect()
	if err != nil {
		fmt.Println(`bot connect err:`, err)
		return
	}

	total := 0

	log.Println(`bot start read`, id)
	for {
		ra, err := c.Read()
		if err != nil {
			log.Println(`bot read error:`, err)
			break
		}

		count := 0

		for _, r := range ra {

			if r.Method == `ping` || r.Method == `` {
				continue
			}
			// log.Println(`#`, x)

			if r.Method == `pushmsg` {

				count++
				s, _ := rtm.GetPushmsg(r.Content)
				log.Println(`pushmsg`, count, s.From, s.Msg)
			} else {
				log.Println(string(r.Content))
			}

			if err != nil {

				fmt.Println(`echo client err`, err)
				return
			}
		}

		if count > 0 {
			total += count
			fmt.Println(`recv msg:`, total, count)
		}

		// fmt.Println(`loop`)
	}
}
