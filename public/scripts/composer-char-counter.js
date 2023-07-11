//character counter
$(document).ready(function() {
  let tweetLimit = 140;

  $("#tweet-text").keyup(function() {

    let charactersRemaining = tweetLimit - $(this).val().length;

    $(".counter").text(charactersRemaining);

    if (charactersRemaining < 0) {
      $(".counter").addClass("counter-overlimit");
    } else {
      $(".counter").removeClass("counter-overlimit");
    }

  });

});