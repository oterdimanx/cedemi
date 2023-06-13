// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

const handler = async (event) => {
    try {

        if (event.body === null) {
            return {
                statusCode: 400,
                body: JSON.stringify("Payload required"),
            };
        }

        const params = JSON.parse(event.body)
        const name = params.name || 'badNameFormat'
        const reason = params.reason || 'badReasonFormat'
        const email = params.email || 'badEmailFormat'
        const phone = params.phone || 'badPhoneFormat'
        const message = params.message || 'badMessageFormat'
        const sgMail = require('@sendgrid/mail')
        const apiKey = 'localhost' === location.hostname ? process.env.SENDGRID_API_KEY : process.env.NETLIFY_EMAILS_PROVIDER_API_KEY;

        console.log(apiKey)

        sgMail.setApiKey(apiKey)
        const msg = {
            to: 'inquiry@cedemi.fr', // Change to your recipient
            from: 'inquiry@cedemi.fr', // Change to your verified sender
            subject: 'Formulaire de Contact',
            text: 'cedemi.fr',
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
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
        return {
            statusCode: 200,
            body: JSON.stringify({message: `ok`}),
            // // more keys you can return:
            // headers: { "headerName": "headerValue", ... },
            // isBase64Encoded: true,
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
};

module.exports = { handler }
