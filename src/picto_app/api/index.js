
/*
.catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
  */


import axios from 'axios'
import url from './../switch'

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";


// django
/** 
const serverUrl =  url.setUrl
const api = axios.create({
    baseURL: serverUrl+'/api',

})
export const insertUser = payload => api.post(`/user`, payload)
export const updateUserById = (id, payload) => api.patch(`/user/${id}`, payload)
export const deleteUserById = id => api.delete(`/user/${id}`)
export const getUserById = id => api.get(`/user/${id}`)
export const getUserbyEmailAndPassw = payload => api.put(`/user`, payload)
export const getUserbySearch = payload => api.patch(`/user`, payload)










const config = {
  headers: {
    'Content-Type': 'multipart/form-data;boundary=boundary',
    'Content-Disposition': 'attachment;filename=file.jpg',
    
  },
}
*/

// Filedata Img Django Rest-framework
///
















const configForm = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  },
}

const apiPic = axios.create({
    baseURL: url.setUrl+'/mosaimg'
})
export const insertForm = form => apiPic
  .post(`/img`, form, configForm)
  .catch(function (error) {
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
export const deleteImgById = id => apiPic.delete(`/img/${id}`)






const apis = {
  insertForm,
  deleteImgById

    
}


export default apis