// on page load
$(window).load(function() {

    // define api keys
    var apiKey = '07e20f0551b8325642d01a468d6c9e2b';
    var apiSecret = 'f0e2309ac1f113b331ebb8ba7197b1bc';

    // create a Cache object
    var cache = new LastFMCache();

    // create a LastFM object
    var lastfm = new LastFM({
        apiKey: apiKey,
        apiSecret: apiSecret,
        cache: cache
    });

    // get most recent song
    lastfm.user.getRecentTracks({ limit: 1, user: 'johnathanyan' }, {
        success: function(data) {

            /* render album art and info */
            lastfm.album.getInfo({ artist: data.recenttracks.track["0"].artist["#text"], album: data.recenttracks.track["0"].album["#text"] }, {
                success: function(_data) {
                    // Track name and artist
                    document.getElementById('Header').innerHTML = '<h1><center><font color="white">Now Playing:</font></center></h1>';
                    document.getElementById('Playing').innerHTML = '<center><marquee behavior="alternate" vspace=6 direction="left"><font size=4> <b>' +
                        data.recenttracks.track["0"].name + '</b></marquee><i>' + data.recenttracks.track["0"].artist["#text"] + '</i></center>';

                    // Fill in missing info
                    if (typeof _data.album.tags.tag["0"] === "undefined") {
                        _data.album.tags.tag["0"] = "Unknown";
                    }
                    if (typeof _data.album.tags.tag["1"] === "undefined") {
                        _data.album.tags.tag["1"] = "Unknown";
                    }

                    // Album Info
                    document.getElementById('AlbumArt').innerHTML = '<center><img src=' + _data.album.image[3]["#text"] + '>' +
                        '<br><br><h2>Album Info:</h2><br><b>Name:</b> ' + _data.album.name + '<br><b>Genre or Info:</b> ' + _data.album.tags.tag["0"].name + ' / ' +
                        _data.album.tags.tag["1"].name + '<br><b>Plays:</b> ' + _data.album.playcount + '<br><br></center>';

                    // Album Summary
                    if (typeof _data.album.wiki === "undefined") {
                        document.getElementById('Summary').innerHTML = '<hr>';
                    } else {
                        document.getElementById('Summary').innerHTML = '<center><b>Summary:</b><br>' + _data.album.wiki.summary + '<br><br><hr>';
                    }
                }
            });

            // get lyrics using musixmatch
            $.getJSON("http://api.musixmatch.com/ws/1.1/matcher.track.get?apikey=105305da3eb9047cf95bcd5d2c38672a&q_track=" +
                data.recenttracks.track[0].name + "&q_artist=" +
                data.recenttracks.track["0"].artist["#text"],
                function(data) {
                    // url of lyrics
                    var js = data.message.body.track.track_share_url;
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', js, true);
                    xhr.responseType = 'document';
                    xhr.send();
                    xhr.onload = function(e) {
                        var doc = e.target.responseXML;
                        var lyrics = doc.getElementsByClassName("mxm-lyrics__content")[0].innerHTML + "<br>" +
                            doc.getElementsByClassName("mxm-lyrics__content")[1].innerHTML;
                        lyrics = lyrics.replace(/\n/g, "<br>")
                        document.getElementById('Lyrics').innerHTML = '<br><center><h2>Lyrics:</h2><br>' + lyrics;

                    }

                    var lyrics;

                    /* use api to get lyrics here - MUST HAVE LICENSE TO USE API
                    ------------------
                    $.getJSON("http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=105305da3eb9047cf95bcd5d2c38672a&track_id=" + js, function(data) {
                        lyrics = data.message.body.lyrics.lyrics_body;

                        document.getElementById('top_artist').innerHTML = lyrics;
                    });*/

                });
        }
    });
});
