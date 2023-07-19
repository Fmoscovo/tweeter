const createTweetElement = (tweet) => {
  const $tweetArticle = $('<article>').addClass('tweet');
  const $header = $('<header>').appendTo($tweetArticle);
  const $headerContent = $('<div>').addClass('header-content').appendTo($header);
  const $avatar = $('<img>')
    .addClass('tweet-avatar')
    .attr('src', tweet.user.avatars)
    .attr('alt', 'User Avatar')
    .appendTo($headerContent);
  const $tweetInfo = $('<div>').addClass('tweet-info').appendTo($headerContent);
  const $userName = $('<span>').addClass('user-name').text(tweet.user.name).appendTo($tweetInfo);
  const $handle = $('<span>').addClass('handle').text(tweet.user.handle).appendTo($tweetInfo);
  const $tweetContent = $('<div>').addClass('tweet-content').appendTo($tweetArticle);
  const $p = $('<p>').text(tweet.content.text).appendTo($tweetContent);
  const $hr = $('<hr>').appendTo($tweetArticle);
  const $footer = $('<footer>').appendTo($tweetArticle);
  const $tweetDate = $('<span>').addClass('tweet-date').text('4 days ago').appendTo($footer);
  const $tweetIcons = $('<div>').addClass('tweet-icons').appendTo($footer);
  const $heartIcon = $('<i>').addClass('fas fa-heart').appendTo($tweetIcons);
  const $commentIcon = $('<i>').addClass('fas fa-comment').appendTo($tweetIcons);
  const $retweetIcon = $('<i>').addClass('fas fa-retweet').appendTo($tweetArticle);

  return $tweetArticle;
};

const renderTweets = (tweets) => {
  const $tweetsContainer = $('#tweets-container');

  for (const tweet of tweets) {
    const $tweetElement = createTweetElement(tweet);
    $tweetsContainer.append($tweetElement);
  }
};

const loadInitialTweets = function() {
  $.ajax({
    url: '/server/data-files/initial-tweets.json',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      renderTweets(data);
      loadMoreTweets();
    },
    error: function(error) {
      console.error('Error loading initial tweets:', error);
    }
  });
};

const loadMoreTweets = function() {
  $.ajax({
    url: '/server/routes/tweets',
    method: 'GET',
    dataType: 'json',
    success: function(moreTweets) {
      renderTweets(moreTweets);
    },
    error: function(error) {
      console.error('Error loading more tweets:', error);
    }
  });
};

$(document).ready(function() {
  const tweetData = {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac'
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants'
    },
    created_at: 1461116232227
  };

  const $tweet = createTweetElement(tweetData);
  console.log($tweet);
  $('#tweets-container').append($tweet);

  loadInitialTweets();
});
