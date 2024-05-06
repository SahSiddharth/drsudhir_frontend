export const validateUserRegistrationInputs = user => {
    const {fullname,email,contact,password,confirmPassword} = user

    const emailRegEx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)

    if(fullname.length < 3){
        return 'Fullname must be at least 3 characters'
    }

    if(email.length < 3){
        return 'Email must be at least 3 characters'
    }
    if(!email.includes('@')){
        return 'Email must include @'
    }
    if(!emailRegEx.test(email)){
        return 'Email is not valid'
    }

    if(contact.length < 10){
        return 'Contact must be at least 10 characters'
    }

    if(password.length < 6){
        return 'Password must be at least 6 characters'
    }

    if(password !== confirmPassword){
        return 'Passwords do not match'
    }
    return false
}