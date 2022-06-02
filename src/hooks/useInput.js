import { useState } from 'react'

const useInput = (validateValue) => {
    const [value, setValue] = useState("")
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(value);
    
    const hasErrorTouched = !valueIsValid && isTouched;
    const hasErrorNoTouched = !valueIsValid && !isTouched;

    const inputBlurHandler = () => {
        setIsTouched(true);
    };

    const reset = () => {
        setValue('');
        setIsTouched(false);
    };

    const valueChangeHandler = (event) => {
        setValue(event.target.value);
    };

    return {
        value,
        isValid: valueIsValid,
        hasErrorTouched,
        hasErrorNoTouched,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput