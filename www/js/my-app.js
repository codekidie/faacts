// Initialize your app
var myApp = new Framework7({
    modalTitle:'Facts',
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




setInterval(function(){
      function onOffline() {
         myApp.confirm('We are having difficulties communicating with the server. Please check your internet connection', 'Offline Mode', 
          function () {
            // ok button
            myApp.alert('Please Try Fixing Your Internet Connection');
            mainView.router.loadPage({url:'index.html', ignoreCache:true, reload:true })
             return true;
          },
          function () {
            myApp.alert('Please Try Fixing Your Internet Connection');
            
          }
        );
    }

  document.addEventListener("offline", onOffline, false);
}, 1000);




function showloader()
{
  myApp.showPreloader();
  setTimeout(function () {
      myApp.hidePreloader();
  }, 1000);
}




function fbuserExistsCallback(username,profile_pic,id, exists) {
        if (exists) {
            console.log('user exist');
                var query = firebase.database().ref("users").orderByKey();
                query.once("value")
                  .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                      var key = childSnapshot.key;
                      var childData = childSnapshot.val();
                      if (childData.username == id && childData.password == id) {
                        $$('#profile_name').text(childData.fullname);
                        $$('#profile_image').attr('src',childData.profile_pic);
                        $$('.statusbar-overlay').attr('data-userid', key);

                        function answeredAlreadyCallback(user_id, exists)
                        {

                           if (exists) {
                                $$('.navbar').show();
                                $$('.disablewhenanswered').hide();
                                mainView.router.loadPage({url:'home.html', ignoreCache:true, reload:true })
                                return true;
                                
                            }else{
                                $$('.disablewhenanswered').show();
                                $$('.navbar').show();

                                mainView.router.loadPage({url:'location.html', ignoreCache:true, reload:true })
                                return true;
                            }
                        } 



                       function navCallback(user_id, exists)
                        {
                           if (exists) {
                                  var ref2 = firebase.database().ref("navigator"); //root reference to your data
                                  ref2.orderByChild('user_id').equalTo(user_id)
                                   .once('value').then(function(snapshot2) {
                                       snapshot2.forEach(function(childSnapshot2) {
                                        var key2 = childSnapshot2.key;
                                        var childData2 = childSnapshot2.val();

                                        if (childData2.user_id == user_id) {
                                          

                                                $$('.navbar').show();
                                                $$('.home-logo').hide();
                                                $$('.logo-main').show();
                                                $$('.schools-logo').hide();
                                                $$('.personality-logo').hide();
                                                $$('.aptitude-logo').hide();
                                                $$('.instructions-logo').hide();
                                                $$('.results-logo').hide();
                                                $$('.explore-logo').hide();
                                                $$('.achievements-logo').hide();
                                                $$('.achievements-logo').hide();
                                                $$('.howto-logo').hide();
                                                $$('.inpirational-logo').hide();                                            

                                            $$('.disablewhenanswered').show();
                                            mainView.router.loadPage({url:childData2.page_stoped, ignoreCache:true, reload:true })
                                            return true;
                                        }
                                    });
                                  });
                                
                            }else{
                                
                                    var ref = firebase.database().ref("interpersonal");
                                    ref.orderByChild('user_id').equalTo(key)
                                        .once('value').then(function(snapshot) {
                                         var exists = (snapshot.val() !== null);
                                         answeredAlreadyCallback(key, exists);
                                    });  
                            }
                        } 

                        var ref = firebase.database().ref("navigator");
                        ref.orderByChild('user_id').equalTo(key)
                            .once('value').then(function(snapshot) {
                             var exists = (snapshot.val() !== null);
                             navCallback(key, exists);
                        });  


                      
                      } //End if
                  });
                });

        } else {

                var db = firebase.database();
                var ref = db.ref("users");
                var newUser = ref.push();
                newUser.set({
                  fullname: username,
                  username: id,
                  profile_pic: profile_pic,
                  password: id
                });

                var query = firebase.database().ref("users").orderByKey();
                query.once("value")
                  .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                      var key = childSnapshot.key;
                      var childData = childSnapshot.val();
                      if (childData.username == id && childData.password == id) {
                        $$('#profile_name').text(childData.fullname);
                        $$('#profile_image').attr('src',childData.profile_pic);
                        $$('.statusbar-overlay').attr('data-userid', key);
                         function answeredAlreadyCallback(user_id, exists)
                          {
                             if (exists) {
                                $$('.navbar').show();

                                  $$('.disablewhenanswered').hide();
                                  mainView.router.loadPage({url:'home.html', ignoreCache:true, reload:true })
                                  return true;
                                  
                              }else{
                                $$('.navbar').show();

                                  $$('.disablewhenanswered').show();
                                  mainView.router.loadPage({url:'location.html', ignoreCache:true, reload:true })
                                  return true;
                              }
                          } 

                          function navCallback(user_id, exists)
                          {
                             if (exists) {
                                    var ref2 = firebase.database().ref("navigator"); //root reference to your data
                                    ref2.orderByChild('user_id').equalTo(user_id)
                                     .once('value').then(function(snapshot2) {
                                         snapshot2.forEach(function(childSnapshot2) {
                                          var key2 = childSnapshot2.key;
                                          var childData2 = childSnapshot2.val();

                                          if (childData2.user_id == user_id) {
                                            
                                                $$('.navbar').show();
                                                $$('.home-logo').hide();
                                                $$('.logo-main').show();
                                                $$('.schools-logo').hide();
                                                $$('.personality-logo').hide();
                                                $$('.aptitude-logo').hide();
                                                $$('.instructions-logo').hide();
                                                $$('.results-logo').hide();
                                                $$('.explore-logo').hide();
                                                $$('.achievements-logo').hide();
                                                $$('.achievements-logo').hide();
                                                $$('.howto-logo').hide();
                                                $$('.inpirational-logo').hide();
                                            $$('.disablewhenanswered').show();
                                              mainView.router.loadPage({url:childData2.page_stoped, ignoreCache:true, reload:true })
                                              return true;
                                          }
                                      });
                                    });
                                  
                              }else{
                                  
                                      var ref = firebase.database().ref("interpersonal");
                                      ref.orderByChild('user_id').equalTo(key)
                                          .once('value').then(function(snapshot) {
                                           var exists = (snapshot.val() !== null);
                                           answeredAlreadyCallback(key, exists);
                                      });  
                              }
                          } 

                          var ref = firebase.database().ref("navigator");
                          ref.orderByChild('user_id').equalTo(key)
                              .once('value').then(function(snapshot) {
                               var exists = (snapshot.val() !== null);
                               navCallback(key, exists);
                          });  



                      }
                  });
                });
        }
    }






function navigateLastPage(user_id,page, exists) {
        if (exists) {

            var ref = firebase.database().ref("navigator"); //root reference to your data
            ref.orderByChild('user_id').equalTo(user_id)
             .once('value').then(function(snapshot) {
                 snapshot.forEach(function(childSnapshot) {
                  var key = childSnapshot.key;
                  var childData = childSnapshot.val();
                  if (childData.user_id == user_id) {

                    firebase.database().ref('navigator/'+key).set({
                        user_id: user_id,
                        page_stoped: page
                    });   

                  }
              });
            });
        } else {

                var db = firebase.database();
                var ref = db.ref("navigator");
                var newNav = ref.push();
                newNav.set({
                  user_id: user_id,
                  page_stoped: page
                });
        }
  }





function checkAllAnswered(selector,nextpage,prevpage)
{
    $$('#'+selector).on('click',function(e) {
         e.preventDefault();
          myApp.hidePreloader();
          var all_answered = true;
          $("input:radio").each(function(){
              var name = $(this).attr("name");
              if($("input:radio[name="+name+"]:checked").length == 0)
              {
                  all_answered = false;
              }else{
                  all_answered = true;
              }
          });

          if (all_answered === false) {
            //  0 means not all is answered
              myApp.hidePreloader();
              myApp.confirm('Please Answer All Questions!', 'Some Questions Are Not Yet Answered', 
                function () {
                // Success Event
                    mainView.router.loadPage({url:prevpage, ignoreCache:true, reload:true })
                    return true;
                }
              );
          }else{
               mainView.router.loadPage({url:nextpage, ignoreCache:true, reload:true })
               return true;
          }
    });
}


