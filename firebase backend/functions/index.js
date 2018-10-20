// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyCXt5F8NADgIJz_f33VlUb3WBI8o1WwgWM",
    authDomain: "aroundtheworld-1.firebaseapp.com",
    databaseURL: "https://aroundtheworld-1.firebaseio.com",
    projectId: "aroundtheworld-1",
    storageBucket: "aroundtheworld-1.appspot.com",
    messagingSenderId: "831305387317"
};
firebase.initializeApp(config);

exports.getBriefQuote = functions.https.onRequest((req, res) => {
    var flightsApiKey = getApiKey();
    const skyQuery = "http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/"
        + req.query["country"] + "/"
        + req.query["currency"] + "/"
        + req.query["locale"] + "/"
        + req.query["originPlace"] + "/"
        + req.query["destinationPlace"] + "/"
        + req.query["outboundPartialDate"] + "/"
        + "?apiKey=" + flightsApiKey;
    console.log("Called query: " + skyQuery);
    var request = new XMLHttpRequest();
    request.open('GET', skyQuery);
    request.setRequestHeader("Accept", "application/xml");
    request.send();
    request.onreadystatechange = function () {
        console.log("While querying skyscanner got ready state " + String(this.readyState) + " and state " + String(this.state));
        if (this.readyState === 4) {
            return res.status(200).send(request.responseText);
        } else if (this.state === 400) {
            return res.status(400).send("Skyscanner said bad request");
        } else if (this.state === 403) {
            return res.status(403).send("Skyscanner said API Key not supplied, invalid, or unauthorised");
        } else if (this.state === 429) {
            return res.status(429).send("Skyscanner said too many requests");
        } else if (this.state === 500) {
            return res.status(500).send("Skyscanner said internal server error");
        }
    };
    request.ontimeout = function () {
        return res.status(408).send("Timed out");
    }
});

exports.getFullQuote = functions.https.onRequest((req, res) => {
    getApiKey(apikey =>
        createSession(apikey, req, res)
    );
});

function getApiKey(callback) {
    var ref = firebase.database().ref();
    ref.on("value", function (snapshot) {
        console.log("Got api key: " + snapshot.val()["flightsApiKey"]);
        callback(snapshot.val()["flightsApiKey"])
    }, function (error) {
        console.log("Error when getting api key from db: " + error.code)
    });
}

function createSession(apikey, req, res) {
    var request = new XMLHttpRequest();
    const postSession = "http://partners.api.skyscanner.net/apiservices/pricing/v1.0";
    const params =
        "country=" + req.query["country"] + "&" +
        "currency=" + req.query["currency"] + "&" +
        "locale=" + req.query["locale"] + "&" +
        "originPlace=" + req.query["originPlace"] + "&" +
        "destinationPlace=" + req.query["destinationPlace"] + "&" +
        "outboundDate=" + req.query["outboundDate"] + "&" +
        "adults=" + req.query["adults"] + "&" +
        "apiKey=" + apikey;
    console.log("Got session url: " + postSession);
    request.open('POST', postSession);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Accept", "application/xml");
    request.setRequestHeader("X-Forwarded-For", req.query["ipAddress"]);
    request.send(params);
    request.onreadystatechange = function () {
        console.log("While querying skyscanner got ready state " + String(this.readyState) + " and state " + String(this.status));
        if (this.readyState === 4) {
            console.log("Got session: " + request.getResponseHeader("location"));
            return pollSession(request.getResponseHeader("location"), res, apikey);
        }
    };
}

function pollSession(session, res, apikey) {
    var request = new XMLHttpRequest();
    console.log("PARAMS ATTEMPT 1");
    const params = "sortType=price&sortOrder=asc";
    request.open("GET", session+"?sortType=price&sortOrder=asc&apiKey="+apikey);
    request.setRequestHeader("Accept", "application/xml");
    request.send(params);
    request.onreadystatechange = function () {
        console.log("While querying skyscanner got ready state " + String(this.readyState) + " and state " + String(this.status));
        if (this.readyState === 4) {
            return res.status(this.status).send(request.responseText);
        }
    };
}