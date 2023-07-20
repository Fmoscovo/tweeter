$(document).ready(function() {
  const $counter = $('.counter');
  const maxCharacters = 140;

  const colors = [
    { count: 140, color: '#0000FF' },
    { count: 120, color: '#1E90FF' },
    { count: 100, color: '#00BFFF' },
    { count: 80, color: '#00CED1' },
    { count: 60, color: '#32CD32' },
    { count: 40, color: '#FFA500' }, 
    { count: 20, color: '#FF8C00' },
    { count: 0, color: '#FF0000' }
  ];

  $('.new-tweet textarea').on('input', function() {
    const inputLength = $(this).val().length;
    const charactersLeft = maxCharacters - inputLength;
    $counter.text(charactersLeft);

    if (charactersLeft < 0) {
      $counter.css({
        color: '#FF0000', 
        animation: 'shake 1s infinite'
      });
    } else {
      const color = getColorForCharacterCount(charactersLeft);
      $counter.css({
        color: color,
        animation: 'none'
      });
    }
  });

  function getColorForCharacterCount(count) {
    for (let i = 0; i < colors.length; i++) {
      if (count >= colors[i].count) {
        return colors[i].color;
      }
    }

    return colors[0].color; // Default color
  }
});


$(document).ready(function() {
  const SCROLL_SPEED = 300;
  var $backToTop = $('.back-to-top');
  var $compose = $('#compose');
  var $composeTextarea = $('#tweet-text');

  function handleScroll() {
    if ($(this).scrollTop() > 200) {
      $backToTop.fadeIn();
     } else {
      $backToTop.fadeOut();
      $compose.fadeIn();
    }
  }

  function handleClick(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, SCROLL_SPEED);
    $('.new-tweet').slideDown('slow', function() {
      $composeTextarea.focus();
    });
  }

  $(window).scroll(handleScroll);
  $('#back-to-top').click(handleClick);
});