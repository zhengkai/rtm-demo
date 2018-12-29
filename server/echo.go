package main

import (
	"fmt"
	"log"

	"github.com/zhengkai/rtm"
)

// 回音，原样复读所有来的消息发回去
func echo(id int64) {

	c := rtm.NewClient(id)
	err := c.Connect()
	if err != nil {
		fmt.Println(`echo connect err:`, err)
		return
	}

	log.Println(`echo start read`, id)
	for {
		ra, err := c.Read()
		if err != nil {
			fmt.Println(`echo read error:`, err)
			break
		}

		for _, r := range ra {

			if r.Method == `ping` || r.Method == `` {
				continue
			}
			// log.Println(`#`, x)

			if r.Method == `pushmsg` {
				s, _ := rtm.GetPushmsg(r.Content)

				err := c.Sendmsg(s.From, s.Msg)
				if err != nil {
					log.Println(`echo send msg error`, err)
					break
				}

				/*
					go func() {
						for i := 0; i < 50; i++ {
							err := c.Sendmsg(s.From, `r`+strconv.Itoa(i)+` `+s.Msg)
							if err != nil {
								log.Println(`echo send msg error`, err)
								break
							}

							err = c.Sendmsg(clientBotID, `r`+strconv.Itoa(i)+` `+s.Msg)
							if err != nil {
								log.Println(`echo send msg error`, err)
								break
							}
						}
					}()
				*/

			} else {
				log.Println(string(r.Content))
			}

			if err != nil {

				fmt.Println(`echo client err`, err)
				return
			}
		}
		// fmt.Println(`loop`)
	}
}
