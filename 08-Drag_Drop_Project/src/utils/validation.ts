export interface Validatable {
    value : string | number ;
    required? : boolean;
    minLength?:number;
    maxLength?:number;
    min?:number;
    max?:number;
}

export function validate(validatableInput: Validatable){
    let isValid = true;
    if (validatableInput.required){
        if(typeof validatableInput.value === 'string'){
            isValid = isValid && validatableInput.value.trim().length !== 0
        }
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
     if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
     if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    // Check max for numbers
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid
}
