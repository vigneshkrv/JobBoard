exports.handler = async function (event, context, callback) {
  //   const Axios = require("./axios.min").default;
  const https = require("https");

  let githubJobUrl = new URL("https://jobs.github.com/positions.json");

  for (key of Object.keys(event.queryStringParameters)) {
    githubJobUrl.searchParams.append(key, event.queryStringParameters[key]);
  }

  //   console.log(event);
  const httpCallback = function (response) {
    var str = "";
    //another chunk of data has been received, so append it to `str`
    response.on("data", function (chunk) {
      str += chunk;
    });

    //the whole response has been received, so we just print it out here
    response.on("end", function () {
      console.log(str);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(str),
      });
    });
  };

  https.request(githubJobUrl, httpCallback).end();
};
