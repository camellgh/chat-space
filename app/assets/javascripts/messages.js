$(function(){
  function buildHTML(message){
    var image = ""
    if(message.image.url != null){
      image = `<img class="lower-message__image" src=${message.image.url}>`
    }
    console.log(image)
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
    console.log(url);
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

  function buildMessageHTML(message) {
    console.log(message)
    if (message.content && message.image_url) {
      var html = `<div class="message" data-id="${message.id}">
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${ message.user_name }
        </div>
        <div class="upper-message__date">
          ${ message.created_at}
        </div>
      </div>
      <div class="lower-meesage">
          <p class="lower-message__content" data-massege-content="${ message.id }">
            ${ message.content }
          </p>
        <%= image src=${ message.image_url}, class='lower-message__image' %>
      </div>
    </div>`
    } else if (message.content) {
      var html = `<div class="message" data-id="${message.id}">
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${ message.user_name }
        </div>
        <div class="upper-message__date">
          ${ message.created_at }
        </div>
      </div>
      <div class="lower-meesage">
          <p class="lower-message__content" data-massege-content="${ message.id }">
            ${ message.content }
          </p>
      </div>
    </div>`
    } else if (message.image_url) {
      var html = `<div class="message" data-id="${message.id}">
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${ message.user_name }
        </div>
        <div class="upper-message__date">
          ${ message.created_at }
        </div>
      </div>
      <div class="lower-meesage">
        <%= image src=${ message.image_url }, class='lower-message__image' %>
      </div>
    </div>`
    };
    return html;

  }

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('p:last').data("massege-content");
    console.log($('p:last'))
    group_id = location.pathname.split("/messages")
    console.log(group_id[0] + '/api/messages')
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: group_id[0] + '/api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      // console.log(messages);
      
      var insertHTML = '';
      messages.forEach(function(message){
        // var name = message.content
        var insertHTML = buildHTML(message);
      $('.messages').append(insertHTML)     
    })

    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
})
