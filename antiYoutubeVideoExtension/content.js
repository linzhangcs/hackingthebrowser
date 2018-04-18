console.log("on youtube website");
var videos = document.getElementsByTagName('video');
var d = document;
var btnAdded = false;
var shouldNotPlay = true;
 for( var i = 0; i < videos.length; i++ ){
   // check if the video is Playing, pause it if it is
   if(!videos[i].paused){
     videos[i].pause();
   }
   // Video onplay event to check if asked the user
    videos[i].onplay = function(){
      if(shouldNotPlay){
        this.pause();
        this.currentTime = 0; // set to the current time needed
        return;
      }
    }

    videos[i].addEventListener('mouseup', function(e){
      if(shouldNotPlay){
        // add a div that blocks out the entire screen
        var screenDiv = d.createElement('div');
        screenDiv.style.position = "absolute";
        screenDiv.style.zIndex = "9999999999";
        screenDiv.style.width = window.innerWidth+'px';
        screenDiv.style.height= window.innerHeight+'px';
        screenDiv.style.background = "#ffffffe6";
        screenDiv.id = "screen-block";
        //add this div to Doc
        d.body.appendChild(screenDiv);
        this.style.pointerEvents = "none";
        var currentVideo = this;
        // add a textarea, 2 buttons, and a question
        //"I see you are about to watch this (duration) video. Why are you watching it?"
        // once there are at least 3 words in the textarea, the 2 buttons shows up
        var qText = d.createElement("h2");
        qText.innerHTML = "You are about to watch this <bold><em><span style='color:red'>"+ (this.duration / 60).toFixed(2) +" minutes</span></em></bold> long video."
        qText.style.margin = "15% 0 0px 35%";
        qText.style.color = "#444";

        var qt = d.createElement("h2");
        qt.innerText = "Take a minute and think about";
        qt.style.color = "#444";
        qt.style.margin = "5px 0 0 35%";

        var q  = d.createElement("h1");
        q.innerText = "Why do you want to watch it?";
        q.style.textTransform = "uppercase";
        q.style.fontSize = "28px";
        q.style.fontFamily = "Roboto, Arial, sans-serif";
        q.style.margin = "2% 0 2% 35%";

        var textInput = d.createElement('textarea');
        textInput.style.width = "420px";
        textInput.placeholder =  "Write about your thoughts here";
        textInput.style.marginLeft = "35%";

        textInput.addEventListener('input', function(){
          if(this.value.length > 9 && !btnAdded){
            var closebtn = d.createElement('button');
            closebtn.style.margin = "5% 0 5% 18%";
            closebtn.style.padding = "0.5%";
            closebtn.innerText = "Learn Something";
            closebtn.addEventListener('click', function(){
              window.location.replace("http://www.noexcuselist.com/")
            });
            screenDiv.appendChild(closebtn);
            var playbtn = d.createElement('button');
            playbtn.style.margin = "5% 0 5% 35%";
            playbtn.style.padding = "0.5%";
            playbtn.innerText = "Watch Video";
            playbtn.addEventListener('click', function(){
              shouldNotPlay = false;
              currentVideo.style.pointerEvents = "auto";
              screenDiv.parentNode.removeChild(screenDiv);
            });
            screenDiv.appendChild(playbtn);
            screenDiv.appendChild(closebtn);
            btnAdded = true;
          }
        }, false);

        screenDiv.appendChild(qText);
        screenDiv.appendChild(qt);
        screenDiv.appendChild(q);
        screenDiv.appendChild(textInput);
        // one is watch, one is close
        // watch will let the video play and close will close the tab
      }
    }, false);
}
