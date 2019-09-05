var axios = require('axios');
//
require("dotenv").config();
//
var keys = require("./keys.js");
//
var fs = require("fs");
//
var Spotify = require("node-spotify-api");
//
var spotify = new Spotify(keys.spotify);
var pa2 = process.argv[2];
var pa3 = process.argv[3];
//Execute function
usercommand(pa2, pa3);
//FUNCTIONS
function usercommand (pa2, pa3){
   switch (pa2) {
   case 'concert-this':
       Band(pa3);
       break;
   case 'spotify-this-song':
       song(pa3);
       break;
   case 'movie-this':
       movie(pa3);
       break;
   case 'do-what-it-says':
       random();
       break;
   default:
       }
}
//Funtion for Concert Info: Bands in Town
function Band(pa3){
   axios.get("https://rest.bandsintown.com/artists/" + pa3 + "/events?app_id=codingbootcamp").then((res) => {
       
   
   for (var i = 0; i < res.data.length; i++) {
          console.log("*********** Band ****************")
           console.log(i);
           console.log("Name of the Venue: " + res.data[i].venue.name);
           fs.appendFileSync("Name of the Venue: " + res.data[i].venue.name +"\n");
           console.log("Venue Location: " +  res.data[i].venue.city);
           console.log("Date of the Event: " +  res.data[i].datetime);
           console.log("**************************************************")
       }
});}


function movie(pa3){
  if (pa3 === undefined) {
      pa3 = "Mr. Nobody"
      console.log("-----------------------");
      fs.appendFileSync("log.txt", "-----------------------\n");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      fs.appendFileSync("log.txt", "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" +"\n");
      console.log("It's on Netflix!");
      fs.appendFileSync("log.txt", "It's on Netflix!\n");
  }
  var omdblink = "http://www.omdbapi.com/?t=" + pa3 + "&plot=short&apikey=trilogy";
  axios.get(omdblink,{
   }).then(dt => {
      console.log("Title: " + dt.data.Title);
      
      console.log("Release Year: " + dt.data.Year);
      
      console.log("IMDB Rating: " + dt.data.imdbRating);
       
      console.log("Country of Production: " + dt.data.Country);
       
      console.log("Language: " + dt.data.Language);
       
      console.log("Plot: " + dt.data.Plot);
      
      console.log("Actors: " + dt.data.Actors);
       
});}



function song(pa3) {
  if (pa3 === undefined) {
      pa3 = "The Sign"; //default Song
  }
  spotify.search(
      {
          type: "track",
          query: pa3
      },
      function (err, data) {
          if (err) {
              console.log("Error occurred: " + err);
              return;
          }
          var songs = data.tracks.items;
          for (var i = 0; i < songs.length; i++) {
              console.log(i);
             
              console.log("Song name: " + songs[i].name);
              
              console.log("Preview song: " + songs[i].preview_url);
               
              console.log("Album: " + songs[i].album.name);
               
              console.log("Artist(s): " + songs[i].artists[0].name);
               
           }
      }
  );
};


//function for reading out of random.txt file
function random(){
    fs.readFile('random.txt', 'utf8', function(err, data){
        if (err){
            return console.log(err);
        }
       var dataArr = data.split(',');
       UserInputs(dataArr[0], dataArr[1]);
    });
}

