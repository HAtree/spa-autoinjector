# Automatic Dynatrace User Actions for Page Changes in Single Page Apps
By default, Dynatrace Real User Monitoring capture's a "User Action" for any user input which results in a network call (either a full page load or an XHR request). For example, clicking on a "Continue" button, would load a new page and be captured as a User Action with timing details. Clicking and typing to fill in a static form on a page would not generate a user action. 

However some single page apps present multiple "pages" to the user, without needing to make a network call. An example might be filling in a multi-step form, with one section per page and then submitting all the input at the very end.

This code snippet will create a new UserAction every time a new History Segment is added using either `history.pushState` or `history.replaceState`

This allows for more accurate analytics in Dynatrace and visibility into what sub-pages of your SPA a user has visited

## How does it work
This script creates a wrapper a round pushState and changeState and emits a new event.
A new event listener is then added for these events which calls the Dynatrace RUM JavaScript API to start a new useraction
This code snippet should just be run once per page load to avoid creating multiple 

## Timing Data
**note** the timing data generated for the 

# Usage 
## Including through Google Tag Manager
You can add this snippet to your site without making code changes by adding it as a tag through google tag manager. 
1) Create a new "Custom HTML Tag"
2) add the contents of the script within script tags: 
```html
<!--<script type='text/javascript' src='https://raw.githubusercontent.com/HAtree/spa-autoinjector/master/monkeypatch.js'></script>-->

<script type="text/javascript">
  //add script here
</script>
```
3) Change trigger to only fire once on page load

## //Todo: Improvements
* Add a check to stop the event listener being registered twice and generating duplicate useractions
* Respond to hashChanged events for older single page apps
* Add event listener for onpopstate to respond to browser back / forward (or history.back() and history.forward()) navigations
* provide timing for react by hooking into router navigations