function allchecked(userid, exists) {
    if (exists) {
      // do nothing
    } else {
      // Insert if not yet in db
      var user_id = $$('.statusbar-overlay').data('userid');
      var db = firebase.database();
      var ref = db.ref("allchecked");
      var allchecked = ref.push('allchecked');
      allchecked.set({
          user_id: user_id,
          answered_all : 1
      });
    }
}


function allcheckedCounter(userid, exists,counter) {
    if (exists) {
          // do nothing
          console.log('allchecked');
          for (var i = 0; i <= counter; i++) {
             if($$('input[name="q'+i+'"]').is(':checked')) { 
                    $$('input[name="q'+i+'"]').prop('disabled',true);
             }else{
                $$('input[name="q'+i+'"][value="A"]').prop('checked',true);
                $$('input[name="q'+i+'"]').prop('disabled',true);

             }
          }
    } 
}




 function initialize() {

    var onSuccess = function(position) {

        function runOnComplete(){
                   var map;
                   var infowindow;
                   var pyrmont = {lat: position.coords.latitude, lng: position.coords.longitude};

                  map = new google.maps.Map(document.getElementById('map_canvas'), {
                    center: pyrmont,
                    zoom: 15
                  });

                  infowindow = new google.maps.InfoWindow();
                  var service = new google.maps.places.PlacesService(map);
                  service.nearbySearch({
                    location: pyrmont,
                    radius: 2500,
                    type: ['university'],
                    photos : [
                      {
                         "height" : 270,
                         "html_attributions" : [],
                         "photo_reference" : "CnRnAAAAF-LjFR1ZV93eawe1cU_3QNMCNmaGkowY7CnOf-kcNmPhNnPEG9W979jOuJJ1sGr75rhD5hqKzjD8vbMbSsRnq_Ni3ZIGfY6hKWmsOf3qHKJInkm4h55lzvLAXJVc-Rr4kI9O1tmIblblUpg2oqoq8RIQRMQJhFsTr5s9haxQ07EQHxoUO0ICubVFGYfJiMUPor1GnIWb5i8",
                         "width" : 519
                      }
                   ],
                  }, callback);

                function callback(results, status) {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                      createMarker(results[i]);
                    }
                  }
                }

                function createMarker(place) {
                  console.log(place);
                  var placeLoc = place.geometry.location;
                  var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                  });

                  google.maps.event.addListener(marker, 'click', function() {
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                  });
                }

        }



        runOnComplete();

    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);


} // End initialize maps


function deleteExplore(key)
{
  $$('#'+key).remove();
  firebase.database().ref("explore").child(key).remove().then(function() {

        myApp.alert('Explore Data Removed Success!', function () {
          mainView.goBack();
        });
  });

}


function deleteAttainment(key)
{
  $$('#'+key).remove();
  console.log(key);
  firebase.database().ref("attainment").child(key).remove().then(function() {

        myApp.alert('Attainment Data Removed Success!', function () {
          mainView.goBack();
        });
  });

}





myApp.onPageInit('index', function() {
  showloader();
  $$('.hideonlogin').hide();
  $$('.navbar').hide();


}).trigger();


$$('.signout').on('click', function () {
  $$('.hideonlogin').hide();
  $$('.navbar').hide();
    showloader();

      firebase.auth().signOut().then(function() {
         mainView.router.loadPage({url:'index.html', ignoreCache:true, reload:true })
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

  $$('#first').on('keyup', function(e) {
     var mEvent = e || window.event;
     var mPressed = mEvent.keyCode || mEvent.which;
     if (mPressed == 13) {
      // On enter, go to next input field
       document.getElementById('second').focus();
     }
    return true;
  });

  $$('#second').on('keyup', function(e) {
     var mEvent = e || window.event;
     var mPressed = mEvent.keyCode || mEvent.which;
     if (mPressed == 13) {
      // On enter, go to next input field
       document.getElementById('third').focus();
     }
    return true;
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
              mainView.router.loadPage({url:'personalitytest.html', ignoreCache:true, reload:true })
              return true;

          }
      });
    });

  });
});



myApp.onPageInit('home', function(page) {
      $$('.hideonlogin').show();
      $$('.navbar').show();
      $$('.home-logo').show();
      $$('.logo-main').hide();
      $$('.schools-logo').hide();
      $$('.personality-logo').hide();
      $$('.aptitude-logo').hide();
      $$('.instructions-logo').hide();
      $$('.results-logo').hide();
      $$('.explore-logo').hide();
      $$('.achievements-logo').hide();
      $$('.achievements-logo').hide();
      $$('.howto-logo').hide();
      $$('.inpirational-logo').hide();


      // This Code will save page navigations
            var user_id = $$('.statusbar-overlay').data('userid');
            var ref = firebase.database().ref("navigator");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 navigateLastPage(user_id,'home.html',exists);
            });
      // end save page navigations


      var ref = firebase.database().ref("retake_timer"); //root reference to your data
      ref.orderByChild('user_id').equalTo(user_id)
       .once('value').then(function(snapshot) {
           snapshot.forEach(function(childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            if (childData.user_id == user_id) {
              $$('#minutes').val(childData.minutes);
              $$('#days').val(childData.days);
              $$('#hours').val(childData.hours);
              $$('#seconds').val(childData.seconds);
            }
        });
      });



});


myApp.onPageInit('instructions', function(page) {
      $$('.hideonlogin').hide();
      $$('.navbar').show();
      $$('.logo-main').hide();
      $$('.schools-logo').hide();
      $$('.personality-logo').hide();
      $$('.aptitude-logo').hide();
      $$('.instructions-logo').show(); 
      $$('.home-logo').hide();
      $$('.explore-logo').hide();
      $$('.achievements-logo').hide();
      $$('.howto-logo').hide();
      $$('.inpirational-logo').hide();

       // This Code will save page navigations
            var user_id = $$('.statusbar-overlay').data('userid');
            var ref = firebase.database().ref("navigator");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 navigateLastPage(user_id,'instructions.html',exists);
            });
      // end save page navigations



});


myApp.onPageInit('personality_instructions', function(page) {
      $$('.hideonlogin').hide();
      $$('.navbar').show();
      $$('.logo-main').hide();
      $$('.schools-logo').hide();
      $$('.personality-logo').show();
      $$('.aptitude-logo').hide();
      $$('.instructions-logo').hide();
      $$('.results-logo').hide();
      $$('.home-logo').hide();
      $$('.explore-logo').hide();
      $$('.achievements-logo').hide();
      $$('.howto-logo').hide();
      $$('.inpirational-logo').hide();

       // This Code will save page navigations
            var user_id = $$('.statusbar-overlay').data('userid');
            var ref = firebase.database().ref("navigator");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 navigateLastPage(user_id,'personality_instructions.html',exists);
            });
      // end save page navigations



});


myApp.onPageInit('aptitude_instructions', function(page) {
      $$('.hideonlogin').hide();
      $$('.navbar').show();
      $$('.logo-main').hide();
      $$('.schools-logo').hide();
      $$('.personality-logo').hide();
      $$('.aptitude-logo').show();
      $$('.instructions-logo').hide();
      $$('.results-logo').hide();
      $$('.home-logo').hide();
      $$('.explore-logo').hide();
      $$('.achievements-logo').hide();
      $$('.howto-logo').hide();
      $$('.inpirational-logo').hide();


      // This Code will save page navigations
            var user_id = $$('.statusbar-overlay').data('userid');
            var ref = firebase.database().ref("navigator");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 navigateLastPage(user_id,'aptitude_instructions.html',exists);
            });
      // end save page navigations


});



myApp.onPageInit('location', function(page) {
      $$('.hideonlogin').hide();
      $$('.home-logo').hide();
      $$('.navbar').show();
      $$('.logo-main').hide();
      $$('.schools-logo').show();
      $$('.personality-logo').hide();
      $$('.aptitude-logo').hide();
      $$('.instructions-logo').hide();
      $$('.results-logo').hide();
      $$('.explore-logo').hide();
      $$('.achievements-logo').hide();
      $$('.howto-logo').hide();
      $$('.inpirational-logo').hide();


      // This Code will save page navigations
        var user_id = $$('.statusbar-overlay').data('userid');
        var ref = firebase.database().ref("navigator");
        ref.orderByChild('user_id').equalTo(user_id)
            .once('value').then(function(snapshot) {
             var exists = (snapshot.val() !== null);
             navigateLastPage(user_id,'location.html',exists);
        });
      // end save page navigations



      function answeredAlreadyCallback(user_id, exists)
      {
       if (exists) {
            $$('.disablewhenanswered').hide();
            
        }else{
            $$('.disablewhenanswered').show();
        }
      } 

      var ref = firebase.database().ref("personality_test");
      ref.orderByChild('user_id').equalTo(user_id)
          .once('value').then(function(snapshot) {
           var exists = (snapshot.val() !== null);
           answeredAlreadyCallback(user_id, exists);
      });  
 
     cordova.plugins.locationAccuracy.canRequest(function(canRequest){
          if(canRequest){
              cordova.plugins.locationAccuracy.request(function (success){
                  console.log("Successfully requested accuracy: "+success.message);
              }, function (error){
                 console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
                 if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                     if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                         cordova.plugins.diagnostic.switchToLocationSettings();
                     }
                 }
              }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
          }
      });

     initialize();
});






