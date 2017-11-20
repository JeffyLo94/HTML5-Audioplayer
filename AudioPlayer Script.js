/* 
 * Author: Jeffrey Lo
 */

jQuery(document).ready(function() {
  widget = $('.audio-widget');
  actionBtn = $('.action');
  track = $('.track');
  played = $('.played');
  play = $('.play');
  pause = $('.pause');
  time = $('.time');

  song = document.getElementById('track1');

  Number.prototype.toHHMMSS = function() {
    var seconds = Math.floor(this),
      hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    var minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (hours > 0) {
      hours = "0" + hours + ":";
      return hours + (minutes + ':' + seconds);
    } else {
      return (minutes + ':' + seconds);
    }
  };

  widget.on('click', function(e) {
    e.preventDefault();
    if ($(".audio-widget").hasClass('first-play')) {
      $('.audio-widget').removeClass('first-play');
      if(song.readyState >= 3){
      //Run Audio Player Setup
      //Show Time
      totTime = $.parseHTML((song.duration).toHHMMSS());
      $('.audio-total').append(totTime);
      $('.audio-total').addClass('loaded');

      //Run Scrubber
      //Play Audio
      $('.audio-widget').addClass('playing');
      song.play();
      $('.audio-progress').addClass('loaded');
			}
    }
  });

  //play pause
  actionBtn.on('click', function() {
  if(!(widget.hasClass('first-play'))){
      if ($(".audio-widget").hasClass('playing')) {
      song.pause();
      $(".audio-widget").removeClass('playing');
    } else {
      song.play();
      $('.audio-widget').addClass('playing');
    }
  }

  });

  //Time Update
  song.ontimeupdate = function() {
    currTime = $.parseHTML((song.currentTime).toHHMMSS());
    $('.audio-progress').html(currTime);
    var widthVal = Math.floor((song.currentTime / song.duration) * 100);
    $('.played').css({
      'width': widthVal + '%'
    });
  };

  $('.track').on('click',function(e){
  if(!($(".audio-widget").hasClass('first-play'))){
    	moveTrackHead(e);
    song.currentTime = song.duration * clickPercent(e);
  }
  });
//document.getElementsByClassName("played")[0].offsetWidth

  function moveTrackHead(e) {
		var newPos = e.pageX - track.offset().left;
    if(newPos >= 0 && newPos <= track.width()){
    	var newWidth = Math.floor((newPos / track.width())*100);
      played.css({'width': newWidth + '%'});
    }
    else if(newPos < 0){
    	played.css({'width': 0 + '%'});
    }
    else if(newPos > track.width()){
    	played.css({'width': 100 + '%'});
    }
  }

  function clickPercent(e) {
    var offset = track.offset().left;
    var maxWidth = track.width();
    return (e.pageX - offset) / maxWidth;
  }

  $(".time").on("change", function() {
    song.currentTime = $(this).val();
    $(".played").attr("max", song.duration);
  });

  song.on('timeupdate', function() {
    curtime = parseInt(song.currentTime, 10);
    $(".played").attr("value", curtime);
  });

  //TODO- DURATION & Scrubber
  //Reference- http://www.w3schools.com/tags/ref_av_dom.asp






});

