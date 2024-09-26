




export default ()=>{

    return {
        
        devStatusList:{
            fs_status:false,
            dj_status:false,
            led_status:false,
            temp_status:false,
        },
        devResult:{
            hum:0,
            temp:0,
            gz:0
        },
        dataLineList:{
            time:[],
            temp:[],
            hum:[],
            gz:[]
        }
    }
}