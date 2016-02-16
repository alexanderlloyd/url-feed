var urlFire = angular.module("UrlFire", ["firebase"]);
function MainController($scope, $firebase) {
  $scope.favUrls = $firebase(new Firebase('https://lloydyapp.firebaseio.com/'));
  $scope.urls = [];
  $scope.favUrls.$on('value', function() {
  $scope.urls = [];
  var mvs = $scope.favUrls.$getIndex();
    for (var i = 0; i < mvs.length; i++) {
      $scope.urls.unshift({
        name: $scope.favUrls[mvs[i]].name,
        title: $scope.favUrls[mvs[i]].title,
        key: mvs[i]
      });
    };
});



$scope.saveToList = function(event) {

            //  var mvName = $scope.mvName.trim();
              var mvName = ($scope.mvName) ? $scope.mvName.trim() : '' ;
              var mvUrl = ($scope.mvUrl) ? $scope.mvUrl.trim() : '' ;

                          $scope.favUrls.$add({
                            name: mvName,
                            title: mvUrl
                          });
                          urlName.value = ''; //urlName is the ID of  input box - Angular rocks!
                          urlLink.value = ''; //urlName is the ID of  input box - Angular rocks!
                          $scope.mvName = null;
                          $scope.mvUrl = null;

                          $scope.formSubmitted = true;

}


$scope.edit = function(index) {
  var mv = $scope.urls[index];
    var newName = prompt("Update the url name", mv.name); // to keep things simple and old skool :D
      if (newName && newName.length > 0) {
        // build the FB endpoint to the item in urls collection
        var updateUrlRef = buildEndPoint(mv.key, $firebase);
        updateUrlRef.$set({
          name: newName
        });
      }

}
$scope.del = function(index) {
var mv = $scope.urls[index];
var response = confirm("Are certain about removing this from the list?");
if (response == true) {
// build the FB endpoint to the item in urls collection
var deleteUrlRef = buildEndPoint(mv.key, $firebase);
deleteUrlRef.$remove();
}
}
}
function buildEndPoint(key, $firebase) {
return $firebase(new Firebase('https://lloydyapp.firebaseio.com/' + key));
}
