

function deleteAttainment(key){
	  $$('#'+key).remove();
	  firebase.database().ref("attainment").child(key).remove().then(function() {
	        myApp.alert('Attainment Data Removed Success!', function () {
	          mainView.goBack();
	        });
	  });
}



function deleteAwards(key){
	$$('#'+key).remove();
	  firebase.database().ref("awards").child(key).remove().then(function() {
	        myApp.alert('Award Data Removed Success!', function () {
	          mainView.goBack();
	        });
	  });
}