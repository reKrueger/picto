
const local = false

let num = null
if(!local){
    num = 0
}else{
    num = 1
}



const API_PATH = ['none','ws://localhost:3000/ws/telegraph/']



const API_URL = ['https://createpicto.herokuapp.com','http://127.0.0.1:3000']







const setUrl = API_URL[num]
const setPATH = API_PATH[num]

const api ={
    setUrl,
    setPATH
}

export default api