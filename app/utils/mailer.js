/* global printgic */

'use strict';

/**
 * npm dependencies
 */
const debug = require('debug');
const nodemailer = require('nodemailer');
/**
 * local dependencies
 */
const from = 'printgic@noreply.com';
const smtpConfig = printgic.app.config.smtpConfig;
const transporter = nodemailer.createTransport(smtpConfig);
const verifyLink = 'http://192.168.17.89:4000/v1/oauth/verify-email';

module.exports = {
    * sendVerifyEmail(data) {
        const log = debug('printgic:utils:mailer:sendVerifyEmail');
        const mailOptions = {
            from: `printgic <${from}>`, // sender address
            to: data.email, // list of receivers
            subject: 'Action Required - Please Verify Your Email Address',
            text: `
                Greetings ${data.username || data.email}, You recently registered for printgic.
                To complete your printgic registration, please verify your email address using the following verification code: ${data.verification_code}
            `,
            html: `
                <p>Greetings ${data.username || data.email},</p>
                <p>You recently registered for printgic. To complete your printgic registration, please verify your email address using the following verification code:</p>
                <p><b>${data.verification_code}</b></p><br><br>
                <button><a href="${verifyLink}?verification_code=${data.verification_code}">Activate</a></button> <br><br>
                <p><small>If you didn't create a printgic account using this email address, <a href="mailto:${from}">please let us know.</a></small></p><br><br>
            `
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return log(error);
            }
            log('Message sent: ' + JSON.stringify(info));
        });
    },
    * resetPassword(data){
        const log = debug('printgic:utils:mailer:resetPassword');
        const mailOptions = {
            from: `printgic <${from}>`, // sender address
            to: data.email, // list of receivers
            subject: 'Printgic Password Reset Request',
            text: `
                You're receiving this email because a password reset has been requested for this account.
                To reset your password, please use the recovery code: ${data.recovery_code}.
            `,
            html: `
                <p>You're receiving this email because a password reset has been requested for this account.</p>
                <p></p>To reset your password, please use the recovery code: <strong>${data.recovery_code}</strong> .</p>
            `
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return log(error);
            }
            log('Message sent: ' + JSON.stringify(info));
        });
    }
};
