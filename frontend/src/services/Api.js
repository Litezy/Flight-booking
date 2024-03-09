import axios from 'axios'
export const URL = 'http://localhost:5000/api/user'

export const user_url = {
    create:'create',
    allusers:'all',
    updateuser:'update',
}

export const UserApis ={
    user: user_url
}
export const ClientGetApi =async(endpoint) =>{
    const response = await axios.get(`${URL}/${endpoint}`)
    return response.data
}
export const ClientPostApi =async(endpoint, data) =>{
    const response = await axios.post(`${URL}/${endpoint}`, data)
    return response.data
}