// By using the getErrorMessage function that's exported from this helper file, we can
// add meaningful error messages when handling errors that are thrown by Mongoose
// operations.

const getUniqueErrorMessage = (err) => {
    let output;
    try {
        let fieldName =
        err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'));
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
    } catch (ex) {
        output = 'Unique field already exists'
    }
    return output;
}

const getErrorMessage = (err) => {
    let message;
    if (err.code) {
        switch(err.code){
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break
            default:
                message = 'Something went wrong: code = ' + err.code;
        }
    } else {
        for (const errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }
    return message;
}

export default { getErrorMessage };