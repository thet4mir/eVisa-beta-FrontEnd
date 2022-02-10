import axios from 'axios'


const URL_CSRF_REFRESH = '/api/auth/csrf-refresh/'

const axiosInstance = axios.create({
    baseURL: '/',
    timeout: 10000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})


axiosInstance.interceptors.request.use((config) => {
    if (config.method == 'post') {
        config.xsrfCookieName = 'csrftoken'
        config.xsrfHeaderName = 'X-CSRFToken'
    }

    const event = new CustomEvent('api_error', { detail: null })
    window.dispatchEvent(event)

    return config
})


axiosInstance.interceptors.response.use(

    (response) => response.data || response,

    (error) => {

        if (error.response) {
            const originalRequest = error.config
            const do_refresh_token = (
                    originalRequest.url != URL_CSRF_REFRESH
                    && error.response.status === 403
                    && error.response.statusText === "Forbidden"
                    && error.response.data && error.response.data.error == 'csrf-error'
                )

            if (do_refresh_token) {
                return axiosInstance
                    .get(URL_CSRF_REFRESH)
                    .then((rsp) => {
                        return axiosInstance(originalRequest)
                    })
            }
        }
        return Promise.reject(error)
    }
)

export { axiosInstance }
