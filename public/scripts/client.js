/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function() {

  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      $("#tweets-container").append(tweetElement);
    }
  };

  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET"
    })
      .done((data) => {
        renderTweets(data);
      })
      .fail((err) => {
        
        console.log(err.message);
      })
      .always(() => console.log('action has been done'));
  };

const createTweetElement = function(tweet) {

  const $tweet = $("<article>").addClass("tweet");

  //user info at top
  const $header = $("<header>").appendTo($tweet);
  $("<div>").addClass("headername").appendTo($header);
  $("<img>").addClass("avatar").attr("src", tweet.user.avatars).appendTo($header.find(".headername"));
  $("<h2>").addClass("name").text(tweet.user.name).appendTo($header.find(".headername"));
  $("<span>").addClass("handle").text(tweet.user.handle).appendTo($header);

  

  //text area where tweet goes

  const $content = $("<div>").addClass("content").text(tweet.content.text).appendTo($tweet);

  //footer where the icons go
  $("<hr>").appendTo($content);

  const $footer = $("<footer>").appendTo($tweet);
  $("<span>").addClass("timestamp").text(timeago.format(tweet.created_at)).appendTo($footer);
  $("<div>").addClass("actions").appendTo($footer);
  $("<i>").addClass("fa fa-flag").appendTo($footer.find(".actions"));
  $("<i>").addClass("fa fa-retweet").appendTo($footer.find(".actions"));
  $("<i>").addClass("fa fa-heart").appendTo($footer.find(".actions"));

  return $tweet;
  };


// renderTweets();
loadTweets();




// Event listener for the submit event
$('#tweet-form').submit(function(event) {
  // Prevent the default behavior of form submission (page refresh)
  event.preventDefault();

  // Get the tweet text from the form
  const tweetText = $('#tweet-text').val();

  // Check if the tweet is empty or >140
  if (tweetText.trim() === '') {
    alert('Please enter a tweet.');
    return;
  }

  if (tweetText.length > 140) {
    alert('Tweet exceeds the character limit of 140.');
    return;
  }

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