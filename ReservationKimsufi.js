if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function (){
    // code to run on server at startu

      console.log("begin server : check de kimsufi");

      var _time = (new Date).getMinutes();
      var serv;
      var ks1 = 0;
      var ks2 = 0;
      var ks3 = 0;
      var _timeServ = (new Date).getMinutes();

      while(true){

          if(Math.abs(_time - (new Date).getMinutes())>= 1){
              _time = (new Date).getMinutes();
              console.log("check de kimsufi à la minute :"+(new Date));

              //Test serveur


              var disponibiliteServeur = Meteor.http.call("GET", "https://ws.ovh.com/dedicated/r2/ws.dispatcher/getAvailability2").content;
              var json = JSON.parse(disponibiliteServeur);
              var jsonAparser = json.answer.availability;

                for(var objAvailable in jsonAparser){

                    if(jsonAparser[objAvailable].reference == "150sk20" || jsonAparser[objAvailable].reference == "150sk30" || jsonAparser[objAvailable].reference == "150sk10"){

                        for(var references in jsonAparser[objAvailable].metaZones){

                            if(jsonAparser[objAvailable].metaZones[references].zone == "fr"){

                                //console.log("zone "+JSON.stringify(jsonAparser[objAvailable].metaZones[references].zone));

                                if(jsonAparser[objAvailable].reference =="150sk30" & jsonAparser[objAvailable].metaZones[references].availability != "unknown"){

                                    if(ks3 == 0){
                                        console.log("Envoi SMS : Ks3 disponible !!");

                                        serv = Meteor.http.call("GET", "https://smsapi.free-mobile.fr/sendmsg?user=ooo&pass=oooo&msg=Ks3%20Disponible%20!");
                                        ks3 = 1;
                                    }

                                }else{

                                    if(ks3 == 1){

                                        console.log("Envoi SMS : Ks3 non disponible !!");

                                        serv = Meteor.http.call("GET", "https://smsapi.free-mobile.fr/sendmsg?user=ooo&pass=oooo&msg=Ks3%20plus%20disponible%20");
                                        ks3 = 0;
                                    }

                                }

                                if(jsonAparser[objAvailable].reference =="150sk20" & jsonAparser[objAvailable].metaZones[references].availability != "unknown"){

                                    if(ks2 == 0){

                                        console.log("Envoi SMS : Ks2 disponible !!");

                                        serv = Meteor.http.call("GET", "https://smsapi.free-mobile.fr/sendmsg?user=ooo&pass=oooo&msg=Ks2%20Disponible%20!");
                                        ks2 = 1;
                                    }

                                }else{

                                    if(ks2 == 1){

                                        console.log("Envoi SMS : Ks2 disponible !!");

                                        serv = Meteor.http.call("GET", "https://smsapi.free-mobile.fr/sendmsg?user=ooo&pass=oooo&msg=Ks2%20plus%20disponible%20");
                                        ks2 = 0;
                                    }

                                }

                                if(jsonAparser[objAvailable].reference =="150sk10" & jsonAparser[objAvailable].metaZones[references].availability != "unknown"){

                                    if(ks1 == 0){

                                        console.log("Envoi SMS : Ks1 disponible !!");

                                        serv = Meteor.http.call("GET", "https://smsapi.free-mobile.fr/sendmsg?user=ooo&pass=oooo&msg=Ks1%20Disponible%20!");
                                        ks1 = 1;
                                    }

                                }else{

                                    if(ks1 == 1){
                                        console.log("Envoi SMS : Ks1 disponible !!");

                                        serv = Meteor.http.call("GET", "https://smsapi.free-mobile.fr/sendmsg?user=ooo&pass=oooo&msg=Ks1%20plus%20disponible%20");
                                        ks1 = 0;
                                    }

                                }

                            }

                        }

                    }


                }


          }//fin first if (1 min)

          if(Math.abs(_time - (new Date).getMinutes())>= 60){

              _timeServ = (new Date).getMinutes();
              console.log("Envoi SMS : Serveur Actif");
              serv = Meteor.http.call("GET", "https://smsapi.free-mobile.fr/sendmsg?user=ooo&pass=oooo&msg=Serveur%20Actif%20!");


          }


      }

      console.log("fin");
  });
}
