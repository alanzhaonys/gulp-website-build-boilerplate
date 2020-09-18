const axios = require("axios");

exports.handler = async (event, context, callback) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const userName = process.env.USER_NAME;
  const password = process.env.PASSWORD;
  const subscribeEndpoint = process.env.SUBSCRIBE_ENDPOINT;
  const tokenEndpoint = process.env.TOKEN_ENDPOINT;

  let accessToken = null;
  let success = false;
  let errorMsg = null;

  // Log something here
  //console.log('ENV variables: ' + JSON.stringify(process.env));
  console.log("Full Event: " + JSON.stringify(event));
  //console.log('Context: ' + JSON.stringify(context));

  // Get access token
  await axios
    .post(tokenEndpoint, {
      clientId: clientId,
      clientSecret: clientSecret,
      userName: userName,
      password: password,
    })
    .then(function (response) {
      //console.log(response);
      accessToken = response.data.accessToken;
    })
    .catch(function (error) {
      console.log(error.message);
    });

  // Subscribe
  if (accessToken) {
    // Get access token
    await axios
      .post(subscribeEndpoint, event, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then(function (response) {
        //console.log(response);
        success = true;
      })
      .catch(function (error) {
        console.log(error.message);
        if (error.response.data.errors) {
          errorMsg = error.response.data.errors[0];
        }
      });
  }

  const response = {
    success: success,
    error: errorMsg,
  };

  callback(null, response);
};
