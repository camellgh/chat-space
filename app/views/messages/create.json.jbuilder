
json.content @message.content
json.image   @message.image_url
json.user_id @message.user.id
json.user_name @message.user.name
json.time    @message.created_at.strftime("%Y/%m/%d %R")
