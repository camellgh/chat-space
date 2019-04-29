$(function(){
  function buildHTML(message){
    var image = message.image ? message.image :""

    var html =  `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                         ${ message.user_name }
                    </div>
                      <div class="upper-message__date">
                         ${ message.time } 
                      </div>
                    </div>
                  <div class="lower-meesage">
                      <p class="lower-message__content">
                         ${ message.content } 
                      </p>
                  </div>
                  <image src="${ image }">
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
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
})
