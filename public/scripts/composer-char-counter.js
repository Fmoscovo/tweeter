    $(document).ready(function() {
      const $counter = $('.counter');
      const maxCharacters = 140;
  
      $('.new-tweet textarea').on('input', function() {
        const inputLength = $(this).val().length;
        const charactersLeft = maxCharacters - inputLength;
        $counter.text(charactersLeft); 
        if (charactersLeft < 0) {
          $counter.addClass('invalid');
        } else {
          $counter.removeClass('invalid');
        }
      });
    });

    //.val() -> .val() is used to get the value of form elements such as input, select and textarea.

    //.text() -> .text() is used to get the text content of an element.
     
    //.addClass() -> .addClass() is used to add one or more class names to the selected elements.

    //.removeClass() -> .removeClass() is used to remove one or more class names from the selected elements.