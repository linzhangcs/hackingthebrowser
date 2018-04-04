window.addEventListener('load', function(){
  // Set the name of the hidden property and the change event for visibility
  var hidden, visibilityChange;
  var hasChanged = false;
  var lastScrollPos = 0;

  if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  }

  // If the page is hidden, pause the video;
  // if the page is shown, play the video
  function handleVisibilityChange(){
    if (document[hidden]) {
      hasChanged = true;
    } else {
    }
  }
  window.addEventListener('scroll', function(e){
    // console.log("scrolling");
    if(hasChanged){
      console.log("hasChanged scrolling");
      lastScrollPos = window.scrollY;
      console.log(lastScrollPos);
      // randomly assign a new position for all of the elements
      // var allElements = document.getElementsByTagName('*');
      // var allElements = document.getElementsByTagName('div');
      var allElements = document.getElementsByClassName('move');

      var left;
      // for(var i = 0; i < allElements.length; i++){
      //   left = Math.floor(Math.random()*window.innerWidth);
      //   allElements[i].style = "position: fixed; left: "+left+"; top: "+ lastScrollPos + " ;";
      // }
      $(allElements).each(function(){
        var item = $(this);
        left = Math.floor(Math.random()*window.innerWidth)/2;
        var pos = item.position().top - $(window).scrollTop();
        if(pos <= 0){
          // item.css('top', lastScrollPos);
          // item.css('left', left);
          // item.css('position', 'absolute');
          item.css('opacity', 0.8-Math.random())
        }
      });
    }
  });
  // Warn if the browser doesn't support addEventListener or the Page Visibility API
  if (typeof document.addEventListener === "undefined" || typeof document.hidden === "undefined") {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
  } else {
    // Handle page visibility change
    document.addEventListener(visibilityChange, handleVisibilityChange, false);

    // // When the video pauses, set the title.
    // // This shows the paused
    // videoElement.addEventListener("pause", function(){
    //   document.title = 'Paused';
    // }, false);
    //
    // // When the video plays, set the title.
    // videoElement.addEventListener("play", function(){
    //   document.title = 'Playing';
    // }, false);

  }

}, false);
