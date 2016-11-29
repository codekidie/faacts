// Initialize your app
var myApp = new Framework7({
    modalTitle:'Faact',
    pushState:true,
    material:true,
    onAjaxStart:function(xhr){
      myApp.showPreloader();
      
    },
    onAjaxComplete:function(xhr){
       myApp.hidePreloader();

    }
});



// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    domCache:false,
});




function showloader()
{
   myApp.showPreloader();
    setTimeout(function () {
        myApp.hidePreloader();
    }, 1000);
}


 function initialize() {

    var onSuccess = function(position) {
        var gm = google.maps;
        var map = new gm.Map(document.getElementById('map_canvas'), {
          mapTypeId: gm.MapTypeId.ROADMAP,
          center: new gm.LatLng(position.coords.latitude,position.coords.longitude), 
          zoom: 15,  // whatevs: fitBounds will override
          scrollwheel: false
        });
        var iw = new gm.InfoWindow();
        var oms = new OverlappingMarkerSpiderfier(map,
          {markersWontMove: true, markersWontHide: true});


        var shadow = new gm.MarkerImage(
          'https://www.google.com/intl/en_ALL/mapfiles/shadow50.png',
          new gm.Size(37, 34),  // size   - for sprite clipping
          new gm.Point(0, 0),   // origin - ditto
          new gm.Point(10, 34)  // anchor - where to meet map location
        );

          var iconBase = 'img/';

        
        oms.addListener('click', function(marker) {
          iw.setContent(marker.desc);
          iw.open(map, marker);
        });
        oms.addListener('spiderfy', function(markers) {
          for(var i = 0; i < markers.length; i ++) {
            markers[i].setIcon(iconBase + 'marker.png');
            markers[i].setShadow(null);
          } 
          iw.close();
        });
        oms.addListener('unspiderfy', function(markers) {
          for(var i = 0; i < markers.length; i ++) {
            markers[i].setIcon(iconBase + 'marker.png');
            markers[i].setShadow(shadow);
          }
        });


         var user_marker = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
        icon: iconBase + 'marker.png',
        map: map
      });

      user_infowindow = new google.maps.InfoWindow({
        content: '<h3>Your Here!</h3>',
      });  

     user_infowindow.open(map, user_marker);
        
        var bounds = new gm.LatLngBounds();

        function runOnComplete(){
          for (var i = 0; i < global_arr.length; i ++) {
              var datum = global_arr[i];
              var loc = new gm.LatLng(datum.lat, datum.lon);
              bounds.extend(loc);
              var marker = new gm.Marker({
                position: loc,
                title: '',
                map: map,
                icon: iconBase + 'marker.png',
                shadow: shadow
              });
              marker.desc = '<center><img src="'+datum.image+'" style="width:100px;height:100px;"><h3>School Name : '+datum.schoolname+'</h3><p>Website : '+datum.website+'</p><p>Address'+datum.address+'</p><p>Contact : '+datum.contact+'</p></center>';
              oms.addMarker(marker);
            }

            // Uncomment This if you want to  load map on fit bound
            //map.fitBounds(bounds);

            // for debugging/exploratory use in console
            window.map = map;
            window.oms = oms;
        }
        
        var global_arr = [];

         var query = firebase.database().ref("schools");
              query.once("value")
                .then(function(snapshot) {
                  snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();
                    global_arr.push({
                               schoolname: childData.schoolname,
                               website: childData.website,
                               address: childData.address,
                               contact : childData.contact,
                               image: childData.image,
                               lat: childData.latitude,
                               lon: childData.longitude
                             });
                  });
                  runOnComplete();
              });    
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

      
} // End initialize maps
  


myApp.onPageInit('index', function() {
  showloader();
  $$('.hideonlogin').hide();
  $$('.navbar').hide();

}).trigger();


$$('.signout').on('click', function () {
    showloader();
    
      firebase.auth().signOut().then(function() {
         mainView.router.loadPage({url:'login-screen-page.html', ignoreCache:true, reload:true })
      }, function(error) {
          myApp.alert('Sign Out Failed', function () {
            mainView.goBack();
          });
      });
});



myApp.onPageInit('login-screen', function (page) {
  var pageContainer = $$(page.container);
  $$('.hideonlogin').hide();
  $$('.navbar').hide();

// Code to Login Using Fb
  pageContainer.find('.login-fb').on('click', function () {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
         var user = result.user;
          if (user) {
             mainView.router.loadPage({url:'location.html', ignoreCache:true, reload:true })
          }
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  });

// Code To Login Using Google
  pageContainer.find('.login-google').on('click', function () {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      
      if (user) {
         mainView.router.loadPage({url:'location.html', ignoreCache:true, reload:true })
      }
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });  

  pageContainer.find('.login-button').on('click', function () {

    myApp.showPreloader();
    setTimeout(function () {
        myApp.hidePreloader();
    }, 4000);

    var username = pageContainer.find('input[name="username"]').val();
    var password = pageContainer.find('input[name="password"]').val();
    
    var query = firebase.database().ref("users").orderByKey();
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key;
          var childData = childSnapshot.val();
          if (childData.username == username && childData.password == password) {
            $$('.statusbar-overlay').attr('data-userid', key);

             
             mainView.router.loadPage({url:'location.html', ignoreCache:true, reload:true })
             return true;

          }
      });
    });
  });
});  

