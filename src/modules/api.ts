import axios from "axios";

export const api = axios.create({
    baseURL: process.env.VUE_APP_API || 'http://localhost:3000/'
})

import { ref, computed } from 'vue'

export const useApi = (endpoint: string) => {
    const data = ref()
    const loading = ref(false)
    const error = ref()

    const errorMessage = computed(() => { /* ... */ })

    const errorDetails = computed(() => { /* ... */ })

    const errorFields = computed(() => {
        if (error.value && Array.isArray(error.value.response.data.message)) {

            return (error.value.response.data.message as string[]).reduce((acc: Record<string, any>, msg: string) => {
                let [field] = msg.split(' ')

                if (!acc[field]) {
                    acc[field] = []
                }

                acc[field].push(msg)

                return acc
            }, {}) // eg. { email: [ 'email is required' ] }
        }
    })


    const get = (query?: Record<string, any>) => { /* ... */ }

    const post = (payload?: Record<string, any>) => {
        loading.value = true
        error.value = undefined

        return api.post(endpoint, payload)
            // Update data
            .then(res => data.value = res.data)
            .catch(e => {
                // If anything goes wrong, update the error variable
                error.value = e

                throw e
            })
            // Finally set loading to false
            .finally(() => loading.value = false)
    }


    return {
        data, loading, error,
        errorMessage, errorDetails, errorFields,
        get, post,
    }
}