function getResult(db,user_id,answer_push_array,answers_array,increment,result_element_progress_id,result_element_total_id)
{
      var query = firebase.database().ref(db).orderByChild('user_id').equalTo(user_id)
                  .once('value').then(function(snapshot) {
                      snapshot.forEach(function(childSnapshot) {

                            var key = childSnapshot.key;

                            var childData = childSnapshot.val();

                            if (childData.user_id == user_id) {

                                 var answer_itter =  answers_array[increment];
                                 var capitalize_answer =  answer_itter.toUpperCase();


                                if(childData.answer === capitalize_answer)
                                {
                                    answer_push_array.push(childData.answer);

                                }

                            }

                          increment++;


                          myApp.setProgressbar(result_element_progress_id,answer_push_array.length, 2);
                          $$(result_element_total_id).html(answer_push_array.length+'%');

                    });
            });
}



$$(document).on('pageInit',function(e){
    var page = e.detail.page;


    if (page.name === 'results') {
      
       // This Code will save page navigations
        var user_id = $$('.statusbar-overlay').data('userid');
        var ref = firebase.database().ref("navigator");
        ref.orderByChild('user_id').equalTo(user_id)
            .once('value').then(function(snapshot) {
             var exists = (snapshot.val() !== null);
             navigateLastPage(user_id,'results.html',exists);
        });
      // end save page navigations
      //  insert to database checked all
        var ref = firebase.database().ref("allchecked");
        ref.orderByChild('user_id').equalTo(user_id)
            .once('value').then(function(snapshot) {
             var exists = (snapshot.val() !== null);
             allchecked(user_id, exists);
        });

      myApp.showPreloader('Generating Results Please Wait....')
      setTimeout(function () {
          myApp.hidePreloader();
      }, 20000);

      //Start Timer 
      var seconds = $$('#seconds').val();
      var minutes =  $$('#minutes').val();
      var days = $$('#days').val();
      var hours = $$('#hours').val();
      calculate();
      function calculate() {
        setTimeout(calculate, 1000);
        
        
         function retakeExistsCallback(userid, exists) {
            if (exists) {
                   // Update cause data exist
                    var user_id = $$('.statusbar-overlay').data('userid');
                    var ref = firebase.database().ref("retake_timer"); //root reference to your data
                    ref.orderByChild('user_id').equalTo(user_id)
                     .once('value').then(function(snapshot) {
                         snapshot.forEach(function(childSnapshot) {
                          var key = childSnapshot.key;
                          var childData = childSnapshot.val();
                          if (childData.user_id == user_id) {

                            firebase.database().ref('retake_timer/'+key).set({
                                user_id: user_id,
                                seconds: seconds,
                                minutes: minutes,
                                days: days,
                                hours: hours,
                            });

                           $$('#showDate').html(' You may retake answering after ' + days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' seconds ');    
                               
                          }
                      });
                    });

            } else {
              // Insert if not yet in db
              var user_id = $$('.statusbar-overlay').data('userid');
              var db = firebase.database();
              var ref = db.ref("retake_timer");
              var newretake_timer = ref.push('retake_timer');
              newretake_timer.set({
                  user_id: user_id,
                  seconds: 60,
                  minutes: 20,
                  days: 180,
                  hours: 12,
              });
            }
        }
        var user_id = $$('.statusbar-overlay').data('userid');

        var ref = firebase.database().ref("retake_timer");
        ref.orderByChild('user_id').equalTo(user_id)
            .once('value').then(function(snapshot) {
             var exists = (snapshot.val() !== null);
             retakeExistsCallback(user_id, exists);
        });


            seconds--;
                  if (seconds < 0) {
                      seconds = 59;
                      minutes--;

                      if (minutes < 0) {
                          hours--;

                          minutes = 59;
                          if (hours < 0) {
                              days--;

                              hours = 23;              
                              if (days < 0) {
                                  days = 0;
                                  hours = 0;
                                  minutes = 0;
                                  seconds = 0;

                              }
                          }
                      }
                  }       
       
      }


      // End Timer
      $$('.hideonlogin').show();
      $$('.home-logo').hide();
      $$('.results-logo').show();
      $$('.navbar').show();
      $$('.logo-main').hide();
      $$('.schools-logo').hide();
      $$('.personality-logo').hide();
      $$('.aptitude-logo').hide();
      $$('.instructions-logo').hide();
      $$('.explore-logo').hide();
      $$('.achievements-logo').hide();
      $$('.howto-logo').hide();
      $$('.inpirational-logo').hide();



      var artistic_total = [];

      var conventional_total = [];

      var enterprising_total = [];

      var investigative_total = [];

      var realistic_total = [];

      var social_total = [];

      var clerical_total = [];

      var interpersonal_total = [];

      var verbal_total = [];

      var numerical_total = [];

      var science_total = [];

      var logical_total = [];

      var entrepreneurship_total = [];

      var mechanical_total = [];

      var i = 0;
      var ci = 0;
      var ii = 0;
      var vi = 0;
      var ni = 0;
      var si = 0;
      var li = 0;
      var ei = 0
      var mi = 0

      myApp.showPreloader();


      var cleric_answers = ["b","d","c","c","d","b","d","a","a","d","c","d","c","b","c","a","b","b","d","c","c","a","c"];

      var interpersonal_answers = ["c","d","c","c","a","a","c","b","c","a"];

      var verbal_answers = ["a","b","b","b","b","a","c","a","b","c","c","b","c","b","c","a","c","b","c","c","b","b","c","b","b","b","a","a","c","d","b","a","c","b","d","b","d","c","c","b","d","b","a","b","c","b","b","d","d","a","c","b","c","b"];

      var numericaltest = ['d','a','c','b','a','b','b','c','c','d','d','d','b','b','b','c','a','b','a','c','c','b','c','a','a','c','a','d','c','a'];

      var sciencetest = ['b','a','c','b','b','b','c','b','c','a','c','d','c','b','a','c','b','d','c','c','d','c','b','b','a','a','d','a','d','b','c'];

      var logical_reasoning_test = ['c','d','a','e','b','e','b','c','b','b','c','d','c','b','d','c','d','c','d','a','a','d','c','c','c','b','b','c','a','b'];


      var entrepreneurship_ans = ['d','c','d','c','d','b','c','a','b','d','a','d','a','d','a'];

      var mechanical = ['b','c','a','c','b','e','b','b','d','c','d','c','a','a','d'];


      getResult('numerical_test',user_id,numerical_total,numericaltest,ni,"#numerical","#numerical_result");

      getResult('science_test',user_id,science_total,sciencetest,si,"#science","#science_result");

      getResult('reasoning_test',user_id,logical_total,logical_reasoning_test,li,"#logical","#logical_result");

      getResult('entrepreneurship_test',user_id,entrepreneurship_total,entrepreneurship_ans,ei,"#entrepreneurship","#entrepreneurship_result");

      getResult('mechanical_test',user_id,mechanical_total,mechanical,mi,"#mechanical","#mechanical_result");

        var query = firebase.database().ref("clerical_test").orderByChild('user_id').equalTo(user_id)

              .once('value').then(function(snapshot) {

                  snapshot.forEach(function(childSnapshot) {
      myApp.hidePreloader();

                        var key = childSnapshot.key;

                        var childData = childSnapshot.val();

                        if (childData.user_id == user_id) {

                             var answer_itter =  cleric_answers[ci];
                             var capitalize_answer =  answer_itter.toUpperCase();


                            if(childData.answer === capitalize_answer)
                            {
                                clerical_total.push(childData.answer);

                            }

                        }

                      ci++;


                      myApp.setProgressbar('#clerical',clerical_total.length, 2);
                      $$('#clerical_result').html(clerical_total.length+'%');

                });
        });


        var query = firebase.database().ref("verbal_test").orderByChild('user_id').equalTo(user_id)
              .once('value').then(function(snapshot) {
                  snapshot.forEach(function(childSnapshot) {

                        var key = childSnapshot.key;

                        var childData = childSnapshot.val();

                        if (childData.user_id == user_id) {

                             var answer_itter =  verbal_answers[vi];
                             var capitalize_answer =  answer_itter.toUpperCase();


                            if(childData.answer === capitalize_answer)
                            {
                                verbal_total.push(childData.answer);

                            }

                        }

                      vi++;


                      myApp.setProgressbar('#verbal',verbal_total.length, 2);
                      $$('#verbal_result').html(verbal_total.length+'%');

                });
        });

          var query = firebase.database().ref("interpersonal_test").orderByChild('user_id').equalTo(user_id)
              .once('value').then(function(snapshot) {
                  snapshot.forEach(function(childSnapshot) {

                        var key = childSnapshot.key;

                        var childData = childSnapshot.val();

                        if (childData.user_id == user_id) {

                             var answer_itter =  interpersonal_answers[ii];
                             var capitalize_answer =  answer_itter.toUpperCase();


                            if(childData.answer === capitalize_answer)
                            {
                                interpersonal_total.push(childData.answer);

                            }

                        }

                      ii++;


                      myApp.setProgressbar('#interpersonal',interpersonal_total.length, 2);
                      $$('#interpersonal_result').html(interpersonal_total.length+'%');

                });
        });






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


     function questionExistsCallback(userId, exists,dbname) {
          if (exists) {
               var query = firebase.database().ref(dbname).orderByKey();
                query.once("value")
                  .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                      var key = childSnapshot.key;
                      var childData = childSnapshot.val();
                      if (childData.user_id == userId) {
                        var answer = childData.answer;
                        var qnumber = childData.question_number;
                        // $$('input[name="q'+qnumber+'"]').prop('disabled',true);
                        $$('input[name="q'+qnumber+'"][value="'+answer+'"]').prop('checked',true);
                      }
                  });
                });
          }
      } 


       function questionClickExistsCallback(userId,qnum,answer, exists,dbname) {
          if (exists) {
               var query = firebase.database().ref(dbname).orderByKey();
                query.once("value")
                  .then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                      var key = childSnapshot.key;
                      var childData = childSnapshot.val();
                      if (childData.user_id == userId && childData.question_number == qnum) {
                         firebase.database().ref(dbname+'/'+key).set({
                              answer: answer,
                              user_id:userId ,
                              question_number: qnum
                          }); 
                        
                          $$('input[name="q'+qnum+'"][value="'+answer+'"]').prop('checked',true);
                      }
                  });
                });
          }else{
                    var db = firebase.database();
                    var ref = db.ref(dbname);
                    var newPersonalitytestAns = ref.push();
                    newPersonalitytestAns.set({
                      answer: answer,
                      user_id:userId ,
                      question_number: qnum
                    });
                    $$('input[name="q'+qnum+'"][value="'+answer+'"]').prop('checked',true);

          }
      }       



        


     if (page.name === 'verbaltest') {
                   var pageContainer = $$(page.container);

                    // This Code will save page navigations
                      var user_id = $$('.statusbar-overlay').data('userid');
                      var ref = firebase.database().ref("navigator");
                      ref.orderByChild('user_id').equalTo(user_id)
                          .once('value').then(function(snapshot) {
                           var exists = (snapshot.val() !== null);
                           navigateLastPage(user_id,'verbaltest.html',exists);
                      });
                    // end save page navigations

                    var ref = firebase.database().ref("allchecked");
                    ref.orderByChild('user_id').equalTo(user_id)
                        .once('value').then(function(snapshot) {
                         var exists = (snapshot.val() !== null);
                         allcheckedCounter(user_id, exists,55); 
                    }); 

                    var ref = firebase.database().ref("verbal_test");
                    ref.orderByChild('user_id').equalTo(user_id)
                        .once('value').then(function(snapshot) {
                         var exists = (snapshot.val() !== null);
                       questionExistsCallback(user_id, exists,'verbal_test');
                    });  

                    
                     for (var i = 0; i <= 55; i++) {
                      $$('input[type="radio"][name="q'+i+'"]').attr("data-qnum",i);
                      $$('input[type="radio"][name="q'+i+'"]').on('change',function(e) {
                          var answer = this.value;
                          var qnum = $$(this).attr('data-qnum');
                          var db = firebase.database();
                          var ref = db.ref("verbal_test");
                          var newPersonalitytestAns = ref.push();
                          newPersonalitytestAns.set({
                            answer: answer,
                            user_id:user_id ,
                            question_number: qnum
                          });

                        var ref = firebase.database().ref("verbal_test");
                        ref.orderByChild('user_id').equalTo(user_id)
                            .once('value').then(function(snapshot) {
                             var exists = (snapshot.val() !== null);
                             questionClickExistsCallback(user_id,qnum,answer, exists,'verbal_test')
                        });  
                                         
                        // myApp.alert('Verbal test answer Updated!', function () {});
                               
                      });  // End on click looping  
                  }  // End 55 Looping

                checkAllAnswered('numericaltest','numericaltest.html','verbaltest.html');

    }

    if (page.name === 'sciencetest') {
          var pageContainer = $$(page.container);
          
           // This Code will save page navigations
            var user_id = $$('.statusbar-overlay').data('userid');
            var ref = firebase.database().ref("navigator");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 navigateLastPage(user_id,'sciencetest.html',exists);
            });
          // end save page navigations

        var ref = firebase.database().ref("allchecked");
        ref.orderByChild('user_id').equalTo(user_id)
            .once('value').then(function(snapshot) {
             var exists = (snapshot.val() !== null);
             allcheckedCounter(user_id, exists,30); 
        }); 

          var ref = firebase.database().ref("science_test");
          ref.orderByChild('user_id').equalTo(user_id)
              .once('value').then(function(snapshot) {
               var exists = (snapshot.val() !== null);
             questionExistsCallback(user_id, exists,'science_test');
          });  

            for (var i = 0; i <= 30; i++) {
                $$('input[type="radio"][name="q'+i+'"]').attr("data-qnum",i);
                $$('input[type="radio"][name="q'+i+'"]').on('change',function(e) {
                    var answer = this.value;
                    var qnum = $$(this).attr('data-qnum');
                    var db = firebase.database();
                    var ref = db.ref("science_test");
                    var newPersonalitytestAns = ref.push();
                    newPersonalitytestAns.set({
                      answer: answer,
                      user_id:user_id ,
                      question_number: qnum
                    });

                  var ref = firebase.database().ref("science_test");
                  ref.orderByChild('user_id').equalTo(user_id)
                      .once('value').then(function(snapshot) {
                       var exists = (snapshot.val() !== null);
                       questionClickExistsCallback(user_id,qnum,answer, exists,'science_test')
                  });  
                                   
                  // myApp.alert('Science test test answer Updated!', function () {});
                         
                });  // End on click looping  
            }  // End 30 Looping

          checkAllAnswered('clerical','clerical.html','sciencetest.html');
                  
    }
   
    if (page.name === 'mechanical') {
          var pageContainer = $$(page.container);

          // This Code will save page navigations
            var user_id = $$('.statusbar-overlay').data('userid');
            var ref = firebase.database().ref("navigator");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 navigateLastPage(user_id,'mechanical.html',exists);
            });
          // end save page navigations
          
          var ref = firebase.database().ref("allchecked");
          ref.orderByChild('user_id').equalTo(user_id)
              .once('value').then(function(snapshot) {
               var exists = (snapshot.val() !== null);
               allcheckedCounter(user_id, exists,15); 
          }); 


          var user_id = $$('.statusbar-overlay').data('userid');
          var ref = firebase.database().ref("mechanical_test");
          ref.orderByChild('user_id').equalTo(user_id)
              .once('value').then(function(snapshot) {
               var exists = (snapshot.val() !== null);
             questionExistsCallback(user_id, exists,'mechanical_test');
          });        
          
          for (var i = 0; i <= 15; i++) {
                $$('input[type="radio"][name="q'+i+'"]').attr("data-qnum",i);
                $$('input[type="radio"][name="q'+i+'"]').on('change',function(e) {
                    var answer = this.value;
                    var qnum = $$(this).attr('data-qnum');
                    

                  var ref = firebase.database().ref("mechanical_test");
                  ref.orderByChild('user_id').equalTo(user_id)
                      .once('value').then(function(snapshot) {
                       var exists = (snapshot.val() !== null);
                       questionClickExistsCallback(user_id,qnum,answer, exists,'mechanical_test');
                  });  
                                   
                  // myApp.alert('Mechanical test answer Updated!', function () {});
                         
                });  // End on click looping  
            }  // End 15 Looping  
             checkAllAnswered('interpersonal','interpersonal.html','mechanical.html');

    }
   
    if (page.name === 'entrepreneurship') {
          var pageContainer = $$(page.container);
          // This Code will save page navigations
            var user_id = $$('.statusbar-overlay').data('userid');
            var ref = firebase.database().ref("navigator");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 navigateLastPage(user_id,'entrepreneurship.html',exists);
            });
          // end save page navigations
          
                var ref = firebase.database().ref("allchecked");
                ref.orderByChild('user_id').equalTo(user_id)
                    .once('value').then(function(snapshot) {
                     var exists = (snapshot.val() !== null);
                     allcheckedCounter(user_id, exists,15); 
                }); 

                var user_id = $$('.statusbar-overlay').data('userid');
                var ref = firebase.database().ref("entrepreneurship_test");
                ref.orderByChild('user_id').equalTo(user_id)
                    .once('value').then(function(snapshot) {
                     var exists = (snapshot.val() !== null);
                   questionExistsCallback(user_id, exists,'entrepreneurship_test');
                });  

                
                for (var i = 0; i <= 15; i++) {
                    $$('input[type="radio"][name="q'+i+'"]').attr("data-qnum",i);
                    $$('input[type="radio"][name="q'+i+'"]').on('change',function(e) {
                        var answer = this.value;
                        var qnum = $$(this).attr('data-qnum');
                        var db = firebase.database();
                        var ref = db.ref("entrepreneurship_test");
                        var newPersonalitytestAns = ref.push();
                        newPersonalitytestAns.set({
                          answer: answer,
                          user_id:user_id ,
                          question_number: qnum
                        });

                      var ref = firebase.database().ref("entrepreneurship_test");
                      ref.orderByChild('user_id').equalTo(user_id)
                          .once('value').then(function(snapshot) {
                           var exists = (snapshot.val() !== null);
                           questionClickExistsCallback(user_id,qnum,answer, exists,'entrepreneurship_test');
                      });  
                                       
                      // myApp.alert('Entrepreneurship test answer Updated!', function () {});
                             
                    });  // End on click looping  
                }  // End 15 Looping      
          
          checkAllAnswered('reasoning','reasoning.html','entrepreneurship.html');
    }
    
    if (page.name === 'clerical') {
          var pageContainer = $$(page.container);

          // This Code will save page navigations
            var user_id = $$('.statusbar-overlay').data('userid');
            var ref = firebase.database().ref("navigator");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 navigateLastPage(user_id,'clerical.html',exists);
            });
          // end save page navigations
          
            var ref = firebase.database().ref("allchecked");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 allcheckedCounter(user_id, exists,30); 
            }); 

          var ref = firebase.database().ref("clerical_test");
          ref.orderByChild('user_id').equalTo(user_id)
              .once('value').then(function(snapshot) {
               var exists = (snapshot.val() !== null);
             questionExistsCallback(user_id, exists,'clerical_test');
          });  

            for (var i = 0; i <= 30; i++) {
                $$('input[type="radio"][name="q'+i+'"]').attr("data-qnum",i);
                $$('input[type="radio"][name="q'+i+'"]').on('change',function(e) {
                    var answer = this.value;
                    var qnum = $$(this).attr('data-qnum');
                    var db = firebase.database();
                    var ref = db.ref("clerical_test");
                    var newPersonalitytestAns = ref.push();
                    newPersonalitytestAns.set({
                      answer: answer,
                      user_id:user_id ,
                      question_number: qnum
                    });

                  var ref = firebase.database().ref("clerical_test");
                  ref.orderByChild('user_id').equalTo(user_id)
                      .once('value').then(function(snapshot) {
                       var exists = (snapshot.val() !== null);
                       questionClickExistsCallback(user_id,qnum,answer, exists,'clerical_test');

                  });  
                                   
                  // myApp.alert('Clerical test answer Updated!', function () {});
                         
                });  // End on click looping  
            }  // End 30 Looping

            checkAllAnswered('entrepreneurship','entrepreneurship.html','clerical.html');
    }
    
    if (page.name === 'interpersonal') {
          var pageContainer = $$(page.container);
          // This Code will save page navigations
            var user_id = $$('.statusbar-overlay').data('userid');
            var ref = firebase.database().ref("navigator");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 navigateLastPage(user_id,'interpersonal.html',exists);
            });
          // end save page navigations

           var ref = firebase.database().ref("allchecked");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 allcheckedCounter(user_id, exists,10); 
            });  

          var ref = firebase.database().ref("interpersonal_test");
          ref.orderByChild('user_id').equalTo(user_id)
              .once('value').then(function(snapshot) {
               var exists = (snapshot.val() !== null);
             questionExistsCallback(user_id, exists,'interpersonal_test');
          });  
          
          for (var i = 0; i <= 10; i++) {
                $$('input[type="radio"][name="q'+i+'"]').attr("data-qnum",i);
                $$('input[type="radio"][name="q'+i+'"]').on('change',function(e) {
                    var answer = this.value;
                    var qnum = $$(this).attr('data-qnum');
                    var db = firebase.database();
                    var ref = db.ref("interpersonal_test");
                    var newPersonalitytestAns = ref.push();
                    newPersonalitytestAns.set({
                      answer: answer,
                      user_id:user_id ,
                      question_number: qnum
                    });

                  var ref = firebase.database().ref("interpersonal_test");
                  ref.orderByChild('user_id').equalTo(user_id)
                      .once('value').then(function(snapshot) {
                       var exists = (snapshot.val() !== null);
                       questionClickExistsCallback(user_id,qnum,answer, exists,'interpersonal_test');
                  });  
                                   
                  // myApp.alert('interpersonal test answer Updated!', function () {});
                         
                });  // End on click looping  
            }  // End 15 Looping  

            checkAllAnswered('results','results.html','interpersonal.html');


    }
    
    if (page.name === 'reasoning') {
          var pageContainer = $$(page.container);
            // This Code will save page navigations
            var user_id = $$('.statusbar-overlay').data('userid');
            var ref = firebase.database().ref("navigator");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 navigateLastPage(user_id,'reasoning.html',exists);
            });
          // end save page navigations
            
              var ref = firebase.database().ref("allchecked");
              ref.orderByChild('user_id').equalTo(user_id)
                  .once('value').then(function(snapshot) {
                   var exists = (snapshot.val() !== null);
                   allcheckedCounter(user_id, exists,30); 
              });  

                var user_id = $$('.statusbar-overlay').data('userid');
                var ref = firebase.database().ref("reasoning_test");
                ref.orderByChild('user_id').equalTo(user_id)
                    .once('value').then(function(snapshot) {
                     var exists = (snapshot.val() !== null);
                   questionExistsCallback(user_id, exists,'reasoning_test');
                });  

                 for (var i = 0; i <= 30; i++) {
                    $$('input[type="radio"][name="q'+i+'"]').attr("data-qnum",i);
                    $$('input[type="radio"][name="q'+i+'"]').on('change',function(e) {
                        var answer = this.value;
                        var qnum = $$(this).attr('data-qnum');
                        var db = firebase.database();
                        var ref = db.ref("reasoning_test");
                        var newPersonalitytestAns = ref.push();
                        newPersonalitytestAns.set({
                          answer: answer,
                          user_id:user_id ,
                          question_number: qnum
                        });

                      var ref = firebase.database().ref("reasoning_test");
                      ref.orderByChild('user_id').equalTo(user_id)
                          .once('value').then(function(snapshot) {
                           var exists = (snapshot.val() !== null);
                           questionClickExistsCallback(user_id,qnum,answer, exists,'reasoning_test');
                      });  
                                       
                      // myApp.alert('Reasoning test answer Updated!', function () {});
                             
                    });  // End on click looping  
                }  // End 30 Looping     
          
          checkAllAnswered('mechanical','mechanical.html','reasoning.html');
          
    }

    if (page.name === 'numericaltest') {
                  var pageContainer = $$(page.container);
                  // This Code will save page navigations
                    var user_id = $$('.statusbar-overlay').data('userid');
                    var ref = firebase.database().ref("navigator");
                    ref.orderByChild('user_id').equalTo(user_id)
                        .once('value').then(function(snapshot) {
                         var exists = (snapshot.val() !== null);
                         navigateLastPage(user_id,'numericaltest.html',exists);
                    });
                  // end save page navigations

                  var ref = firebase.database().ref("allchecked");
                  ref.orderByChild('user_id').equalTo(user_id)
                      .once('value').then(function(snapshot) {
                       var exists = (snapshot.val() !== null);
                       allcheckedCounter(user_id, exists,30); 
                  });   

                  var ref = firebase.database().ref("numerical_test");
                  ref.orderByChild('user_id').equalTo(user_id)
                      .once('value').then(function(snapshot) {
                       var exists = (snapshot.val() !== null);
                     questionExistsCallback(user_id, exists,'numerical_test');
                  });  



               for (var i = 0; i <= 30; i++) {
                      $$('input[type="radio"][name="q'+i+'"]').attr("data-qnum",i);
                      $$('input[type="radio"][name="q'+i+'"]').on('change',function(e) {
                          var answer = this.value;
                          var qnum = $$(this).attr('data-qnum');
                          var db = firebase.database();
                          var ref = db.ref("numerical_test");
                          var newPersonalitytestAns = ref.push();
                          newPersonalitytestAns.set({
                            answer: answer,
                            user_id:user_id ,
                            question_number: qnum
                          });

                        var ref = firebase.database().ref("numerical_test");
                        ref.orderByChild('user_id').equalTo(user_id)
                            .once('value').then(function(snapshot) {
                             var exists = (snapshot.val() !== null);
                             questionClickExistsCallback(user_id,qnum,answer, exists,'numerical_test');
                        });  
                                         
                        // myApp.alert('Numerical test answer Updated!', function () {});
                               
                      });  // End on click looping  
                  }  // End 30 Looping

                  checkAllAnswered('sciencetest','sciencetest.html','numericaltest.html');
                  

    }

    

    function answerExistsCallback(userId, exists) {
        if (exists) {
             var query = firebase.database().ref("personality_test").orderByKey();
              query.once("value")
                .then(function(snapshot) {
                  snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if (childData.user_id == userId) {
                      var answer = childData.answer;
                      var qnumber = childData.question_number;
                        // $$('input[name="q'+qnumber+'"]').prop('disabled',true);
                        $$('input[name="q'+qnumber+'"][value="'+answer+'"]').prop('checked',true);
                    }
                });
              });
        }
    }   


    function answerClickExistsCallback(userId,qnum,answer, exists) {
        if (exists) {
             var query = firebase.database().ref("personality_test").orderByKey();
              query.once("value")
                .then(function(snapshot) {
                  snapshot.forEach(function(childSnapshot) {
                    var key = childSnapshot.key;
                    var childData = childSnapshot.val();
                    if (childData.user_id == userId && childData.question_number == qnum) {

                       firebase.database().ref('personality_test/'+key).set({
                            answer: answer,
                            user_id:userId ,
                            question_number: qnum
                        });   
                        // $$('input[name="q'+qnumber+'"]').prop('disabled',true);
                        $$('input[name="q'+qnum+'"][value="'+answer+'"]').prop('checked',true);
                    }
                });
              });
        }
    }   

    if (page.name === 'personalitytest') {
             // This Code will save page navigations
              var user_id = $$('.statusbar-overlay').data('userid');
              var ref = firebase.database().ref("navigator");
              ref.orderByChild('user_id').equalTo(user_id)
                  .once('value').then(function(snapshot) {
                   var exists = (snapshot.val() !== null);
                   navigateLastPage(user_id,'personalitytest.html',exists);
              });
            // end save page navigations

                var ref = firebase.database().ref("allchecked");
                ref.orderByChild('user_id').equalTo(user_id)
                    .once('value').then(function(snapshot) {
                     var exists = (snapshot.val() !== null);
                     allcheckedCounter(user_id, exists,108); 
                });
               

                
                $$('.person1tag').hide();
                $$('#eng').on('click', function () {
                    $$('.person1tag').hide();
                    $$('.person1eng').show();
                     myApp.alert('Successfully Translated To English!', function () {});

                });

                $$('#tag').on('click', function () {
                    $$('.person1tag').show();
                    $$('.person1eng').hide();
                     myApp.alert('Successfully Translated To Tagalog!', function () {});
                });

              var ref = firebase.database().ref("personality_test");
              ref.orderByChild('user_id').equalTo(user_id)
                  .once('value').then(function(snapshot) {
                   var exists = (snapshot.val() !== null);
                   answerExistsCallback(user_id, exists);
              });



                for (var i = 0; i <= 108; i++) {
                   $$('input[type="radio"][name="q'+i+'"]').attr("data-qnum",i);
                       
                      $$('input[type="radio"][name="q'+i+'"]').on('change',function(e) {
                          var answer = this.value;
                          var qnum = $$(this).attr('data-qnum');
                          var db = firebase.database();
                          var ref = db.ref("personality_test");
                          var newPersonalitytestAns = ref.push();
                          newPersonalitytestAns.set({
                            answer: answer,
                            user_id:user_id ,
                            question_number: qnum
                          });

                        var ref = firebase.database().ref("personality_test");
                        ref.orderByChild('user_id').equalTo(user_id)
                            .once('value').then(function(snapshot) {
                             var exists = (snapshot.val() !== null);
                             answerClickExistsCallback(user_id, qnum, answer, exists);
                        });  
                               
                      });  // End on click looping  
                  }  // End 108 Looping

                 checkAllAnswered('personalitytest','aptitude_instructions.html','personalitytest.html');
                     
              

                  
    }

    if (page.name === 'account') {
      // This Code will save page navigations
        var user_id = $$('.statusbar-overlay').data('userid');
        var ref = firebase.database().ref("navigator");
        ref.orderByChild('user_id').equalTo(user_id)
            .once('value').then(function(snapshot) {
             var exists = (snapshot.val() !== null);
             navigateLastPage(user_id,'personalitytest.html',exists);
        });
      // end save page navigations
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
        // This Code will save page navigations
        var user_id = $$('.statusbar-overlay').data('userid');
        var ref = firebase.database().ref("navigator");
        ref.orderByChild('user_id').equalTo(user_id)
            .once('value').then(function(snapshot) {
             var exists = (snapshot.val() !== null);
             navigateLastPage(user_id,'disclaimer.html',exists);
        });
      // end save page navigations
    }

    if (page.name === 'howto') {
          $$('.hideonlogin').show();
          $$('.home-logo').hide();
          $$('.navbar').show();
          $$('.logo-main').hide();
          $$('.schools-logo').hide();
          $$('.personality-logo').hide();
          $$('.aptitude-logo').hide();
          $$('.instructions-logo').hide();
          $$('.results-logo').hide();
          $$('.explore-logo').hide();
          $$('.achievements-logo').hide();
          $$('.howto-logo').show();
          $$('.inpirational-logo').hide();

           // This Code will save page navigations
            var user_id = $$('.statusbar-overlay').data('userid');
            var ref = firebase.database().ref("navigator");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 navigateLastPage(user_id,'howto.html',exists);
            });
          // end save page navigations

    }

      if (page.name === 'inspirational') {
          $$('.hideonlogin').show();
          $$('.home-logo').hide();
          $$('.navbar').show();
          $$('.logo-main').hide();
          $$('.schools-logo').hide();
          $$('.personality-logo').hide();
          $$('.aptitude-logo').hide();
          $$('.instructions-logo').hide();
          $$('.results-logo').hide();
          $$('.explore-logo').hide();
          $$('.achievements-logo').hide();
          $$('.howto-logo').hide();
          $$('.inpirational-logo').show();

           // This Code will save page navigations
            var user_id = $$('.statusbar-overlay').data('userid');
            var ref = firebase.database().ref("navigator");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 navigateLastPage(user_id,'inspirational.html',exists);
            });
          // end save page navigations

    }



    if (page.name === 'achievements') {
        $$('.hideonlogin').show();
        $$('.home-logo').hide();
        $$('.navbar').show();
        $$('.logo-main').hide();
        $$('.schools-logo').hide();
        $$('.personality-logo').hide();
        $$('.aptitude-logo').hide();
        $$('.instructions-logo').hide();
        $$('.results-logo').hide();
        $$('.explore-logo').hide();
        $$('.achievements-logo').show();
        $$('.howto-logo').hide();
        $$('.inpirational-logo').hide();

          // This Code will save page navigations
            var user_id = $$('.statusbar-overlay').data('userid');
            var ref = firebase.database().ref("navigator");
            ref.orderByChild('user_id').equalTo(user_id)
                .once('value').then(function(snapshot) {
                 var exists = (snapshot.val() !== null);
                 navigateLastPage(user_id,'achievements.html',exists);
            });
          // end save page navigations


        var content_result_data = '';
        var user_id = $$('.statusbar-overlay').data('userid');
        var query = firebase.database().ref("attainment").orderByChild('userid').equalTo(user_id).once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                            var key = childSnapshot.key;
                            var childData = childSnapshot.val();
                            if (childData.userid == user_id) {
                                content_result_data += '<div style="border-radius:5px;margin:5px;background: #86d7fd;padding:5px;" id="'+key+'"><h3 style="margin: 0px !important;color:#090;">*'+childData.school+'* <span style="float:right;background:#e775f9;padding:3px;color:#fff;"><a href="#" onClick="deleteAttainment(\''+key+'\')" style="color:#fff !important;">x</a></span></h3><h4 style="margin: 0px !important;color:#1c0d9a !important;">'+childData.sy+'</h4><p>'+childData.attainment+'</p></div>';
                            }
                            
                            $$('#attainmentResultsData').html(content_result_data);

                    });
            }); 

        var content_result_data_award = '';
        var user_id = $$('.statusbar-overlay').data('userid');
        var query = firebase.database().ref("awards").orderByChild('userid').equalTo(user_id).once('value').then(function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                            var key = childSnapshot.key;
                            var childData = childSnapshot.val();
                            if (childData.userid == user_id) {
                                content_result_data_award += '<div style="border-radius:5px;margin:5px;background: #86d7fd;padding:5px;" id="'+key+'"><h3 style="margin: 0px !important;color:#090;">*'+childData.award+'* <span style="float:right;background:#e775f9;padding:3px;color:#fff;"><a href="#" onClick="deleteAwards(\''+key+'\')" style="color:#fff !important;">x</a></span></h3><h4 style="margin: 0px !important;color:#1c0d9a !important;">'+childData.year+'</h4></div>';
                            }
                            
                            $$('#awardsResultsData').html(content_result_data_award);

                    });
            }); 


          $$('.addachievement').on('click', function () {
 
                  myApp.modal({
                    title:  'Achievement Menu',
                    text: '<div style="padding:10px 10px;margin-top:10px;background:#3eccfd;color:#fff;"> <button class="attainmentbtn" style="width:80%;padding:5px;font-size:16px;margin-top: 10px;margin-left: 25px;margin-bottom: 10px;">Educational Attainment</button> <br> <button class="awardsbtn" style="width:80%;padding:5px;font-size:16px;margin-top: 10px;margin-left: 25px;margin-bottom: 10px;">Awards and Certificates</button> </div>',
                    buttons: [
                      {
                        text: 'Close',
                        onClick: function() {
                          
                        }
                      },
                    ]
                  })

                  $$('.attainmentbtn').on('click', function () {
                        myApp.closeModal();
                        myApp.modal({
                          title:  'Educational Attainment',
                          text: '<div style="padding:10px 10px;margin-top:10px;background:#3eccfd;color:#fff;"><select id="attainment" style="width:80%;margin-left: 20px;font-size: 16px;"><option>Tertiary</option><option>Secondary</option><option>Elementary</option></select> <br> <textarea id="school" placeholder="School" style="width:80%;margin-left: 20px;font-size: 16px;margin-top:5px;"></textarea> <br> <input type="text" style="width:80%;margin-left: 20px;font-size: 16px;" id="sy" placeholder="School Year"></div>',
                          buttons: [
                            {
                              text: 'Close',
                              onClick: function() {
                                
                              }
                            },{
                              text: 'Add',
                              onClick: function() {

                                    var user_id = $$('.statusbar-overlay').data('userid');
                                    var attainment =  $$('#attainment').val();
                                    var school      =  $$('#school').val();
                                    var sy          =  $$('#sy').val();

                                    var db = firebase.database();
                                    var ref = db.ref("attainment");
                                    var newAttainment = ref.push();
                                    newAttainment.set({
                                        school      : school,
                                        attainment : attainment,
                                        sy          : sy,
                                        userid      : user_id
                                    });

                                    var content_result_data = '';
                                    var query = firebase.database().ref("attainment").orderByChild('userid').equalTo(user_id).once('value').then(function(snapshot) {
                                          snapshot.forEach(function(childSnapshot) {
                                                        var key = childSnapshot.key;
                                                        var childData = childSnapshot.val();
                                                        if (childData.userid == user_id) {
                                                            content_result_data += '<div style="border-radius:5px;margin:5px;background: #86d7fd;padding:5px;" id="'+key+'"><h3 style="margin: 0px !important;color:#090;">*'+childData.school+'* <span style="float:right;background:#e775f9;padding:3px;color:#fff;"><a href="#" onClick="deleteExplore(\''+key+'\')" style="color:#fff !important;">x</a></span></h3><h4 style="margin: 0px !important;color:#1c0d9a !important;">'+childData.sy+'</h4><p>'+childData.attainment+'</p></div>';
                                                        }
                                                        
                                                        $$('#attainmentResultsData').html(content_result_data);

                                                });
                                        }); 

                                    myApp.alert('Attainment Added Success!', function () {
                                      mainView.goBack();
                                    });

                              }
                            }  
                          ]
                        })
                  });  


                  $$('.awardsbtn').on('click', function () {
                        myApp.closeModal();
                        myApp.modal({
                          title:  'Awards & Certificates',
                          text: '<div style="padding:10px 10px;margin-top:10px;background:#3eccfd;color:#fff;"> <br> <textarea id="award" placeholder="Awards" style="width:80%;margin-left: 20px;font-size: 16px;margin-top:5px;"></textarea> <br> <input type="text" style="width:80%;margin-left: 20px;font-size: 16px;" id="year" placeholder="Year"></div>',
                          buttons: [
                            {
                              text: 'Close',
                              onClick: function() {
                                
                              }
                            },{
                                text: 'Add',
                                onClick: function() {
                                    var user_id = $$('.statusbar-overlay').data('userid');
                                    var award =  $$('#award').val();
                                    var year   =  $$('#year').val();
                                    var db = firebase.database();
                                    var ref = db.ref("awards");
                                    var newAwards = ref.push();
                                    newAwards.set({
                                      award: award,
                                      year: year,
                                      userid: user_id 
                                    });


                                    var content_result_data = '';
                                    var query = firebase.database().ref("awards").orderByChild('userid').equalTo(user_id).once('value').then(function(snapshot) {
                                          snapshot.forEach(function(childSnapshot) {
                                                        var key = childSnapshot.key;
                                                        var childData = childSnapshot.val();
                                                        if (childData.userid == user_id) {
                                                            content_result_data += '<div style="border-radius:5px;margin:5px;background: #86d7fd;padding:5px;" id="'+key+'"><h3 style="margin: 0px !important;color:#090;">*'+childData.award+'* <span style="float:right;background:#e775f9;padding:3px;color:#fff;"><a href="#" onClick="deleteAwards(\''+key+'\')" style="color:#fff !important;">x</a></span></h3><h4 style="margin: 0px !important;color:#1c0d9a !important;">'+childData.year+'</h4></div>';
                                                        }
                                                        
                                                        $$('#awardsResultsData').html(content_result_data);

                                                });
                                        }); 

                                    myApp.alert('Awards Added Success!', function () {
                                      mainView.goBack();
                                    });
                                  
                                }
                              }
                          ]
                        })
                  });  
        });
    }    

    if (page.name === 'explore') {
      $$('.hideonlogin').show();
      $$('.home-logo').hide();
      $$('.navbar').show();
      $$('.logo-main').hide();
      $$('.schools-logo').hide();
      $$('.personality-logo').hide();
      $$('.aptitude-logo').hide();
      $$('.instructions-logo').hide();
      $$('.results-logo').hide();
      $$('.explore-logo').show();
      $$('.howto-logo').hide();
      $$('.inpirational-logo').hide();
       // This Code will save page navigations
          var user_id = $$('.statusbar-overlay').data('userid');
          var ref = firebase.database().ref("navigator");
          ref.orderByChild('user_id').equalTo(user_id)
              .once('value').then(function(snapshot) {
               var exists = (snapshot.val() !== null);
               navigateLastPage(user_id,'explore.html',exists);
          });
        // end save page navigations

      var result_array = [];

      var content_result_data = '';
      
      $$('.compare').on('click', function () {
      var sum_result = [];

       firebase.database().ref("explore").orderByChild('user_id').equalTo(user_id).once('value').then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
                        var key = childSnapshot.key;
                        var childData = childSnapshot.val();

                        if (childData.user_id == user_id) {
                            
                            content_result_data+=childData;
                            result_array.push({
                                  ventures_data    : childData.ventures_data,
                                  user_id          : childData.user_id,
                                  career_data      : childData.career_data,
                                  description_data : childData.description_data,
                                  demand           : childData.demand,
                                  pay              : childData.pay,
                                  convenience      : childData.convenience,
                                  skills           : childData.skills,
                                  like             : childData.like
                            });

                            var total_result = Number(childData.like) + Number(childData.skills) + Number(childData.convenience) + Number(childData.pay) + Number(childData.demand);

                            var new_arr = [total_result,childData.ventures_data,childData.career_data,childData.description_data];

                            sum_result.push(new_arr);

                        
                        }
                });

                sum_result.sort(function(a, b) {
                    return parseFloat(a[0]) - parseFloat(b[0]);
                });

                sum_result.reverse();

                console.log(sum_result);
                  myApp.modal({
                    title:  'Compared Results',
                    text: '<div style="padding:10px 10px;background:#cccccc;color:#000;"><p>The first career result is the career which is favorable to you, base on your own research and exploration you made on those careers you choose.</p></div><div style="background:#86d7fe;padding:5px;"><h4 style="margin: 0px !important;color:#2e39b0;">1. '+sum_result[0][2]+'</h4></div><div style="background:#40cdfd;padding:5px;"><h4 style="margin: 0px !important;color:#2e39b0;">2. '+sum_result[1][2]+'</h4></div><div style="background:#86d7fe;padding:5px;"><h4 style="margin: 0px !important;color:#2e39b0;">3. '+sum_result[2][2]+'</h4></div>',
                    buttons: [
                      {
                        text: 'Done',
                        onClick: function() {
                          
                        }
                      },
                    ]
                  })
                });

        });
  

      var content = '<div class="list-block" style="margin:0px !important;">';
          content +='<ul>';
          content +='    <li>';
          content +='      <div class="item-content">';
          content +='        <div class="item-inner">';
          content +='          <div class="item-input">';
          content +='            <select id="ventures-data">';
          content +='              <option>Investigative</option>';
          content +='              <option>Artistic</option>';
          content +='              <option>Realistic</option>';
          content +='              <option>Social</option>';
          content +='              <option>Conventional</option>';
          content +='              <option>Enterprising</option>';
          content +='            </select>';
          content +='          </div>';
          content +='        </div>';
          content +='      </div>';
          content +='    </li>';

          content +='<li>';
          content +='<div class="item-content">';
          content +='            <input type="text" id="career-data" placeholder="Career" required="required">';
          content +='      </div>';
          content +='    </li>';

          content +='  <li class="align-top">';
          content +='      <div class="item-content">';
          content +='            <textarea id="description-data" placeholder="Description" style="height:30px !important;"></textarea>';
          content +='      </div>';
          content +='    </li>';
         
          content +='<li>';
          content +='<div>Like / Dislike <span id="like-range"></span></div>';
          content +=' <div class="item-content">';
          content +='    <div class="range-slider">';
          content +='       <input type="range" id="slider-like" min="0" max="100" value="0"  step="0.1"><span id="rate-like"></span>';
          content +='    </div>';
          content +='  </div>';
          content +='</li>';

          content +='    <li>';
          content +='          <div>Skills <span id="skill-range"></span></div>';
          content +='      <div class="item-content">';
          content +='            <div class="range-slider">';
          content +='              <input type="range" id="slider-skills" min="0" max="100" value="0"  step="0.1">';
          content +='          </div>';
          content +='      </div>';
          content +='    </li>';


          content +='    <li>';
          content +='    <div>In Demand <span id="demand-range"></span></div>';
          content +='    <div class="item-content">';
          content +='            <div class="range-slider">';
          content +='              <input type="range" id="slider-demand" min="0" max="100" value="0"  step="0.1">';
          content +='         </div>';
          content +='      </div>';
          content +='    </li>';

          content +='    <li>';
          content +='      <div>High Paying <span id="pay-range"></span></div>';
          content +='      <div class="item-content">';
          content +='            <div class="range-slider">';
          content +='              <input type="range" id="slider-pay" min="0" max="100" value="0" step="0.1">';
          content +='            </div>';
          content +='      </div>';
          content +='    </li>';


          content +='<li>';
          content +='      <div>Convenience <span id="convenience-range"></span></div>';
          content +='      <div class="item-content">';
          content +='      <div class="range-slider">';
          content +='      <input type="range" id="slider-convenience" min="0" max="100" value="0"  step="0.1">';
          content +='         </div>';
          content +='      </div>';
          content +='    </li>';
          content +='  </ul>';
          content +='</div>';

          var content_result_data = '';
          var user_id = $$('.statusbar-overlay').data('userid');  

          var query = firebase.database().ref("explore").orderByChild('user_id').equalTo(user_id).once('value').then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                              var key = childSnapshot.key;
                              var childData = childSnapshot.val();
                              if (childData.user_id == user_id) {
                                  content_result_data += '<div style="border-radius:5px;margin:5px;background: #86d7fd;padding:5px;" id="'+key+'"><h3 style="margin: 0px !important;color:#090;">*'+childData.ventures_data+'* <span style="float:right;background:#e775f9;padding:3px;color:#fff;"><a href="#" onClick="deleteExplore(\''+key+'\')" style="color:#fff !important;">x</a></span></h3><h4 style="margin: 0px !important;color:#1c0d9a !important;">'+childData.career_data+'</h4><p>'+childData.description_data+'</p></div>';
                              }
                              
                              $$('#results-data').html(content_result_data);

                      });
              });  

        $$('.addexplore').on('click', function () {
          myApp.modal({
            title:  'Add New',
            text: content,
            buttons: [
             {
                text: 'Cancel',
                onClick: function() {
                  myApp.alert('Transaction Canceled!');
                }
              },
              {
                text: 'Add',
                onClick: function() {
                    var ventures_data      =   $$('#ventures-data').val();
                    var career_data        =  $$('#career-data').val();
                    var description_data   =  $$('#description-data').val();
                    var slider_demand      = $$('#slider-demand').val();
                    var slider_pay         =   $$('#slider-pay').val();
                    var slider_convenience =  $$('#slider-convenience').val();
                    var slider_skills      =   $$('#slider-skills').val();
                    var slider_like        =   $$('#slider-like').val();
                    var user_id = $$('.statusbar-overlay').data('userid');  

                    if (career_data == '') {
                        myApp.alert('Data Not Saved! Career data is required!');
                    }else{
                        var db = firebase.database();
                        var ref = db.ref("explore");
                        var newExplore = ref.push();
                        newExplore.set({
                            ventures_data    : ventures_data,
                            user_id          : user_id,
                            career_data      : career_data,
                            description_data : description_data,
                            demand           : slider_demand,
                            pay              : slider_pay,
                            convenience      : slider_convenience,
                            skills           : slider_skills,
                            like             : slider_like
                        });

                        var content_result_data = '';
                        var user_id = $$('.statusbar-overlay').data('userid');  
                        var query = firebase.database().ref("explore").orderByChild('user_id').equalTo(user_id).once('value').then(function(snapshot) {
                              snapshot.forEach(function(childSnapshot) {
                                            var key = childSnapshot.key;
                                            var childData = childSnapshot.val();
                                            if (childData.user_id == user_id) {
                                                content_result_data += '<div style="border-radius:5px;margin:5px;background:#999;padding:5px;" id="'+key+'"><h3 style="margin: 0px !important;color:#090;">*'+childData.ventures_data+'* <span style="float:right;"><a href="#" onClick="deleteExplore(\''+key+'\')">x</a></span></h3><h4 style="margin: 0px !important;">'+childData.career_data+'</h4><p>'+childData.description_data+'</p></div>';
                                            }
                                            
                                            $$('#results-data').html(content_result_data);

                                    });
                            });
                    }

                }
              },
            ]
          })
        });

        setInterval(function(){
          $$('#skill-range').text($$('#slider-skills').val());
          $$('#convenience-range').text($$('#slider-convenience').val());
          $$('#like-range').text($$('#slider-like').val());
          $$('#pay-range').text($$('#slider-pay').val());
          $$('#demand-range').text($$('#slider-demand').val());
        }, 150);
        
    }

})
