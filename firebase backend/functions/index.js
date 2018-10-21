// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const firebase = require('firebase');

const cors = require('cors')({origin: true});

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
    if (req.query["skyscanner"]==="true"){
        req.query["originPlace"] = req.query["originPlace"] + "-sky";
        req.query["destinationPlace"] = req.query["destinationPlace"] + "-sky";
        getApiKey(apikey =>
            createSession(apikey, req, res)
        );
    } else {
        const getQuery = "http://8bdc5dc6.ngrok.io/api/" +
            req.query["outboundDate"]+"/" +
            req.query["outboundDate"]+"/" +
            req.query["originPlace"]+"/" +
            req.query["destinationPlace"];
        var request = new XMLHttpRequest();
        console.log("Asked victors api for "+getQuery);
        request.open("GET",getQuery);
        request.send();
        console.log("Started victors api query");
        request.onreadystatechange = function () {
            console.log("While querying victors api got ready state " + String(this.readyState) + " and state " + String(this.status));
            if (this.readyState === 4) {
                var json_doc = JSON.parse(request.responseText);
                var items = [];
                for (var i = 0; i<json_doc.length; i++){
                    var current = json_doc[i];
                    var vals = {};
                    vals.departTime = current[0].TimeOut;
                    vals.arrivalTime = current[current.length-1].TimeIn;
                    if (current[0].Airline==="RYAN"){
                        vals.url = "https://www.ryanair.com/gb/en/";
                    } else {
                        vals.url = "https://www.vueling.com/en";
                    }
                    vals.price=0.0;
                    for (var j = 0; j<current.length; j++){
                        vals.price = vals.price+current[j].Price;
                    }
                    items.push(vals);
                }
                items.sort(function(a, b){
                    var keyA = a.price,
                        keyB = b.price;
                    if(keyA < keyB) return -1;
                    if(keyA > keyB) return 1;
                    return 0;
                });
                var result = [];
                for (i=0; i<5; i++){
                    result.push(items[i])
                }
                return res.status(this.status).send(JSON.stringify(result));
            }
        };
    }
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
    request.setRequestHeader("Accept", "application/json");
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
    console.log("IMPROVE 0");
    request.open("GET", session + "?pageIndex=0&sortType=price&sortOrder=asc&apiKey=" + apikey);
    request.setRequestHeader("Accept", "application/json");
    request.send();
    request.onreadystatechange = function () {
        console.log("While querying skyscanner got ready state " + String(this.readyState) + " and state " + String(this.status));
        if (this.readyState === 4) {
            var json_doc = JSON.parse(request.responseText);
            var result = json_doc.Itineraries;
            var legIds = [];
            var departTime = [];
            var arriveTime = [];
            var i;
            for (i = 0; i < 5; i++) {
                console.log("Entry "+String(i)+": "+JSON.stringify(result[i]));
                var legId = result[i].OutboundLegId;
                console.log("Leg Id="+legId);
                legIds.push(legId);
                departTime.push("");
                arriveTime.push("")
            }
            //console.log("Leg IDs: "+JSON.stringify(legIds));
            for (i = 0; i < 5; i++) {
                var leg = json_doc.Legs[i];
                //console.log("Leg Sample: "+JSON.stringify(leg));
                for (var j = 0; j < 5; j++) {
                    if (leg.Id === legIds[j]) {
                        departTime[j] = leg.Departure;
                        arriveTime[j] = leg.Arrival;
                    }
                }
            }
            var toReturn = "[";
            console.log("First result: "+JSON.stringify(result[i]));
            console.log("First pricing option: "+JSON.stringify(result[i].PricingOptions[0]));
            for (i = 0; i < 5; i++) {
                var dict = {};
                dict.price = result[i].PricingOptions[0].Price;
                console.log("Leg ID "+leg.Id+": Price="+result[i].PricingOptions[0].Price+","+"DepartTime="+departTime[i]+", ArriveTime="+arriveTime[i]);
                dict.departTime = departTime[i];
                dict.arrivalTime = arriveTime[i];
                dict.url = result[i].PricingOptions[0].DeeplinkUrl;
                var stringDict = JSON.stringify(dict);
                toReturn = toReturn + stringDict;
                if (i!==4){
                    toReturn = toReturn + ",";
                }
                console.log("Journey "+String(i)+": "+stringDict);
            }
            toReturn = toReturn+"]";
            return res.status(this.status).send(toReturn);
        }
    };
}