myApp.onPageInit('register-screen', function (page) {
  var pageContainer = $$(page.container);
  $$('.hideonlogin').hide();
  $$('.navbar').hide();

      pageContainer.find('.register-button').on('click', function () {
        var fullname = pageContainer.find('input[name="fullname"]').val();
        var username = pageContainer.find('input[name="username"]').val();
        var password = pageContainer.find('input[name="password"]').val();
         
         function userExistsCallback(username, exists) {
            if (exists) {
                   myApp.alert('Error Registration Username Already Exist!', function () {
                    mainView.goBack();
                  }); 
            } else {
              
                    var db = firebase.database();
                    var ref = db.ref("users");
                    var newUser = ref.push();
                    newUser.set({
                      fullname: fullname,
                      username: username,
                      password: password
                    });

                  myApp.alert('Registration Success!', function () {
                       mainView.goBack();
                  }); 
            }
          }

          var ref = firebase.database().ref("users"); 
          ref.orderByChild('username').equalTo(username)
              .once('value').then(function(snapshot) {
               var exists = (snapshot.val() !== null);
               userExistsCallback(username, exists);
          });

         
           
      });
});     





myApp.onPageInit('home', function(page) { 
      $$('.hideonlogin').show();
      $$('.navbar').show();

});



myApp.onPageInit('location', function(page) { 
     $$('.hideonlogin').show();
     $$('.navbar').show();
       initialize();               
});




