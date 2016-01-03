// Modules.
var https = require('http');
var AlexaSkill = require('./AlexaSkill');

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with 'amzn1.echo-sdk-ams.app.[your-unique-value-here]';

/**
 *
 */
var API_ROOT = "http://ouradventureproject.com/deepak/";

/**
 * 
 */
var JacobSkill = function() {
    AlexaSkill.call(this, APP_ID);
};

/**
 * Extend AlexaSkill
 */
JacobSkill.prototype = Object.create(AlexaSkill.prototype);

/**
 * 
 */
JacobSkill.prototype.constructor = JacobSkill;

/**
 * 
 */
JacobSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  // Session init logic goes here.
};

/**
 * 
 */
JacobSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  // Session clean up logic goes here.
};

/**
 * 
 */
JacobSkill.prototype.intentHandlers = {

  "GetPermissionIntent": function (intent, session, response) {
      handleEventRequest(intent, session, response);
  }

};

/**
 *
 */
function handleEventRequest(intent, session, response) {
  lookUpUser(intent, lookUpUserActivity, response);
}

/**
 *
 */
function lookUpUser(intent, callback, response) {

  getDataFromApi(
    API_ROOT + "users.php?familyId=1",
    function (result) {
      var users = JSON.parse(result);
      console.log(result);
      var match;
      for(var i = 0, currUser; (currUser = users[i]); i++) {
        if (currUser.CHILD_NAME == intent.slots.name.value) {
          match = currUser;
        }
      }
      //
      if (match) {
        lookUpUserActivity(intent, match, handleUserActivityLookUp, response);
      }
    }
  );

}

/**
 *
 */
function lookUpUserActivity(intent, user, callback, response) {
  
  getDataFromApi(
    API_ROOT + "rewards.php?familyId=1",
    function (result) {
      var activities = JSON.parse(result);
      var match;
      for(var i = 0, currActivity; (currActivity = activities[i]); i++) {
        if (currActivity.REWARD_NAME == intent.slots.activity.value) {
          match = currActivity;
        }
      }
      //
      if (match) {
        console.log(user, match);
        var jacobSays;
        if (Number(user.SCORE) < Number(match.SCORE)) {
          jacobSays = "Yes, " + user.CHILD_NAME + " can " + match.REWARD_NAME + ".";
        } else {
          jacobSays = "No, " + user.CHILD_NAME + " cannot " + match.REWARD_NAME + ".";
        }
        
        callback(
          response,
          "Jacob says: " + jacobSays
        );
      } else {
        callback(
          response,
          "Sorry, Jacob does not know!"
        );
      }

    }
  );

}

/**
 *
 */
function handleUserActivityLookUp(response, data) {
  response.tell(data);
}

/**
 *
 */
function getDataFromApi(url, callback) {
  https.get(url, function(res) {
    var body = '';
    //
    res.on('data', function (chunk) {
      body += chunk;
    });
    //
    res.on('end', function () {
      callback(body);
    });
  }).on('error', function (e) {
    console.log("Got error: ", e);
  });
}

/**
 * Create the handler that responds to the Alexa Request.
 */
exports.handler = function (event, context) {
    // Create an instance of the HistoryBuff Skill.
    var skill = new JacobSkill();
    skill.execute(event, context);
};
