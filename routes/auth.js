const 
config = require('../config.json'),
qs = require('querystring');

exports.verify = function(req, res) {
  function failure(err) {
    res.send(err, 401);
  }
  function success(msg) {
    res.send(msg, 200);
  }

  if (!req.body.assertion) {
    return failure({error: "you did not post an assertion to me"});
  }

  var body = {
    assertion: req.body.assertion,
    audience: config.public_url
  };

  var opts = {
    host: 'verifier.login.persona.org',
    port: 443,
    path: '/verify',
    method: 'POST',
    headers: {
      'Content-Length': body.length,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  var response = '';
  var verifier = https.request(opts, function(res) {
    if (res.statusCode === 200) {
      res.setEncoding('utf-8');
      res.on('data', function(data) {
        response += data;
      });
      res.on('end', function() {
        try {
          var verified = JSON.parse(d);
        } catch(err) {
          return failure(err);
        }

        if ("okay" === verified.status && !!verified.email) {
          return success(verified);
        }
        return failure(verified);
      });
    }
  });

  verifier.write(body);
  verifier.on('error', failure);
  verifier.end();
};
