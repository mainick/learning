import axios from 'axios'

const axiosClient = axios.create()
axiosClient.defaults.baseURL = 'http://localhost:3111'
axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}
axiosClient.defaults.timeout = 60000

const abortController = new AbortController()
axiosClient.defaults.signal = abortController.signal

export default axiosClient
