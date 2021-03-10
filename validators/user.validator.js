const joi = require('joi')

// sub-schema
const name = joi.string().regex(/^[a-z A-Z]+$/)
const username = joi.string().regex(/^[0-9 @-Z a-z]+$/)
const password = joi.string().min(8).strict()
const strings = joi.string()

// Schema Validation for register
const registerSchema = joi.object().keys({
    nickname: name.required(),
    email: strings.required(),
    username: username.required(),
    region: strings.required(),
    password: password.required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().strict(),
    status: strings.required(),
})

// Schema Validation for login
const loginSchema = joi.object().keys({
    username: username.required(),
    password: password.required(),
})

// Schema Validation for update profile
const updateProfileSchema = joi.object().keys({
    username: username.empty(''),
    nickname: name.empty(''),
    email: strings.empty(''),
    region: strings.empty(''),
    password: password.required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().strict(),
    status: strings.empty(''),
})

module.exports = {
    'register': registerSchema,
    'login': loginSchema,
    'update': updateProfileSchema
}