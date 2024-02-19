//# sourceURL=application.js

//
//  application.js
//  SampleAppTV
//
//  Created by Vladimir Sánchez Mondeja on 8/8/22.
//

/*
 * This file provides an example skeletal stub for the server-side implementation
 * of a TVML application.
 *
 * A javascript file such as this should be provided at the tvBootURL that is
 * configured in the AppDelegate of the TVML application. Note that  the various
 * javascript functions here are referenced by name in the AppDelegate. This skeletal
 * implementation shows the basic entry points that you will want to handle
 * application lifecycle events.
 */

/**
 * @description The onLaunch callback is invoked after the application JavaScript
 * has been parsed into a JavaScript context. The handler is passed an object
 * that contains options passed in for launch. These options are defined in the
 * swift or objective-c client code. Options can be used to communicate to
 * your JavaScript code that data and as well as state information, like if the
 * the app is being launched in the background.
 *
 * The location attribute is automatically added to the object and represents
 * the URL that was used to retrieve the application JavaScript.
 */


var baseURL;

/**
 Function called when the TVML application launch
 @param options {Obj}
*/

App.onLaunch = function(options) {
    console.log("[TVMLApp] onLaunch");

    baseURL = options.BASEURL;

    getDocument(baseURL + "/Pages/InitialPage.xml");
}

/**
 Function called when the TVML application get active
*/
App.onWillResignActive = function() {
    console.log("[TVMLApp] onWillResignActive");
}

/**
 Function called when the TVML application enter background mode
*/

App.onDidEnterBackground = function() {
    console.log("[TVMLApp] onDidEnterBackground");
}

/**
 Function called when the TVML application enter foreground mode
*/

App.onWillEnterForeground = function() {
    console.log("[TVMLApp] onWillEnterForeground");

}

/**
 Function called when the TVML application become active
*/

App.onDidBecomeActive = function() {
    console.log("[TVMLApp] onDidBecomeActive");
}


/**
 * This convenience function returns an alert template, which can be used to present errors to the user.
 */


//Create a loading template in your application.js file so it appears when loading information from your sever.
function loadingTemplate() {
    var template = '<document><loadingTemplate><activityIndicator><text>Loading</text></activityIndicator></loadingTemplate></document>';
    var templateParser = new DOMParser();
    var parsedTemplate = templateParser.parseFromString(template, "application/xml");
    navigationDocument.pushDocument(parsedTemplate);
    return parsedTemplate;
}

//Create a alert template in your application.js file
function alertTemplate(title,description) {
    var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
        <document>
          <alertTemplate style="background-color:rgba(0,0,255,0.3)">
            <title>${title}</title>
            <description>${description}</description>
          </alertTemplate>
        </document>`

    var parser = new DOMParser();
    var alertDoc = parser.parseFromString(alertString, "application/xml");
    return alertDoc
}


//Get a new TVML document from the server. Upon success, call pushPage() to place it onto the navigationDocument stack.
function getDocument(url) {

    var loadingScreen = loadingTemplate();

    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {pushPage(templateXHR.responseXML, loadingScreen);}, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
}

/*
 Replace the current document with the new document. In this case, you want to replace the loading  document so that users don't see the loading document when backing out of the current document. Instead they go to the original document.
 */
function pushPage(page, loading) {
    var currentDoc = getActiveDocument();
    navigationDocument.replaceDocument(page, loading);
}
