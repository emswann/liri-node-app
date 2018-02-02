# liri-node-app

Language Interpretation and Recognition Interface. Accepts one of the following commands:
  1) my-tweets
  2) spotify-this-song <song-title>
  3) movie-this <movie-title>
  4) do-what-it-says

my-tweets: Returns the latest 20 tweets from your personal account.

spotify-this-song: Returns the first song title data from Spotify. Based on the <song-title> input.

movie-this: Returns the movie title data from OMDB. Based on the <movie-title> input.

do-what-it-says: Reads the random.txt file and chooses a command randomly. LIRI then performs the command and search based on the random line of input.

NOTE: Random.txt search term should be enclosed in quotes. Search term input from the command line does not require quotes. The input can be separated by whitespace.

  For command line -

    node liri spotify-this-song "White Christmas" 
    node liri spotify-this-song White Christmas

  For random.txt -
    spotify-this-song, "White Christmas"


## Getting Started

You should be able to download the files on your computer and run locally or access via our github pages link below:

[https://emswann.github.io/liri-node-app/](https://emswann.github.io/liri-node-app/)

### Prerequisites

Requires users own .env variables. This should include private API keys to access Twitter, Spotify and OMDB. The user will also need a Twitter account to view the latest tweets.

## Built With

* [node.js](https://nodejs.org/en/node.js) - Server side programming language.
* [Twitter](https://www.npmjs.com/package/twitter) - API access to Twitter account.
* [Spotify](https://www.npmjs.com/package/node-spotify-api) - API access to song information.
* [Request](https://www.npmjs.com/package/request) - Request package to access OMDB API.
* [OMDB API](http://www.omdbapi.com) - API access to movie information.
* [DotEnv](https://www.npmjs.com/package/dotenv) - Env package to control environment variables set for each specific user.

## Contributing

Please feel free to offer any suggestions. As always, programming is a work of art in progress.

## Author

* **Elaina Swann** - [Github](https://github.com/emswann)

