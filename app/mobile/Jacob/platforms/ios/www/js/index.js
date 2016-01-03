/**
 *
 */
var app = {

  /**
   *
   */
  init: function init () {
    //
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  /**
   *
   */
  onDeviceReady: function onDeviceReady () {
    // Preventing scroll.
    document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
    
    var badBtn = document.querySelector('.action .slds-icon-action-close');
    var goodBtn = document.querySelector('.action .slds-icon-action-approval');
    
    badBtn.addEventListener('touchend', function () {
      app.makeApiRequest('POST', 'http://ouradventureproject.com/deepak/score.php', 'familyId=1&childId=' + 3 + '&score=1');
    });
    
    goodBtn.addEventListener('touchend', function () {
      app.makeApiRequest('POST', 'http://ouradventureproject.com/deepak/score.php', 'familyId=1&childId=' + 3 + '&score=-1');
    });
  },
  
  /**
   *
   */
  getKids: function requestKids () {},
  
  /**
   *
   */
  getActivities: function getActivities () {},
  
  /**
   *
   */
  postFeedback: function postFeedback () {},
  
  /**
   *
   */
  handlePostFeedback: function handlePostFeedback () {},
  
  /**
   *
   */
  makeApiRequest: function makeApiRequest(method, url, body) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, false);
    if (body) {
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.setRequestHeader("Content-length", body.length);
      xhr.send(body);
    } else {
      xhr.send();
    }
  }
  

};
