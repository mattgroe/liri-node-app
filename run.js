//File to run my LIRI app
require("dotenv").config();

const fs = require('fs');

var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var omdb = require('omdb');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];
var input2 = process.argv[3];


function mytweets(){
    client.get(
        '/statuses/user_timeline.json',
        { screen_name: 'fomrarmgee', count: 5 },
    //callback of HTTP 'GET' Method to Twitter API
    //@param tweets - response object
    //@param error - any error that arises
    function (error, tweets) {
        //@param n - counter variable for console.log()
        var n = 5;
        //@function printTweets() - prints each tweet.
        function printTweets(object){
            object.forEach( function print(object){
                console.log("Tweet #"+n+": " + object.text);
                n--;
            });
        }
        //catches error if not then prints tweets...
        error ? console.log(error) : printTweets(tweets);
                //Looks, tweets are in here!
                //this function is called a "callback"
            }
    );
};

function song(){
    input2 != null ? 
    [
            spotify
                .search({ type: 'track', query: input2 })
                .then(function (response) {
                    console.log(response.tracks.items[0]);
                })
                .catch(function (err) {
                    console.log(err);
                })
    ]
    :
    [    fs.readFile('./random.txt', 'utf-8', (err, data) => {
            console.log(data);
            var trackdata = data.split(',');
            console.log(trackdata);
            err ? console.log(err) : [
                spotify
                .search({ type: 'track', query: trackdata[1] })
                .then(function (response) {
                    console.log(response.tracks.items[0]);
                })
                .catch(function (err) {
                    console.log(err);
                })]
        })]
}

function movies(){
    omdb.search(input2, function (err, movies) {
        if (err) {
            return console.error(err);
        }

        if (movies.length < 1) {
            return console.log('No movies were found!');
        }

        movies.forEach(function (movie) {
            console.log('%s (%d)', movie.title, movie.year);
        });
    });
}

if (input == "do-what-it-says"){
    switch (input, input2) {
        case 'spotify-this-song':
            song();
            break;
        case 'my-tweets':
            mytweets();
            break;
        case 'movie-this':
            movie();
    }
} else if (input == "movie-this") {
    movies();
} else if (input == "spotify-this-song") {
    song();
} else if (input == "my-tweets") {
    mytweets();
}
