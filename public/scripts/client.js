$(document).ready(function() {
  // Escaping function
  const escape = function(str) { // Prevents XSS
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets(); // Load tweets on page load

  $('form').on('submit', function(event) { // Event handler for the form
    event.preventDefault();

    let tweetText = $(this).find('textarea').val(); // Get the tweet text

    if (!tweetText || tweetText.trim() === '') { // If the tweet is empty
      $('#error-message').text('Oops, looks like this tweet took a vacation and forgot to pack its content!');
      $('#error-message').slideDown();
      setTimeout(function() { $('#error-message').slideUp(); }, 7000);
      return;
    }

    if (tweetText.length > 140) { // If the tweet is too long
      $('#error-message').text('TLDR...Lets keep it under 140 characters, shall we?');
      $('#error-message').slideDown();
      setTimeout(function() { $('#error-message').slideUp(); }, 7000);
      return;
    }

    let formData = $(this).serialize();

    $.ajax({ // Send the tweet to the server
      url: '/tweets',
      method: 'POST',
      data: formData,
      success: function(response) {
        $('#error-message').slideUp();
        fetchLatestTweets(); // Fetch the latest tweets
        $('form').trigger('reset'); // Reset the form
        $('.counter').text('140');// 
      },
      error: function(err) {
        console.error(err);
      }
    });
  });

  function createTweetElement(tweet) { // Creates a tweet element
   
    let safeText = escape(tweet.content.text);
    // create the tweet HTML using template literal
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

  function renderTweets(tweets) { // Renders the tweets
    $('#tweets-container').empty(); 

    tweets.forEach(tweet => { // Loop through tweets
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet); // Add tweet element to the page
    });

    updateTimestamps(); // Update the timestamps for each tweet
  }

  function loadTweets() { //Function to load tweets using AJAX GET request
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
        renderTweets(tweets); // Render the fetched tweets
      },
      error: function(err) {
        console.error(err);
      }
    });
  }

  function fetchLatestTweets() { // Fetch the latest tweets
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
        renderTweets(tweets); // Render the fetched tweets
      },
      error: function(err) {
        console.error(err);
      }
    });
  }

  function updateTimestamps() { // Update the timestamps for each tweet
    $('.tweet-date').each(function() {
      const timestamp = $(this).data('timestamp');
      const formattedTimestamp = timeago.format(timestamp); //Format timestamp
      $(this).text(formattedTimestamp); // Update the timestamp text
    });
  }
});


$(document).ready(function() { //Event handler for "Compose" button click
  $('#compose').click(function() {
    $('.new-tweet').slideToggle('slow', function() { //Toggle tweet form
      $('#tweet-text').focus();
    });
  });
});
