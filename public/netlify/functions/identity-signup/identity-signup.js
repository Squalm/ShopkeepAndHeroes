// note - this function MUST be named `identity-signup` to work
// we do not yet offer local emulation of this functionality in Netlify Dev
//
// more:
// https://www.netlify.com/blog/2019/02/21/the-role-of-roles-and-how-to-set-them-in-netlify-identity/
// https://www.netlify.com/docs/functions/#identity-and-functions
//
// My thanks to: https://hasura.io/blog/custom-auth-with-netlify/

const fetch = require("node-fetch");

exports.handler = async function(event, context, callback) {
  const { user } = JSON.parse(event.body);

  const responseBodyString = JSON.stringify({
    query: `
    mutation insertUser($id: String, $email:String, $name:String){
      insert_users(objects: {id: $id, email: $email, name: $name}) {
        affected_rows
      }
    }    
  `,
    variables: {
      id: user.id,
      email: user.email,
      name: user.user_metadata.full_name
    }
  });

  console.log(responseBodyString);

  const result = await fetch(
    "https://shopkeep-and-heroes.hasura.app/v1/graphql",
    {
      method: "POST",
      body: responseBodyString,
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret":
          process.env.HASURA_SECRET
      }
    }
  );
  const { errors, data } = await result.json();

  if (errors) {
    console.log(errors);
    return {
      statusCode: 500,
      body: data
    };
  } else {
    return {
      statusCode: 200,
    };
  }
};