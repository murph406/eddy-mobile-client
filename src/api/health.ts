import axios from 'axios'

const BASE_URL = process.env.EXPO_PUBLIC_API_URL
if (!BASE_URL) throw new Error('Missing BASE_URL in .env')

export function getHealth() {
    return axios.get(`${BASE_URL}`)
}

