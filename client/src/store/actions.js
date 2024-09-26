export default {

    // 接收服务器数据，以及同步数据到state中
    postServerData() {
        const ws = new WebSocket("ws://127.0.0.1:3333")
        


        ws.onmessage = (e) => {
            if (this.dataLineList.time.length > 5) {
                this.dataLineList.time.splice(0, 1)
                this.dataLineList.gz.splice(0, 1)
                this.dataLineList.temp.splice(0, 1)
                this.dataLineList.hum.splice(0, 1)
            }
            // console.log(e.data);
            if (e.data.includes(":")) {


                // 设备状态返回值处理（设备控制页）
                // 设备控制的一般格式是"fs_status:0"
                // 所以使用"_"作为标记设备控制的入口标记
                if (e.data.includes("_")) {
                    let msgList = e.data.split(":")
                    // 判断数据的前缀是否在数据列表中
                    if (Object.keys(this.devStatusList).some(e => e === msgList[0])) {

                        switch (msgList[0]) {
                            case "fs_status":
                                this.devStatusList.fs_status = +msgList[1] ? true : false;
                                break;
                            case "led_status":
                                this.devStatusList.led_status = +msgList[1] ? true : false;
                                break;
                            case "dj_status":
                                this.devStatusList.dj_status = +msgList[1] ? true : false;
                                break;
                            case "gz_status":
                                this.devStatusList.gz_status = +msgList[1] ? true : false;
                                if (!+msgList[1]) {
                                    this.devResult.gz = 0
                                };
                                break;
                            case "temp_status":
                                this.devStatusList.temp_status = +msgList[1] ? true : false;
                                if (!+msgList[1]) {
                                    this.devResult.temp = 0
                                    this.devResult.hum = 0
                                };
                                break;
                        }
                    }


                } else { // 设备数值返回值处理（图表页）

                    let msgList = e.data.split(":")
                    // console.log(e.data)



                    if (Object.keys(this.devResult).some(e => e === msgList[0])) {
                        
                        const date = new Date()


                        if (this.dataLineList.time.some(e => e === date.toLocaleTimeString())) {

                        } else {
                            this.dataLineList.time.push(date.toLocaleTimeString())
                        }
                        switch (msgList[0]) {
                            case "gz":
                                this.devResult.gz = (+msgList[1]).toFixed(2)
                                this.dataLineList.gz.push((+msgList[1]).toFixed(2))
                                break;
                            case "temp":
                                this.devResult.temp = (+msgList[1]).toFixed(2)
                                this.dataLineList.temp.push((+msgList[1]).toFixed(2))
                                break;
                            case "hum":
                                this.devResult.hum = (+msgList[1]).toFixed(2)
                                this.dataLineList.hum.push((+msgList[1]).toFixed(2))
                                break;
                        }
                    }
                }



            }


        };
    },
    postServerData5() {
        const ws = new WebSocket("ws://127.0.0.1:3333")



        ws.onmessage = (e) => {
            // console.log(e.data);
            setTimeout(()=>{
                if (e.data.includes(":")) {


                    // 设备状态返回值处理（设备控制页）
                    // 设备控制的一般格式是"fs_status:0"
                    // 所以使用"_"作为标记设备控制的入口标记
                    if (e.data.includes("_")) {
                        
    
    
                    } else { // 设备数值返回值处理（图表页）
    
                        let msgList = e.data.split(":")
                        // console.log(e.data)
    
    
    
                        if (Object.keys(this.devResult).some(e => e === msgList[0])) {
                            if (this.dataLineList.time.length >= 6) {
                                this.dataLineList.time.splice(0, 1)
                                this.dataLineList.gz.splice(0, 1)
                                this.dataLineList.temp.splice(0, 1)
                                this.dataLineList.hum.splice(0, 1)
                            }
                            const date = new Date()
    
    
                            if (this.dataLineList.time.some(e => e === date.toLocaleTimeString())) {
    
                            } else {
                                this.dataLineList.time.push(date.toLocaleTimeString())
                            }
                            switch (msgList[0]) {
                                case "gz":
                                    // this.devResult.gz = (+msgList[1]).toFixed(2)
                                    this.dataLineList.gz.push((+msgList[1]).toFixed(2))
                                    break;
                                case "temp":
                                    // this.devResult.temp = (+msgList[1]).toFixed(2)
                                    this.dataLineList.temp.push((+msgList[1]).toFixed(2))
                                    break;
                                case "hum":
                                    // this.devResult.hum = (+msgList[1]).toFixed(2)
                                    this.dataLineList.hum.push((+msgList[1]).toFixed(2))
                                    break;
                            }
                        }
                    }
    
    
    
                }
            },5000)


        };
    }
}