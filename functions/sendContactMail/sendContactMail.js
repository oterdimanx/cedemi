// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const handler = async (event) => {
    try {
        if (event.body === null) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST'
                },
                body: JSON.stringify("Payload required"),
            };
        }

        const params    = JSON.parse(event.body)
        const name      = params.name || 'badNameFormat'
        const reason    = params.reason || 'badReasonFormat'
        const email     = params.email || 'badEmailFormat'
        const phone     = params.phone || 'badPhoneFormat'
        const message   = params.message || 'badMessageFormat'
        const Mailgun   = require('mailgun.js')
        const formData  = require('form-data')
        const domain    = 'sandbox36ca7adf1ccb45f887ccd7b9a501e89c.mailgun.org'
        const fromEmail = 'Cedemi Contact <inquiry@cedemi.fr>'
        const toEmails  = ['inquiry@cedemi.fr']
        const mailgun   = new Mailgun(formData)

        const mg = mailgun.client({
            username: 'api',
            key: process.env.EMAILS_PROVIDER_API_KEY || '',
            public_key: process.env.EMAILS_PROVIDER_PUB_KEY,
            timeout: 60000
        });

        const sendResult = await mg.messages.create(domain, {
            from: fromEmail,
            to: toEmails,
            subject: 'Formulaire de Contact',
            text: 'cedemi.fr :' +
                  'Nom : ' + name + ' | ' +
                  'Raison Sociale : ' + reason + ' | ' +
                  'Tel : ' + phone + ' | ' +
                  'Email : ' + email + ' | ' +
                  'Message : ' + message + ' | ' +
                  'Message en provenance du formulaire de contact cedemi.fr',
            html: '<html>' +
                '<head>' +
                '</head>' +
                '<body>' +
                '<strong>Nom : ' + name + '</strong><br><br>' +
                '<strong>Raison Sociale : ' + reason + '</strong><br><br>' +
                '<strong>Tel : ' + phone + '</strong><br><br>' +
                '<strong>Email : ' + email + '</strong><br><br>' +
                '<strong>Message : ' + message + '</strong><br><br><br><br>' +
                '<strong><i>Message en provenance du formulaire de contact cedemi.fr</i></strong>' +
                '</body>' +
                '</html>',
        });

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            body: JSON.stringify({message: sendResult.message}),
            // // more keys you can return:
            // headers: { "headerName": "headerValue", ... },
            // isBase64Encoded: true,
        }
    } catch (error) {
        return {
        statusCode: 500,
        headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
        },
        body: error
        }
    }
};

module.exports = { handler }
