var jplayer_instance_selector = '#jplayer_instance';
var jplayer_selector = '#jplayer';
var jplayer_container_selector = '#jp_container';
var nowPlaying = null;

function jplayerHtml () {
  return '<div id="jplayer_instance" style="position: absolute">' +
   '<div id="jplayer" class="jp-jplayer"></div>' +
    '<div id="jp_container" class="jp-audio">' +
     '<div class="jp-type-single">' +
      '<div class="jp-gui jp-interface">' +
       '<ul class="jp-controls">' +
        '<li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>' +
        '<li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>' +
       '</ul>' +
       '<div class="jp-progress">' +
        '<div class="jp-seek-bar">' +
         '<div class="jp-play-bar"></div>' +
        '</div>' +
       '</div>' +
       '<div class="jp-time-holder">' +
        '<div class="jp-current-time"></div>' +
        '<div class="jp-duration"></div>' +
       '</div>' +
      '</div>' +
      '<div class="jp-no-solution"><span>再生できません。</span></div>' +
      '<button class="jp-close">&times;</button>' +
     '</div>' +
    '</div>' +
  '</div>';
}

function createJplayer (event) {
  event.preventDefault();
  var anchor = $(this);
  var audiourl = anchor.attr('audiourl') || anchor.data('audiourl');
  var match_res = audiourl.match(/\.(m4a|oga|mp3|wav)(\?|$)/i);
  if (match_res && match_res[1]) {
    audio_type = match_res[1]
  } else {
    audio_type = 'm4a'
  }

  var player_html = jplayerHtml();
  if ($(jplayer_instance_selector).length == 0) {
    $('body').append(player_html);
  } else {
    $(jplayer_selector).jPlayer("destroy");
      play_ended_or_destroy();
  }
  var set_media_object = {};
  set_media_object[audio_type] = audiourl;
  $(jplayer_selector).jPlayer({
    cssSelectorAncestor: '#jp_container',
    ready: function () {
      $(jplayer_selector).jPlayer("play");
    },
    wmode:"window",
    swfPath: "/static/jplayer/",
    supplied: audio_type,
    solution:"html,flash",
    volume: 1,
    muted: false
  });
  $(jplayer_selector).jPlayer("setMedia", set_media_object);

  $(jplayer_instance_selector).css({"left":0, "top":-300});

  $(jplayer_instance_selector).bind($.jPlayer.event.ended, function(event) {
      $(jplayer_instance_selector).unbind($.jPlayer.event.ended);
      play_ended_or_destroy();
  });

  nowPlaying = anchor;

  return false;
}

function closeJplayer (event) {
  event.preventDefault();
  var anchor = $(this);
  $(jplayer_selector).jPlayer("stop");
  $(jplayer_selector).jPlayer("destroy");
  $(jplayer_instance_selector).remove();
}

function detail_track_click(event) {
    event.preventDefault();
    var $this = $(this);

    $this.hide();
    $this.next().show();
}

function play_ended_or_destroy(){
    if(nowPlaying){
        nowPlaying.show();
        nowPlaying.next().hide();
        nowPlaying = null;
    }
}

function detail_track_stop_click(event) {
    event.preventDefault();

    var $this = $(this);

    $(jplayer_selector).jPlayer("stop");
    $(jplayer_selector).jPlayer("destroy");
    play_ended_or_destroy();
}

$(function () {

    var play = $(".detail_track.play");
    var stop = $(".detail_track.stop");

    play.click(createJplayer);
    play.click(detail_track_click);
    stop.click(detail_track_stop_click);

    $('body .jp-close').click(closeJplayer);
});





