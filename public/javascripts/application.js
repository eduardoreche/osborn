
  $('a[data-confirm]').on('click', function(e) {
    if( !confirm( $(this)[0].dataset['confirm']  ) )
      e.preventDefault();
  });