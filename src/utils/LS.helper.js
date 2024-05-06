export const authenticate = data => {
    if(!window.navigator){
        return false
    }

    if(window.localStorage) {
        window.localStorage.setItem('authentication', JSON.stringify(data))
        return true
    }else{
        return false
    }
        
}

export const isAuthenticated = () => {
    if(window.localStorage.getItem('authentication')) {
        return JSON.parse(window.localStorage.getItem('authentication'))
    }else{
        return {undefined,undefined}
    }
}

export const deauthenticate = () => {
    if(window.localStorage.getItem('authentication')) {
        localStorage.removeItem("authentication")
        return true
    }else{
        return false
    }
}