'use strict';
var id = getURLParameter("id");
function JoinCtrl($scope) {
    $scope.customStyle = {};
    $scope.block="{'background-color': 'red' }"
    pubnub.subscribe({
      channel: 'demo_tutorial',
      callback: function(m) {
        $scope.$apply( function() {
          $scope.block = "{'background-color': 'red' }"
        });
        console.log(m);
      }
    });


}

function playerCtrl($scope) {
    var pubnub = PUBNUB.init({
      publish_key: 'pub-c-0ecaf3c4-bc3a-4e03-94e7-e85e196fdc4c',
      subscribe_key: 'sub-c-673a62aa-24c9-11e4-a77a-02ee2ddab7fe'
    });
  
    $scope.publish = function() {
        pubnub.publish({
            channel: 'demo_tutorial',
            message: $scope.message
        });
        //reset the message text
        $scope.message.text = "";
    }
}

var initTouchers = function($scope, pubnub) {
    var mySide = "left";

    document.ontouchstart = function(e){ 
      e.preventDefault(); 
    }
  
    var publishAction = function(action) {
        pubnub.publish({
            channel: "pongnub" + id,
            message: action
        });
    }

    var touchHandler = function(eve) {
      console.log(eve);
      var target = eve.target.id;
      var type = eve.type;
      if (type === "mousedown") type = "touchstart";
      if (type === "mouseup") type = "touchend";
      if (type === "mouseleave") type = "touchend";
      if (type === "mousleave") type = "touchend";
      var time = eve.time;

      publishAction({"target": target, "type": type, side: mySide});
    }

    document.addEventListener("touchstart", function(e) {touchHandler(e)}, false);
    document.addEventListener("touchend", function(e) {touchHandler(e);}, false);
    document.addEventListener("touchleave", function(e) {touchHandler(e);}, false);
    document.addEventListener("touchcancel", function(e) {touchHandler(e);}, false);
    document.addEventListener("mousedown", function(e) {touchHandler(e);}, false);
    document.addEventListener("mouseup", function(e) {touchHandler(e);}, false);
    document.addEventListener("mouseleave", function(e) {touchHandler(e);}, false);   
}
