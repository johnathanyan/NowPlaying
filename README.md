<html>

<body>
        Chrome extension that finds the last (or current) Spotify song played and finds album info and lyrics. Made to replace musixmatch
        on Spotify ever since it stopped being offered. In reality, just me playing around with JavaScript and APIs.
    <br>
    <center> <img src = "https://github.com/johnathanyan/NowPlaying/blob/master/example.gif?raw=true"></center>
    <h1> How it works:
                    </h1>
        Spotify's API currently does not have a function to get the current song played by a user, so I got around it by scrobbling my play history to last.fm. The last.fm API has the function that Spotify's is missing, so I used it alongside the musixmatch API to search for lyrics and display them. Sample functionality is not yet implemented.
    <br>
    <h1> To Do: </h1>
     - Add sampling functionality
    <br> - Integrate with genius.com rather than musixmatch (when the former's API is updated for lyric grabbing)
    <br> - Integrate soundcloud functionality
    <br> - Tidy up CSS
    <br> - Take into consideration failures to find lyrics or song info
    <br> - Customizable API key and username
    <br>
    <h1> Thanks to: </h1>
    MusixMatch API
    <br> Felix Brun's last.fm API wrapper: https://github.com/fxb/javascript-last.fm-api
</body>

</html>