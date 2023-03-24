// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const fetch = import('node-fetch')
const mjkey = process.env.MJ_KEY
const mjsec = process.env.MJ_SECRET

const handler = async (event) => {
  try {
    const subject = event.queryStringParameters.name || 'World'
    //const response = await fetch();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello sd ${mjsec}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
