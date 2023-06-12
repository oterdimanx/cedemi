// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const fetch = import('node-fetch')
const mjkey = process.env.MJ_KEY
const mjsec = process.env.MJ_SECRET

const handler = async (event) => {
  try {
    const params = JSON.parse(event.body);
    const name = params.name || 'badNameFormat';
    const email = params.email || 'badEmailFormat';
    //const response = await fetch();
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
