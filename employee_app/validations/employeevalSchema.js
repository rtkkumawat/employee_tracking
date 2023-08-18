const joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

 const empValSchema = {
    registerEmployee: joi.object({
        empName: joi
            .string()  
            .min(3)
            .max(20)
            .message({
                "string.max": "{#label} should contain at least{#limit} characters",
                "string.min": "{#label} should contain at least{#limit} characters",
            })
            .required(),
        empEmail: joi
            .string()
            .email()
            .message("invalid email address")
            .required(),
        empPassword: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .onlyLatinCharacters()
            .messages({
                'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                'password.minOfSpecialCharacters':
                    '{#label} should contain at least {#min} special character',
                'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                'password.noWhiteSpaces': '{#label} should not contain white spaces',
                'password.onlyLatinCharacters': '{#label} should contain only latin characters',
            }),
            empCity : joi 
            .string()
            .required(),
            empPhone : joi 
            .number()
            .integer()
            .min(1000000000)
            .max(9999999999)
            .message("invalid phone number")
            .required(),
            empTechnologies : joi 
            .string()
            .required(),
            empGender : joi
            .string()
            .required(),
            userRole : joi 
            .string()
            .required(),
            empWorkingstatus : joi
            .string()
            .required()
    }).unknown(true),

loginEmp: joi.object({
    empEmail: joi
        .string()
        .email()
        .message("invalid email or password")
        .required(),
    empPassword: joi
        .string()
        .required(),
}),

empResetPassword: joi.object({
    newPassword: joiPassword
        .string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .messages({
            'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
            'password.minOfSpecialCharacters':
                '{#label} should contain at least {#min} special character',
            'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
            'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
            'password.noWhiteSpaces': '{#label} should not contain white spaces',
            'password.onlyLatinCharacters': '{#label} should contain only latin characters',
        })
        .required(),
    confirmPassword: joiPassword
        .any()
        .equal(joi.ref('newPassword'))
        .required()
    .label('confirmPassword')
    .options({messages :{'any.only':'{{#label}}'} }),
})
};


module.exports = 
    empValSchema 