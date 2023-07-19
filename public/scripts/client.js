/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) {
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
        <div class="tweet-date">${new Date(tweet.created_at).toLocaleString()}</div>
        <div class="tweet-icons">
          <i class="fas fa-heart"></i>
          <i class="fas fa-comment"></i>
          <i class="fas fa-retweet"></i>
        </div>
      </footer>
    </article>`);

  return $tweet;
}

const renderTweets = function(tweets) {
  tweets.forEach(tweet => {
    $('#tweets-container').append(createTweetElement(tweet));
  });
}

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
  },
 ];

// Initially render all tweets
$(document).ready(function() {
  renderTweets(data);
});
