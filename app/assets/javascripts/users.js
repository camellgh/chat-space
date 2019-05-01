$(function(){

 var search_users = $("#user-search-result");

function appendUser(users) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ users.user_name }</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ users.id }" data-user-name="${ users.user_name }">追加</div>
              </div>`
  search_users.append(html);
}

function appendErrMsgToHTML(msg) {
  var html = `<div class="chat-group-user clearfix">${ msg }</div>`
  search_users.append(html);
}
 
$('#user-search-field').on('keyup', function(e){

  var input = $("#user-search-field").val();

  $.ajax({
    type: 'GET',
    url: '/users',
    data: { keyword: input },
    dataType: 'json'
  })

  .done(function(users) {
    $("user-search-result").empty();
    if (users.length !== 0) {
      users.forEach(function(user){
        appendUser(user);
      });
    }
    else {
      appendErrMsgToHTML("該当なし")
    }
  })

  .fail(function() {
    alert('検索に失敗しました');
  })
})


function addUser(user_name, user_id) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
  <p class='chat-group-user__name'>${ user_name }</p>
  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
</div>`
$('#chat-group-users').append(html);

}

$("#user-search-result").on('click',".chat-group-user__btn--add", function(){
  var user_name = $(this).data("user-name");
  var user_id   = $(this).data("user-id");
  addUser(user_name, user_id)
  $(this).parent().remove();

})

$('#chat-group-users').on('click', '.chat-group-user__btn--remove', function(){
  $(this).parent().remove();
})

})