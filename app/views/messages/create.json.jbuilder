# json.content @message.content
# json.image   @message.image_url
json.user_id @message.user.id
# json.user_name @message.user.name
json.created_at    @message.created_at.strftime("%Y/%m/%d %R")
json.(@message, :content, :image)
# json.created_at format_posted_time(@message.created_at)
json.user_name @message.user.name
json.image_url @message.image.url
#idもデータとして渡す
json.id @message.id
