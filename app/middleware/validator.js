const assert = require('chai').assert;
const indicative = require('indicative');

const customRules = require('../utils/custom_rules');

module.exports = (req, res, next) => {
    /**
     * Validate incoming request.
     * @param {Object} data The request payload or data.
     * @param {Object} rules The rules definition to apply on the data.
     * @param {Object} messages The custom error messages to display.
     * @returns errors or undefined
     */
    req.validate = function*(data, rules, messages = {}) {
        assert.isObject(data, 'validate first param must be an object');
        assert.isObject(rules, 'validate second param must be an object');

        // Extends custom rules
        indicative.extend('uniqueEmail', customRules.uniqueEmail);

        messages = Object.assign(messages, {
            'alpha_numeric': messages.alpha_numeric || 'The {{field}} field can only contain letters and numbers',
            'above': messages.above || 'The {{field}} field must be bigger than {{argument.0}}',
            'boolean': messages.boolean || 'The field must be true or false',
            'date_format': messages.date_format || 'The {{field}} field has an invalid date format',
            'email': messages.email || 'The {{field}} provided is not a valid email address',
            'integer': messages.integer || 'The {{field}} field must be an integer',
            'string': messages.string || 'The {{field}} field must be an string',
            'min': messages.min || 'The {{field}} field is too short',
            'max': messages.max || 'The {{field}} field is too long',
            'required': messages.required || 'The {{field}} field is missing'
        });
        try {
            yield indicative.validateAll(data, rules, messages);
        } catch (errors) {
            throw res.fail({ messages: 'Validation failed', errors });
        }
    };
    next();
};