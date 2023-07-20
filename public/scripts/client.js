$(document).ready(function() {
  // Escaping function
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets();

  $('form').on('submit', function(event) {
    event.preventDefault();

    // Hide any existing error message
    $('#error-message').slideUp(function() {
      $(this).text('');
    });

    let tweetText = $(this).find('textarea').val();

    if (!tweetText || tweetText.trim() === '') {
      // Show an error message
      $('#error-message').text('Oops, looks like this tweet took a vacation and forgot to pack its content!').slideDown();
      return;
    }

    if (tweetText.length > 140) {
      // Show an error message
      $('#error-message').text('TLDR...Lets keep it under 140 characters, shall we?').slideDown();
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
        $('.counter').text('140'); // Reset the counter after successful submission
      },
      error: function(err) {
        console.error(err);
      }
    });
  });

  function createTweetElement(tweet) {
    // Safe text
    let safeText = escape(tweet.content.text);

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
          <p>${safeText}</p>
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


$(document).ready(function() {
  $('#compose').click(function() {
    $('.new-tweet').slideToggle('slow', function() {
      $('#tweet-text').focus();
    });
  });
});