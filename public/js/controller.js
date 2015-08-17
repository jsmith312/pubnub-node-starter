var id = getURLParameter("id");
$(document).ready(function(){
    var pubnub = PUBNUB.init({
        publish_key: 'pub-c-0ecaf3c4-bc3a-4e03-94e7-e85e196fdc4c',
        subscribe_key: 'sub-c-673a62aa-24c9-11e4-a77a-02ee2ddab7fe'
    });

    initTouchers("player", pubnub);
});

var initTouchers = function($scope, name, pubnub) {

    $scope.publish = function() {
        pubnub.publish({
            channel: 'demo_tutorial',
            message: {"text":"Hey!"}
        });
        //reset the message text
        $scope.message.text = "";
        }
}
