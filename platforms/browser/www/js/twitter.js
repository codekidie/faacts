function twitterlogin() {
		TwitterConnect.login(
		  function(result) {
		  	var ref = firebase.database().ref("users"); 
		      ref.orderByChild('username').equalTo(result.userId)
		          .once('value').then(function(snapshot) {
		           var exists = (snapshot.val() !== null);
		   		   fbuserExistsCallback(result.userName,'https://twitter.com/'+result.userName+'/profile_image?size=normal',result.userId, exists);
		           
		      });
		    
		  }, function(error) {
              alert('Twitter login failed!');
		  }
		);

	
}

