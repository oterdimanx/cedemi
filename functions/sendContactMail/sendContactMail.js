// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
/*
const fetch = import('node-fetch')

const handler = async (event) => {
  try {
    if (event.body === null) {
      return {
        statusCode: 400,
        body: JSON.stringify("Payload required"),
      };
    }

    const params = JSON.parse(event.body);
    const name = params.name || 'badNameFormat';
    const email = params.email || 'badEmailFormat';

    const response = fetch(`${process.env.URL}/.netlify/functions/emails/contact`, {
      headers: {
        "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET
      },
      method: "POST",
      body: JSON.stringify({
        from: 'inquiry@cedemi.fr',
        to: 'inquiry@cedemi.fr',
        subject: "mail de contact",
        parameters: {
          name: name,
          email: email,
        },
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello sd ${email}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
*/
const handler = async (event) => {
if (event.body === null) {
  return {
    statusCode: 400,
    body: JSON.stringify("Payload required"),
  };
}

const params = JSON.parse(event.body);
const name = params.name || 'badNameFormat';
const email = params.email || 'badEmailFormat';

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey('process.env.NETLIFY_EMAILS_PROVIDER_API_KEY')
    const msg = {
        to: 'inquiry@cedemi.fr', // Change to your recipient
        from: 'inquiry@cedemi.fr', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<html>' +
            '<head>' +
            '</head>' +
            '<body>' +
            '<strong>name : {name}</strong>' +
            '<strong>email : {email}</strong>' +
            '<strong>and easy to do anywhere, even with Node.js</strong>' +
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
    body: JSON.stringify({ message: `Hello sd ${email}` }),
    // // more keys you can return:
    // headers: { "headerName": "headerValue", ... },
    // isBase64Encoded: true,
  }
};



module.exports = { handler }
