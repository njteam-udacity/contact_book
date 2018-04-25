(function(app, chkErr) {

    $(initializeApplication);

    function initializeApplication() {

        app.utils.getPageResources(chkErr(function(templates, content, config) {

            // app.templates = templates;
            // app.content = content;
                
            app.utils.renderPage(/*app.*/templates.page_modal, /*app.*/content);            
        
        }));

    }

// Get the modal
var modal = document.getElementById('profile-modal');

// Get the element that closes the modal
var close = document.getElementsByClassName('close');

// When the user clicks on (x), close the modal
close.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
})(window.app, app.utils.checkForErrors);