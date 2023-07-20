$(document).ready(function() {
  loadTweets();

  $('form').on('submit', function(event) {
    event.preventDefault();

    let tweetText = $(this).find('textarea').val();

    if (!tweetText || tweetText.trim() === '') {
      alert('Tweet content is not present');
      return;
    }

    if (tweetText.length > 140) {
      alert('Tweet content is too long');
      return;
    }

    let formData = $(this).serialize();

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: function(response) {
        fetchLatestTweets(); // Fetch the latest tweets after successful submission
        $('form').trigger('reset'); // Reset the form after successful submission
      },
      error: function(err) {
        console.error(err);
      }
    });
  });

  function createTweetElement(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <img class="tweet-avatar" src="${tweet.user.avatars}" alt="Avatar" />
          <div class="tweet-info">
            <span class="user-name">${tweet.user.name}</span>
            <span class="handle">${tweet.user.handle}</span>
          </div>
        </header>
        <div class="tweet-content">
          <p>${tweet.content.text}</p>
        </div>
        <footer class="tweet-footer">
          <div class="tweet-date" data-timestamp="${tweet.created_at}"></div>
          <div class="tweet-icons">
            <i class="fas fa-heart"></i>
            <i class="fas fa-comment"></i>
            <i class="fas fa-retweet"></i>
          </div>
        </footer>
      </article>`);

    return $tweet;
  }

  function renderTweets(tweets) {
    $('#tweets-container').empty(); // Clear the container before rendering

    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    });

    updateTimestamps(); // Call the function to update timestamps
  }

  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
        renderTweets(tweets);
      },
      error: function(err) {
        console.error(err);
      }
    });
  }

  function fetchLatestTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
        renderTweets(tweets);
      },
      error: function(err) {
        console.error(err);
      }
    });
  }

  function updateTimestamps() {
    $('.tweet-date').each(function() {
      const timestamp = $(this).data('timestamp');
      const formattedTimestamp = timeago.format(timestamp);
      $(this).text(formattedTimestamp);
    });
  }
});
