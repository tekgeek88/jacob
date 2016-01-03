/**
 *
 */
var app = {
  
  /**
   *
   */
  currentKid: 0,
  
  /**
   *
   */
  getCurrentKid: function getCurrentKid() {
    return app.currentKid;
  },

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
    
    var kid1Btn = document.querySelector('.kids .kid1');
    var kid2Btn = document.querySelector('.kids .kid2');
    var kid3Btn = document.querySelector('.kids .kid3');
    kid1Btn.addEventListener('touchend', function () {
      app.selectKid(1);
    });
    kid2Btn.addEventListener('touchend', function () {
      app.selectKid(2);
    });
    kid3Btn.addEventListener('touchend', function () {
      app.selectKid(3);
    });
    
    
    badBtn.addEventListener('touchend', function () {
      app.makeApiRequest('POST', 'http://ouradventureproject.com/deepak/score.php', 'familyId=1&childId=' + app.getCurrentKid() + '&score=1');
    });
    
    goodBtn.addEventListener('touchend', function () {
      app.makeApiRequest('POST', 'http://ouradventureproject.com/deepak/score.php', 'familyId=1&childId=' + app.getCurrentKid() + '&score=-1');
    });
    
    app.selectKid(3);
  },
  
  /**
   *
   */
  selectKid: function selectKid(kid) {
    app.resetKidSelection();
    var kidEl = document.querySelector('.kids .kid' + kid);
    kidEl.setAttribute('data-status', 'selected');
    app.currentKid = kid;
  },
  
  /**
   *
   */
  resetKidSelection: function resetKidSelection () {
    var kids = document.querySelectorAll('.kids .kid');
    for (var i = 0, currKid; (currKid = kids[i]); i++) {
      currKid.removeAttribute('data-status');
    }
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
