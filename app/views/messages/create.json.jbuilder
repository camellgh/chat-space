json.user_id @message.user.id
json.created_at    @message.created_at.strftime("%Y/%m/%d %R")
json.(@message, :content, :image)
json.user_name @message.user.name
json.image @message.image_url
json.id @message.id
