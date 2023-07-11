/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


 $(document).ready(function() {

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $("#tweets-container").append(tweetElement);
    }
  };


const createTweetElement = function(tweet) {

  const $tweet = $("<article>").addClass("tweet");

  //user info at top
  const $header = $("<header>").appendTo($tweet);
  $("<img>").addClass("avatar").attr("src", tweet.user.avatars).appendTo($header);
  $("<h2>").addClass("name").text(tweet.user.name).appendTo($header);
  $("<span>").addClass("handle").text(tweet.user.handle).appendTo($header);

  

  //text area where tweet goes

  const $content = $("<div>").addClass("content").text(tweet.content.text).appendTo($tweet);

  //footer where the icons go

  const $footer = $("<footer>").appendTo($tweet);
  $("<span>").addClass("timestamp").text(tweet.created_at).appendTo($footer);
  $("<div>").addClass("actions").appendTo($footer);
  $("<i>").addClass("fa fa-flag").appendTo($footer.find(".actions"));
  $("<i>").addClass("fa fa-retweet").appendTo($footer.find(".actions"));
  $("<i>").addClass("fa fa-heart").appendTo($footer.find(".actions"));


  return $tweet;
  };



renderTweets(data);


// Event listener for the submit event
$('#tweet-form').submit(function(event) {
  // Prevent the default behavior of form submission (page refresh)
  event.preventDefault();

  let formData = $(this).serialize(); // Serialize the form data

    $.ajax({
      url: '/tweets', 
      type: 'POST', 
      data: formData, 
      success: function(response) {
        console.log('Tweet submitted successfully');
        
      },
      error: function(error) {
        console.log('Error:', error);
      }
    });
  });
});