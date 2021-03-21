
const local = true

let num = null
if(!local){
    num = 0
}else{
    num = 1
}



const API_PATH = ['wss://archa-backend.herokuapp.com/ws/telegraph/','ws://localhost:3000/ws/telegraph/']



const API_URL = ['https://archa-backend.herokuapp.com','http://127.0.0.1:3000']







const setUrl = API_URL[num]
const setPATH = API_PATH[num]

const api ={
    setUrl,
    setPATH
}

export default api