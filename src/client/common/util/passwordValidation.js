const hasNumber = (str) => {
    return (/\d/g.test(str));
};

function hasLowerCase(str) {
    return (/[a-z]/.test(str));
};

function hasUpperCase(str) {
    return (/[A-Z]/.test(str));
};

function hasSpecial(str) {
    return (/[!@#$%^&*_+]/.test(str));
};

// Validate password (basic: min 10 chars, 1 digit, 1 uppercase, 1 lowercase, and 1 special character)
module.exports.isPassword = (str) => {
    return str.length >= 10 && hasNumber(str) && hasLowerCase(str) && hasUpperCase(str) && hasSpecial(str);
};