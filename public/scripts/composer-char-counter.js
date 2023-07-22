// code runs when the document is ready
$(document).ready(function() {  
  const $counter = $('.counter') 
  const maxCharacters = 140;

  // Color map for the character counter
  const colors = [ 
    { count: 140, color: '#0000FF' },
    { count: 120, color: '#1E90FF' },
    { count: 100, color: '#00BFFF' },
    { count: 80, color: '#00CED1' },
    { count: 60, color: '#32CD32' },
    { count: 40, color: '#FFA500' }, 
    { count: 20, color: '#FF8C00' },
    { count: 0, color: '#000000' } 
  ];
  // Event handler for the textarea
  $('.new-tweet textarea').on('input', function() { 
    const inputLength = $(this).val().length; // Get the length of the input
    const charactersLeft = maxCharacters - inputLength; // Calculate chars left
    $counter.text(charactersLeft); // Update the counter

    if (charactersLeft < 0) {
      $counter.css({
        color: '#000000', 
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

    return colors[0].color; 
  }
});

//ready function for handling the scroll to top button
$(document).ready(function() {
  const SCROLL_SPEED = 300; // Scroll speed for animation
  var $backToTop = $('.back-to-top');
  var $compose = $('#compose');
  var $composeTextarea = $('#tweet-text');

  function handleScroll() {
    if ($(this).scrollTop() > 200) { // If the user has scrolled down 200px
      $backToTop.fadeIn();
     } else {
      $backToTop.fadeOut();
      $compose.fadeIn();
    }
  }

  function handleClick(e) { // Scroll to top when the user clicks the button
    e.preventDefault(); // Prevent default behaviour of the link
    $('html, body').animate({scrollTop: 0}, SCROLL_SPEED); // Scroll to top
    $('.new-tweet').slideDown('slow', function() { // Focus on the textarea
      $composeTextarea.focus();
    });
  }

  $(window).scroll(handleScroll); // Call handleScroll when the user scrolls
  $('#back-to-top').click(handleClick); // Call handleClick when the user clicks
});