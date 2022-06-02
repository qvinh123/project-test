export const emailValidation = (value) => {
    const regex = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/)
    if (value.trim() === '' || regex.test(value) === false) {
        return {
            isValid: false,
            message: "Please enter email is valid"
        };
    }
    return {
        isValid: true,
        message: ""
    };
}

export const emptyValidation = (value) => {
    if (value.trim() === '' || value.length < 3) {
        return {
            isValid: false,
            message: "Please enter name minimum 3 character"
        }
    }
    return {
        isValid: true,
        message: ""
    }
}

export const phoneValidation = (value) => {
    const regex = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
    if (value.trim() === '' || regex.test(value) === false) {
        return {
            isValid: false,
            message: "Please enter phone is valid"
        }
    }
    return {
        isValid: true,
        message: ""
    }
}

export const passwordValidation = (value) => {
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')
    if (value.trim() === '' || regex.test(value) === false) {
        return {
            isValid: false,
            message: "Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number"
        }
    }
    return {
        isValid: true,
        message: ""
    }
}