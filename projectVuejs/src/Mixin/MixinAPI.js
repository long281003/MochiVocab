import axios from "axios";

export const apiMixin = {
    getToken() {
        return sessionStorage.getItem('authtoken')
    },
    getHeader() {
        const token = this.getToken()
        if (token) {
            return {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
    },
    async getWithAuth(url) {
            try {
                const headers = this.getHeader()
                if (headers) {
                    const res = await axios.get(url, {headers})
                    return res.data
                }
            } catch (error) {
                console.log(error)
                return error.response
            }
    },
    async postWithAuth(url, data) {
            try {
                const headers = this.getHeader()
                if (headers) {
                    const res = await axios.post(url, data, { headers })
                    return res.data
                }
            } catch (error) {
                console.log(error)
                return error.response
            }
    },
    async putWithAuth(url, data) {
        const headers = this.getHeader()
        if (headers) {
            try {
                const res = await axios.put(url, data, { headers })
                return res.data
            } catch (error) {
                console.log(error)
                return error.response
            }
        }
    },
    async deleWithAuth(url) {
        try {
            const headers = this.getHeader()
             if (headers) {
                const res = await axios.delete(url, {headers})
                return res.data
            }
            } catch (error) {
                console.log(error)
                return error.response
            }
    },
        async getWithoutAuth(url) {
            try {
                const res = await axios.get(url)
                return res.data
            } catch (error) {
                console.log(error)
                return error.response
            }
        },
        async postWithoutAuth(url, data){
            try {
                const res = await axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                return res.data
            } catch (error) {
                console.log(error)
                return error.response
            }
    }
}