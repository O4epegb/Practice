'use script';


$(function() {

  $.get('/blocks', appendToList);

  function appendToList(blocks) {
    var list = [];
    blocks.forEach(function(block) {
      content = '<a href="/blocks/' + block + '">' + block +'</a> <button data-block="' + block + '">X</button>';
      list.push($('<li>', { html: content }));
    });
    $('.block-list').append(list);
  };

  $('form').on('submit', function (e) {
    e.preventDefault();
    var form = $(this);
    var blockData = form.serialize();

    $.ajax({
      type: 'POST',
      url: '/blocks',
      data: blockData
    }).done(function (blockName) {
      appendToList([blockName]);
      form.trigger('reset');
    });
  });

  $('.block-list').on('click', 'button[data-block]', function (e) {
    if (!confirm("Are you sure?")) {
      return false;
    }
    var target = $(e.currentTarget);
    $.ajax({
      type: 'DELETE',
      url: '/blocks/' + target.data('block')
    }).done(function () {
      target.parents('li').remove();
    });
  });

});
