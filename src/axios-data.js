import axios from 'axios'

const instance= axios.create({
    baseURL: 'https://greenhouse-78b8e-default-rtdb.europe-west1.firebasedatabase.app/'
})

export default instance;