(function (app) {
    // TODO: this mod should be moved to the navigation/header module.
  app.about =  {
      
    addNavigationMod : function () {
        $(document.body) // always use the body for this
          .attr("data-spy", "scroll")
          .attr("data-target", "navbar");
     }

  }

})(window.app = window.app || {})