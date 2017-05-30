/*

This script enables the creation of app links (with regular in-app browser
fallbacks) using data-* attributes instead of inline event handlers.

Note that the `target="_blank"` attribute MUST be applied to each anchor in
order to trigger this behavior. Otherwise, click events are handled normally.

One nice side effect of this system is that app links become self-documenting:

<a href="https://twitter.com/askbysorg" target="_blank"
   data-app-link="twitter://user?screen_name=askbysorg"
   data-android-app="com.twitter.android"
   data-ios-app="twitter://">
  Twitter
</a>

<a href="https://facebook.com/bainbridgeyouthservices/" target="_blank"
   data-app-link="fb://facewebmodal/f?href=https%3A%2F%2Ffacebook.com%2Fbainbridgeyouthservices%2F"
   data-android-app="com.facebook.katana"
   data-ios-app="facebook://">
  Facebook
</a>

This script still needs testing; PhoneGap wasn't working last time I tried.

Apparently, Facebook is difficult: https://stackoverflow.com/questions/4810803/open-facebook-page-from-android-app

Original Info: http://stackoverflow.com/questions/23095906/how-to-open-twitter-and-facebook-app-with-phonegap

*/

document.addEventListener('deviceready', function () {
   
   appAvailability.checkBool('com.twitter.android', function (b) {
      alert('twitter: ' + b)
   })

  var platform = device.platform.toLowerCase()

  var cache = {}

  $('a[target="_blank"]').each(function (anchor) {
    function setAvailability (value) {
      alert('Setting app-available for ' + anchor.href + ' to ' + value + '(app = ' + app + ')')
      anchor.setAttribute('data-app-available', cache[app] = value)
    }
    var appLink = anchor.getAttribute('data-app-link')
    var app = anchor.getAttribute('data-'+platform+'-app')
    if (appLink && app) {
      if (app in cache) setAvailability(cache[app])
      else appAvailability.checkBool(app, setAvailability)
    }
  })

}, false)

$('a[target="_blank"]').on('click', function navigate (event) {
  var anchor = this
  if (anchor.getAttribute('data-app-available') === 'true') {
    window.open(anchor.getAttribute('data-app-link'), '_system')
  } else {
    window.open(anchor.href, '_blank', 'location=yes,toolbar=yes,presentationstyle=formsheet,transitionstyle=crossdissolve')
  }
  event.preventDefault()
})
