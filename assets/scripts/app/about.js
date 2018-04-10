(function (app) {
    // TO DO this mod should be moved to the navigation/header module.
  app.about =  {
      
    addNavigationMod : function (){
         
        $(document.body).attr( "id","myPage").data({spy: "scroll", target:"navbar"});
         console.log($("body").data());
     }   

  }

})(window.app = window.app || {})