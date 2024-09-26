// 导入ws库
const WebSocket = require("ws")
// 新建服务器WebSocket对象wss
const wss = new WebSocket.Server({port:3333})

// 关闭所有的端口监听器
wss.removeAllListeners()

// const devTypeList = {
//     fs:["fs_status","10.8.187.21"],
//     led:["led_status","10.8.180.78"],
//     dj:["dj_status","10.8.180.74"]
// }
const devTypeList = {
    fs:["fs_status","192.168.137.5"],    // 风扇
    led:["led_status","192.168.137.250"],  // 光照的led灯
    gz:["gz_status","192.168.137.250"],    // 光照感应器
    dj:["dj_status","192.168.137.241"],    // 舵机
    temp:["temp_status","192.168.137.131"] // 温度感应器
}

// 192.168.137.183
// 192.168.137.240
// 192.168.137.2

let timer = null

let udpstate = null

// 导入udp端口库
const dgram = require("dgram")
// 创建udp端口
const udpSocket = dgram.createSocket("udp4")


wss.on("connection",(ws)=>{
    console.log("有人来了");
    // 关闭所有的udp端口监听器
    udpSocket.removeAllListeners()
    

    
    // 判断是否已经绑定5555端口，防止重复绑定
    if (udpstate == null) {
        /* 监听指定地址以及端口 */
        udpSocket.bind(5555)
        udpstate = 1
    }
    
    // 用于查看是否绑定成功
    udpSocket.on("listening",()=>{
        console.log("udp开始监听")
        let address = udpSocket.address()
        console.log(`当前地址:${address.address}:${address.port}`)
    })
    // 接收设备消息
    udpSocket.on("message",(msg,rinfo)=>{
        msg = ""+msg
        console.log(msg)
        ws.send(msg)
        
    })

    // 简单的向客户端定时发送模拟的数据(已舍弃)
    
      if (!timer){
        timer = setInterval(()=>{
            ws.send("temp:"+(Math.random()*5+30).toFixed(0))
            ws.send("hum:"+(Math.random()*5+30).toFixed(0))
            ws.send("gz:"+(Math.random()*0.25+1.4).toFixed(2))
        },1500)
    } else {
        clearInterval(timer)
        timer = setInterval(()=>{
            ws.send("temp:"+(Math.random()*5+30).toFixed(0))
            ws.send("hum:"+(Math.random()*5+30).toFixed(0))
            ws.send("gz:"+(Math.random()*0.25+1.4).toFixed(2))
        },1500)
    }
     

    // 接收客户端发送的消息，并将客户端发送的消息交给回调函数
    ws.on("message",function(msg){
        // 处理客户端的数据，这里注意服务端接收到的数据是Buffer Array
        // 所有这里才有的处理方式是
        // 1、客户端发送的数据转义为JSON格式
        // 2、服务端接收后直接将接收的数据用JSON.parse()方法转义回原本的数据
        let message = JSON.parse(msg).toString()
        // 向客户端发送接收到数据（可以省略）
        // ws.send(message)
        console.log(message);
        // 检测接收到的信息是否有“:”。例:"fs:on"
        if (message.includes(":")){
            // 将接收到的信息以“:”分割为数组。例：["fs","on"]
            message = message.split(":")
            // 下面这一点就是把数据处理成"fs_status:on"样式
            if (Object.keys(devTypeList).some(e=>e === message[0])){
                // console.log("我被传到5555了");
                const sendDevMSG = devTypeList[message[0]][0] + ":" + message[1]
                // 向指定地址的5555端口发送数据
                // console.log(sendDevMSG)
                udpSocket.send(sendDevMSG, 5555, devTypeList[message[0]][1])
            }
        }
        

    })
})

wss.on("listening",()=>{
    console.log("开始监听");
})