$$(document).on('pageInit',function(e){
    var page = e.detail.page;

    if (page.name === 'results') {
      var user_id = $$('.statusbar-overlay').data('userid');
      var artistic_total = [];
      var conventional_total = [];
      var enterprising_total = [];
      var investigative_total = [];
      var realistic_total = [];
      var social_total = [];
      var i = 0;
      myApp.showPreloader();

        var query = firebase.database().ref("personality_test").orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                    ++i;


                        var key = childSnapshot.key;
                        var childData = childSnapshot.val();


                        var artistic = [1,2,13,14,25,26,37,38,49,50,61,62,73,74,85,86,97];
                        var conventionalinterest = [3,4,15,16,27,28,39,40,51,52,63,64,75,76,87,88,99,100];
                        var enterprising = [5,6,17,18,29,30,41,42,53,54,65,66,77,78,89,90,101,102];
                        var investigative = [7,8,19,20,31,32,43,44,55,56,67,68,79,80,91,92,103,104];
                        var realistic = [9,10,21,22,33,34,45,46,57,58,69,70,81,82,93,94,105,106];
                        var social = [11,12,23,24,35,36,47,48,59,60,71,72,83,84,95,96,107,108];

                        
                          if (childData.user_id == user_id) {
                            
                              
                              // Check where to store the data
                              function isInArray(value, array) {
                                return array.indexOf(value) > -1;
                              }

                              if (isInArray(i,artistic) === true){
                                  artistic_total.push(parseInt(childData.answer));
                              }
                              else if(isInArray(i,conventionalinterest) === true){
                                  conventional_total.push(parseInt(childData.answer));
                              }
                               else if(isInArray(i,enterprising) === true){
                                 enterprising_total.push(parseInt(childData.answer));
                              }

                              else if(isInArray(i,investigative) === true){
                                 investigative_total.push(parseInt(childData.answer));
                              }

                               else if(isInArray(i,realistic) === true){
                                 realistic_total.push(parseInt(childData.answer));
                              }

                              else if(isInArray(i,social) === true){
                                 social_total.push(parseInt(childData.answer));
                              }

                              

                              var final_artistic_result = artistic_total.reduce(add, 0);
                              var final_conventionalinterest_result = conventional_total.reduce(add, 0);
                              var final_enterprising_result = enterprising_total.reduce(add, 0);
                              var final_investigative_result = investigative_total.reduce(add, 0);
                              var final_realistic_result = realistic_total.reduce(add, 0);
                              var final_social_result = social_total.reduce(add, 0);
                              function add(a, b) {
                                  return a + b;
                              }

                              

                              $$('#numeric_artistic').html(final_artistic_result+'%');
                              $$('#numeric_conventional').html(final_conventionalinterest_result+'%');
                              $$('#numeric_enterprising').html(final_enterprising_result+'%');
                              $$('#numeric_investigative').html(final_investigative_result+'%');
                              $$('#numeric_realistic').html(final_realistic_result+'%');
                              $$('#numeric_social').html(final_social_result+'%');

                              myApp.setProgressbar('#artistic',final_artistic_result, 2);
                              myApp.setProgressbar('#conventional',final_conventionalinterest_result, 2);          
                              myApp.setProgressbar('#enterprising',final_enterprising_result, 2);          
                              myApp.setProgressbar('#investigative',final_investigative_result, 2);          
                              myApp.setProgressbar('#realistic',final_realistic_result, 2);          
                              myApp.setProgressbar('#social',final_social_result, 2);          
                        }
                  });      
              });  

                setTimeout(function () {
                    myApp.hidePreloader();
                }, 1000);    

    }

     if (page.name === 'questions') {
          var pageContainer = $$(page.container);
          pageContainer.find('.addquestion').on('click', function () {
            var qname = pageContainer.find('input[name="question"]').val();
            var qnumber = pageContainer.find('input[name="question_num"]').val();
              var db = firebase.database();
              var ref = db.ref("personality_test_questions");
              var newUser = ref.push();
              newUser.set({
                qname: qname,
                qnum: qnumber
              });
            myApp.alert('Question Added: ' + qname , function () {
              mainView.goBack();
            });
          });
     }



    if (page.name === 'addschools') {
          var pageContainer = $$(page.container);
          pageContainer.find('.addschool').on('click', function () {
            var latitude = pageContainer.find('input[name="latitude"]').val();
            var longitude = pageContainer.find('input[name="longitude"]').val();
            var schoolname = pageContainer.find('input[name="schoolname"]').val();
            var address = pageContainer.find('input[name="address"]').val();
            var website = pageContainer.find('input[name="website"]').val();
            var contact = pageContainer.find('input[name="contact"]').val();
            var image = pageContainer.find('input[name="image"]').val();

              var db = firebase.database();
              var ref = db.ref("schools");
              var newSchool = ref.push();
              newSchool.set({
                latitude: latitude,
                longitude: longitude,
                schoolname: schoolname,
                address: address,
                website: website,
                contact: contact,
                image: image
              });

            showloader();   

            myApp.alert('School Added: ' + schoolname , function () {
              mainView.goBack();
            });

          });
     }



    if (page.name === 'personalitytest') {    
            var user_id = $$('.statusbar-overlay').data('userid');

            var query = firebase.database().ref("personality_test_questions");
            query.once("value")
              .then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                  var key = childSnapshot.key;
                  var childData = childSnapshot.val();
                   // Prepare Data
                    var listHTML = '';
                     listHTML+='<div class="content-block-title">'+childData.qnum+'. '+childData.qname+'</div><div class="list-block"> <ul>';
                     for (var c = 1; c <= 5; c++) {

                        listHTML+='<li><label class="label-radio item-content">';

                        listHTML+=' <input type="radio" name="q'+childData.qnum+'" value="'+c+'"';
                          if (c == 1) {
                             listHTML+= 'checked';
                          }
                        listHTML+='>';
                              
                         listHTML+='<div class="item-media"> <i class="icon icon-form-radio"></i></div><div class="item-inner">';
                         listHTML+= '<div class="item-title">'+c+'</div></div></label></li> ';
                     }    
                    listHTML += '</ul></div>';      

                    listHTML += '';        

                  $$('.questions').append(listHTML);
              });
            });

          $$('.personalitytest-submit').on('click', function(){
                      var formData = myApp.formToJSON('#personality-test-form');
                      var i = 0;
                      var user_exist = [];

                      var ref = firebase.database().ref("personality_test"); //root reference to your data
                      ref.orderByChild('user_id').equalTo(user_id)
                          .once('value').then(function(snapshot) {
                            snapshot.forEach(function(childSnapshot) {
                               ++i;
                                 firebase.database().ref('personality_test/' + childSnapshot.key).set({
                                        answer: formData['q' + i],
                                        user_id:user_id ,
                                        question_number: i
                                    });
                              });

                              showloader();
                              myApp.alert('Personality test answer Updated!', function () {
                                mainView.goBack();
                              });
                      });


                      function userExistsCallback(userId, exists) {
                        if (exists) {
                          console.log('user ' + userId + ' exists!');
                        } else {
                          for (var c = 1; c <= 108; c++) {
                                var db = firebase.database();
                                var ref = db.ref("personality_test");
                                var newPersonalitytestAns = ref.push();
                                newPersonalitytestAns.set({
                                  answer: formData['q' + c],
                                  user_id:userId ,
                                  question_number: c
                                });   
                            }
                           showloader();
                           myApp.alert('Personality test answer submitted!', function () {
                                mainView.goBack();
                              });  
                        }
                      }

                      var ref = firebase.database().ref("personality_test"); 
                      ref.orderByChild('user_id').equalTo(user_id)
                          .once('value').then(function(snapshot) {
                           var exists = (snapshot.val() !== null);
                           userExistsCallback(user_id, exists);
                      });


          }); 
    }

    if (page.name === 'account') {
      var user_id = $$('.statusbar-overlay').data('userid');
      var query = firebase.database().ref("users").orderByKey();
        query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var key = childSnapshot.key;
              var childData = childSnapshot.val();
              if (key == user_id) {
                
                $$('.username').html(childData.username);
                $$('.fullname').html(childData.fullname);
                 mainView.router.loadPage({url:'home.html', ignoreCache:true, reload:true })
                 return true;

              }
          });
        });
    }


    if (page.name === 'disclaimer') {
     
    }

})


// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}