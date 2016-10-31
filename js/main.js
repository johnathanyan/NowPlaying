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

    var searchURL = 'http://api.musixmatch.com/ws/1.1/track.search?apikey=105305da3eb9047cf95bcd5d2c38672a&q_track='

    var topArtistName = '';

    // get weekly artist chart by tag 'trance'
    lastfm.user.getRecentTracks({ limit: 1, user: 'johnathanyan' }, {
        success: function(data) {

            // render top weekly artist using 'lastfmTemplateArtists' template
            $('#top_artists').html(
                $('#lastfmTemplateArtists').render(data.recenttracks.track[0])
            );


            var js;

            $.getJSON("http://api.musixmatch.com/ws/1.1/matcher.track.get?apikey=105305da3eb9047cf95bcd5d2c38672a&q_track=" + data.recenttracks.track[0].name + "&q_artist=" + data.recenttracks.track["0"].artist["#text"], function(data) {
                js = data.message.body.track.track_share_url;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', js, true);
                xhr.responseType = 'document';
                xhr.send();
                xhr.onload = function(e) {
                    var doc = e.target.responseXML;
                    var lyrics = doc.getElementsByClassName("mxm-lyrics__content")[0].innerHTML + doc.getElementsByClassName("mxm-lyrics__content")[1].innerHTML;
                    lyrics = lyrics.replace(/\n/g, "<br>")
                    document.getElementById('top_artist').innerHTML = lyrics;

                }

                var lyrics;

                /* use api to get lyrics here
                ------------------
                $.getJSON("http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=105305da3eb9047cf95bcd5d2c38672a&track_id=" + js, function(data) {
                    lyrics = data.message.body.lyrics.lyrics_body;

                    document.getElementById('top_artist').innerHTML = lyrics;
                    // you can even pass data as parameter to your target function like myFunct(data);
                });*/
                // you can even pass data as parameter to your target function like myFunct(data);
            });


            /*
                    // define top artist name
                    topArtistName = data.recenttracks.track[0].name;

                    // load details of the artist
                    lastfm.artist.getInfo({artist: topArtistName}, {success: function(data){

                        // render the single artist info using 'lastfmTemplateArtistInfo' template
                        $('#top_artist').html(
                            $('#lastfmTemplateArtistInfo').render(data.artist)
                        );

                        // load the artis's top tracks
                        lastfm.artist.getTopTracks({artist: topArtistName, limit: 9}, {success: function(data){

                            // render the tracks using 'lastfmTemplateTracks' template
                            $('#top_tracks').html(
                                $('#lastfmTemplateTracks').render(data.toptracks.track)
                            );
                        }});

                    }, error: function(code, message){
                        alert('Error #'+code+': '+message);
                    }});
                }*/
        }
    });
});
