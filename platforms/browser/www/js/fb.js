 openFB.init({appId: '630222540497256'});
     

    function login() {
        openFB.login(
                function(response) {
                    if(response.status === 'connected') {
                        getInfo();
                    } else {
                        alert('Facebook login failed!');
                    }
                }, {scope: "email",return_scopes: true});
    }

    

    function getInfo() {


        openFB.api({
            path: '/me',
            success: function(data) {
              console.log(JSON.stringify(data));
              
              var ref = firebase.database().ref("users"); 
              ref.orderByChild('username').equalTo(data.id)
                  .once('value').then(function(snapshot) {
                   var exists = (snapshot.val() !== null);
                   fbuserExistsCallback(data.name,'http://graph.facebook.com/' + data.id + '/picture?type=small',data.id, exists);
              });
            },
            error: errorHandler});
    }

    function share() {
        openFB.api({
            method: 'POST',
            path: '/me/feed',
            params: {
                message: document.getElementById('Message').value || 'Testing Facebook APIs'
            },
            success: function() {
                alert('the item was posted on Facebook');
            },
            error: errorHandler});
    }

    function readPermissions() {
        openFB.api({
            method: 'GET',
            path: '/me/permissions',
            success: function(result) {
                alert(JSON.stringify(result.data));
            },
            error: errorHandler
        });
    }

    function revoke() {
        openFB.revokePermissions(
                function() {
                    alert('Permissions revoked');
                },
                errorHandler);
    }

    function logout() {
        openFB.logout(
                function() {
                    alert('Logout successful');
                },
                errorHandler);
    }

    function errorHandler(error) {
        alert(error.message);
    }
