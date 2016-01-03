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
    //document.body.innerHTML = "hello";
    document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
  }

};
