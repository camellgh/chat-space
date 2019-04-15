## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, add_index|
|email|string|null: false, unique: true, add_index|
|password|string|null: false, add_index|

###Association
- has_many :members
- has_many :messages
- has_many :groups, through: :members
 

 ##messagesテーブル

 |Column|Type|Options|
 |------|----|-------|
 |body|text|null: false|
 |image|string|
 |group_id|references|null: false, foreign_key: true|
 |user_id|references|null: false, foreign_key: true|

 ###Association
 - belongs_to :user
 - belongs_to :group


 ##groupsテーブル

 |Column|Type|Options|
 |------|----|-------|
 |name|string|null: false|
 
 ###Association
- has_many :members
- has_many :messages
- has_many :users, through: :members
