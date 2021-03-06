$(function(){
  function buildHTML(message){
    
    var image = message.image ? `<img src='${message.image}'>` :'';
 
    var html = `<div class='message' data-id="${message.id}">
      <div class='upper-message'>
        <div class='upper-message__user-name'>
        ${ message.user_name }
        </div>
      <div class='upper-message__date'>
      ${ message.created_at } 
      </div>
    </div>
      <div class='lower-meesage'>
        <p class='lower-message__content' data-massege-content="${message.id}">
        ${ message.content }
        </p>

      </div>
      ${ image } 
    </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.href;

    $.post({
      type: "POST",
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
     var html = buildHTML(data);
      $('.messages').append(html)
      $("form")[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })

    .fail(function(){
      alert('エラー');
    })
     return false;
  })

  var reloadMessages = function() {
    last_message_id = $('p:last').data("massege-content");
    group_id = location.pathname.split("/messages")

    $.ajax({
      url: group_id[0] + '/api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        var insertHTML = buildHTML(message);
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })

    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 5000);
})
