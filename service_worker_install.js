    window.addEventListener("DOMContentLoaded", function (event) {
        // Load the service worker
        if ('serviceWorker' in navigator) {

            navigator.serviceWorker.register('/serviceworker.js', { scope: '/'}) 

            .then( function( registration) {
                console.log(`Service Worker successfully registered for`, registration.scope);
            } )

            .catch( function( error ) {
                console.log(`ServiceWorker not registered: ${error}`);
            } );

            if(navigator.serviceWorker.controller) {
                window.addEventListener('load', function() {
                    navigator.serviceWorker.controller.postMessage({'command': 'trimCaches'});
                })
            }
        }
    });
