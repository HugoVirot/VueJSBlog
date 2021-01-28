import { reactive, toRefs, watch } from 'vue'
import { useApi } from "./api";

// state of the authenticated user

interface User {
    id: string;
    email: string;
    dateOfBirth: Date;
    firstName: string;
    lastName: string;
    access_token: string;
}

interface AuthState {
    authenticating: boolean;
    user?: User;
    error?: Error;
}

const state = reactive<AuthState>({
    authenticating: false,
    user: undefined,
    error: undefined,
})


// provide the current state and methods for setting the current user once successfully authenticated or unsetting the user on logout.

export const useAuth = () => {
    const setUser = (payload: User, remember: boolean) => {
        if (remember) {
            // Save
            window.localStorage.setItem(AUTH_KEY, payload[AUTH_TOKEN])
        }

        state.user = payload
        state.error = undefined
    }

    const logout = (): Promise<void> => {
        window.localStorage.removeItem(AUTH_KEY)
        return Promise.resolve(state.user = undefined)
    }

    return {
        setUser,
        logout,
        ...toRefs(state), // authenticating, user, error
    }
}


// définition auth key et token

const AUTH_KEY = 'neoflix_token'
const token = window.localStorage.getItem(AUTH_KEY)
export const AUTH_TOKEN = 'access_token'

// si token => début auth, vérif auth_key

if (token) {
    state.authenticating = true

    const { loading, error, data, get } = useApi('/auth/user')

    get({}, token)

    watch([loading], () => {
        if (error.value) {
            window.localStorage.removeItem(AUTH_KEY)
        }
        else if (data.value) {
            state.user = data.value
        }

        state.authenticating = false
    })
}