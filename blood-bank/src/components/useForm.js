import React, {useState} from 'react';

const useForm = (initialFieldValues, validate, setCurrentId) => {
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        const fieldVal = {[name]: value};

        setValues({
            ...values,
            ...fieldVal
        });
        validate(fieldVal);
    }

    const resetForm = () => {
        setValues(initialFieldValues);
        setErrors({});
        setCurrentId(0);
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    };
}

export default useForm;