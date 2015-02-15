/*
 * Logging code
 */
function logClear() {
    $('#logs').html('');
}

function log(mess) {
    $('#logs').prepend('<pre>' + mess + '</pre>');
    console.log(mess);
}

function logJSON(mess, json) {
    log(mess + JSON.stringify(json, null, 2));
}

/*
 * Save tokens in localStorage so they will persist between runs
 */
function saveTokens(tokens) {
    localStorage['gapi_tokens'] = JSON.stringify(tokens);
}

function getTokens() {
    return JSON.parse(localStorage['gapi_tokens']);
}

/*
 * These are credentials for one of my test apps
 * Replace with your own!
 */
var params = {
    client_id: '454708121596-r1nuq62gqitr71o7tijni8usi16b0eme.apps.googleusercontent.com',
    scope: 'https://www.googleapis.com/auth/games',
    callback: function(error, tokens) {
        if (error) log('error: ' + error);
        else {
            saveTokens(tokens);
            logJSON('tokens: ', tokens);
        }
    }
};

function signInTest() {
    log('Sign in');
    phonegapi.signIn(params);
}

function refreshTest() {
    log('Refresh');
    phonegapi.refreshSignIn(getTokens(), params);
}

function signOutTest() {
    log('Sign out');
    phonegapi.signOut(function(tokens) {
        saveTokens(tokens);
    });
}

/*
 * Test if we are authenticated by listing leaderboards
 */
 
 function subscore()
 {
  var json={};
json.leaderboardId='CgkI_J_d9Z0NEAIQAQ';
json.score=666;
gapi.client.games.scores.submit(json);    
     
 }
 }
function leaderboards() {
    log('leaderboards');
    gapi.client.request({
        path: '/games/v1/leaderboards',
        params: {maxResults: 5},
        callback: function(response) {
            logJSON('leaderboards: ', response);
        }});
}
