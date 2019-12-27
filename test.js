const url = require('url');
const https = require('https');
const lbToken = "7EC03D7E-296C-4149-9284-75674D151AA8";
const OtherlbToken = "fe777fbc-bfec-454f-9e7d-77cef9f5d9f9";
const lbUser = "lbm";
const lbmPwd = "Pfefferminze1337";
const urlDialogflow = "https://console.dialogflow.com/api-client/demo/embedded/c1086e21-0223-41ab-b946-6111295df67d";

var callbackUrls = {};

var session = {};
var coreVpUrl = "https://api-test.dhl.com/gbs/virtual-assistants/webchat/v2"

function isValidToken(token) {
  if (lbToken === token) {
    return true;
  } else {
    return false;
  }
}

function sendSpeechToCoreVP(reqx, resx, sessionId) {
  console.log("coreVpUrl "+ coreVpUrl);
  var data = {
    context: {},
    languageCode: reqx.body.language,
    messages: [reqx.body.text]
  };

  if (session && session[reqx.body.dialogId]) {
    data.context.convId = session[reqx.body.dialogId];
  } 
  let sayUrl = new URL(coreVpUrl);
  const originalData = JSON.stringify(data);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'DHL-API-Key': '4cb9aec5-6b23-41f4-8362-b69b8f1381c3',
      'Content-Length': Buffer.byteLength(originalData) 
    }
  };

  const req = https.request(sayUrl,options, (resp) => {
    console.log(`statusCode: ${resp.statusCode}`);

    var payload = '';
    resp.on('data', (chunk) => {
      console.log('chunk:', chunk);
        payload += chunk;
    });

    resp.on('end', () => {
      console.log("palyoad=" + payload);
      var jsonPayload = JSON.parse(payload);
      if (typeof session[reqx.body.dialogId] == 'undefined') {
        session[reqx.body.dialogId] = jsonPayload.context.convId;
      }
      sayLindenbaum(reqx, resx, jsonPayload);
    });
  });

  req.on('error', (error) => {
      console.error(error);
  });
}

function sayLindenbaum(reqx, resx, speech) {
  var speechStr = '';
  if (speech && speech.response && speech.response.text) {
    var textStr = speech.response.text;
    if (textStr.length > 1) {
      speechStr = textStr.join(", ");
    } else {
      speechStr = textStr[0]
    }
  }
  let sayUrl = new URL(callbackUrls[reqx.body.dialogId] + "/call/say");
  console.log("SENDING SPEECH URL : " + sayUrl);
  //var encodeSpeech=encodeURIComponent( speech.result.fulfillment.speech); 
  const data = JSON.stringify({
    dialogId: reqx.body.dialogId,
    text: speech.response.text[0],
    language: reqx.body.language,
    bargeIn: false,
    accessToken: reqx.body.accessToken
  });
  console.log("SENDING SPEECH DATA: " + data);
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Content-Length': Buffer.byteLength(data) 
    }
  };

  const req = https.request(sayUrl, options, (res) => {
    console.log(`sayUrl: ${sayUrl} :: statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
      console.error(error);
  });

  req.write(data);
  req.end();

  // just for test clients
  resx.status(200).send(data);
}

function lbmSession(req, res) {
  if (!isValidToken(req.body.accessToken)) {
    console.log("session token Valid ?" +req.body.accessToken)
    res.status(401).send("NOT AUTHORIZED ACCESS");
  } else {
    console.log("session token is Valid!" +req.body.accessToken)
    callbackUrls[req.body.dialogId]=req.body.callback;
    console.log("url:" +callbackUrls[req.body.dialogId])
    // sendSpeechDialogFlow(req, res, "Hallo", req.body.dialogId);
    req.body.text = "Hallo";
    sendSpeechToCoreVP(req, res, req.body.dialogId);
  }
}

function lbmMessage(request, res) {
  if (!isValidToken(request.body.accessToken)) {
    res.status(401).send("NOT AUTHORIZED ACCESS");
  } else {
    console.log("---LBMSSS text:"+request.body.text);
    sendSpeechToCoreVP(request, res, request.body.dialogId);
  }
}

function terminated(req, res) {
  console.log("---LBM called terminated:"+req.body);
  delete session[req.body.dialogId];
  delete callbackUrls.req.body.dialogId;
}
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.lindenbaum = (req, res) => {
  let url_parts = url.parse(req.url);

  if (url_parts.pathname === "/session") {
    console.log("---LBM called session:"+req.body.dialogId);
    lbmSession(req, res);
  } else if (url_parts.pathname === "/message") {
    console.log("---LBM called MESSAGE:"+req.body.dialogId);
    lbmMessage(req, res);
  } else if (url_parts.pathname === "/terminated") {
    terminated(req, res);
  } else if (url_parts.pathname === "/call/bridge") {
    console.log("---LBM called call/bridge:"+req.body);
  } else {
    res.status(200).send("URL path " + url_parts.pathname + " kenne ich nicht!");
  }
};