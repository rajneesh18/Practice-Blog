/**
 * Function to validate form fields
 * @param {*} form 
 */
let ValidationEvent = (form) => {
    var formLength = form.elements.length;
    var elements = form.elements;
    var check = true, recheck = true;
    for(let i = 0; i < formLength; i++) {
        recheck = true;
        var validate = elements[i].getAttribute('data-bind');
        if(validate) {
            if (typeof validate !== "string") {
                return false; 
            }
            try {
                var obj = JSON.parse(validate);
                Object.keys(obj).forEach((key, index) => {
                    if(recheck) {
                        switch(key) {
                            case 'required' :
                                if(obj[key] === 'yes') {
                                    if(!isRequired(elements[i])) { check = false; recheck = false; }
                                }
                                break;
                            case 'min' :
                                if(!isMin(elements[i], obj[key])) { check = false; recheck = false; }
                                break;
                            case 'max' :
                                if(!isMax(elements[i], obj[key])) { check = false; recheck = false; }
                                break;
                            case 'type' :
                                if(!TypeValidation(elements[i], obj[key])) { check = false; recheck = false; }
                                break;
                        }
                    }
                });

            } catch (error) {
                return false;
            }
        }
    }
    return check;
}

/**
 * Function to check field is required or not
 * @param {*} element 
 */
var isRequired = (element) => {
    let value = element.value;
    let name = (element.validname) ? element.validname : element.name;
    let errorName = name+'_message';
    if(!value.trim()) {
        element.value = '';
        document.getElementById(errorName).innerHTML = `${name} is required.`;
        return false;
    } else {
        document.getElementById(errorName).innerHTML = '';
        return true;
    }
}

/**
 * Function to check the miminum characters
 * @param {*} element 
 * @param {*} min 
 */
var isMin = (element, min) => {
    let value = element.value.trim();
    let name = element.name;
    let errorName = name+'_message';
    if(value && value.length < min) {
        document.getElementById(errorName).innerHTML = `${name} must be of minimum ${min} characters.`;
        return false;
    } else {
        document.getElementById(errorName).innerHTML = '';
        return true;
    }
}

/**
 * Function to check the maximum characters
 * @param {*} element 
 * @param {*} max 
 */
var isMax = (element, max) => {
    let value = element.value.trim();
    let name = element.name;
    let errorName = name+'_message';
    if(value && value.length > max) {
        document.getElementById(errorName).innerHTML = `${name} must be of maximum ${max} characters.`;
        return false;    
    } else {
        document.getElementById(errorName).innerHTML = '';
        return true;
    }
}

/**
 * Function to check Type validation of input field
 * @param {*} element 
 * @param {*} type 
 */
var TypeValidation = (element, type) => {
    switch(type) {
        case 'phone':
            if(!isPhoneNumber(element)) { return false; }
            break;
    }
    return true;
}

/**
 * Function to check phone number is valid or not
 * @param {*} element 
 */
var isPhoneNumber = (element) => {
    let value = element.value.trim();
    let name = element.name;
    let errorName = name+'_message';
    var regex = /^\d{10}$/;
    if(value && !regex.test(value)) {
        document.getElementById(errorName).innerHTML = `Please enter valid phone number`;
        return false;
    } else {
        document.getElementById(errorName).innerHTML = '';
        return true; 
    }
}