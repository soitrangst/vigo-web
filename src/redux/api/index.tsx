import apiURL from "./api"


const Signin = async (resquest:any) => {
    const { user } = resquest
    const requestOption = {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user)
    }
    try {
        const response = await fetch(apiURL.signin, requestOption)
        const data = await response.json()

        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            localStorage.setItem('auth', 'true')
            localStorage.setItem('accessToken', data.token)
            localStorage.setItem("user", JSON.stringify(data.user))
            return data.message
        }
    } catch (error) {
        throw error
    }

}

const Signup = async (resquest:any) => {
    const { user } = resquest
    const requestOption = {
        method: 'POST',
        body: user
    }

    try {
        const response = await fetch(apiURL.signup, requestOption)
        const data = await response.json()
        if (response.status >= 400) {
            let response = data.error
            throw response
        } else {
            let response = data.message
            return response
        }
    } catch (error) {
        throw error
    }
}


export {
    Signin,
    Signup
}