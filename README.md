# FunPlus RTM 调试环境

前端基于 JS、后端基于 Go 的调试环境

## 安装

先修改 `nginx.conf` 并链接到对应的 vhost 目录。主要是域名和 SSL 证书

### 前端

    npm install
    
    ng serve --host 127.0.0.1 --port 22003

### 后端

需要先将 `config.go.sample` 复制为 `config.go`，并填写正确的配置

    go get -u github.com/zhengkai/rtm
    
	go run *.go -port 21003

## 使用

后端暴露接口 `/api/token` 供前端获得连接 websocket 所用的 token

并且后端会起两个 uid。`10001` 会将所有接收显示在标准输出，`10002` 会回复相同内容给发送者
