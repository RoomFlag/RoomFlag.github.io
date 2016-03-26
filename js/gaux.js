// because lol IE datetime is not compatible // http://stackoverflow.com/a/24934384
Date.now = Date.now || function() { return +new Date; };

// simple client-side API for tieing events to dom elements and emitting to Google Analytics
// needs jQuery, and google analytics, js-cookie


// bind the event
// google analytics user activity
// gaux( eventType, domSelector, options )

// https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.1.0/js.cookie.min.js

gaux = {};

gaux['user'] = {}; // {gauxID : " this browser's tracking id "}

gaux['track'] = function(arr) {
  /*
  console.log("setting tracking events");
  console.log("arr = (below)");
  console.log(arr);
  //*/
  for (var i = 0; i < arr.length; i++) {
    // arr[i] = eventType, domSelector, options
    var eventType = arr[i][0];
    var domSelector = arr[i][1];
    var options = arr[i][2];

    // console.log("tracking event " + domSelector);

    // eventType can be any jQuery.on event such as 'click'
    // domSelector can be any jQuery dom selector
    /* the options are what is emitted to google analytics such as
        {
          hitType: 'event',
          eventCategory: 'Videos',
          eventAction: 'play',
          eventLabel: 'Fall Campaign'
        }
    */

    // merge these options with whatever gaux already knows about this user. these new options take precedence over any in gaux.
    $.extend(options, gaux['user']);
    // gaux['user'] = mergedOptions;

    /*
    console.log("options = (below)");
    console.log(options);
    //*/

    // then send to google (could probably replace with another API in the future)
    // $( domSelector ).on( eventType, options, callback );
    $( domSelector ).on( eventType, options, function(e) {
      // e = options variable passed
      e.data['gauxTime'] = Date.now();
      e.data['hitType'] = 'event';

      /*
      console.log("tracked an event");
      console.log(e.data);
      //*/

      ga('send', e.data);
    });
  }
}

gaux['identify'] = function(options) {
  /* options is an identity object, which is stored into the user
      {
        gauxID : this browser's tracking id
        campaign : the campaign used to engage this person
        etc
      }
  */

  gaux['user'] = $.extend(gaux['user'], options);

}

// set a neverending cookie that can be used to identify this user in the future.
$(function() {
  // https://github.com/js-cookie/js-cookie
  if (typeof Cookies.get('gaux') == "undefined") { // cookie not set. set one with some guid identifier.

    var newTrackingID = uuid.v4(); // https://github.com/broofa/node-uuid
    Cookies.set('gaux', newTrackingID, {
      expires: 36500
    });
    // gaux['user']['gauxID'] = newTrackingID;
    gaux.identify({
      gauxID: newTrackingID
    })
  } else { // cookie is set
    // gaux['user']['gauxID'] = Cookies.get('gaux');

    gaux.identify({
      gauxID: Cookies.get('gaux')
    })
  }
})

// then just set up everything using this API
/* // STORED ON THE WEBPAGE ITSELF NOW
$(function() {
  gaux.track([
    [
      'click', '#managementToggle', {
        eventCategory: "marketing site",
        eventAction: "clicked management toggle",
        page: "home"
      }
    ],
    [
      'click', '#staffToggle', {
        eventCategory: "marketing site",
        eventAction: "clicked staff toggle",
        page: "home"
      }
    ]
  ])
})
//*/
