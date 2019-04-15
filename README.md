## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, add_index|
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
 |group_id|integer|null: false, foreign_key: true|
 |user_id|integer|null: false, foreign_key: true|

 ###Association
 - belongs_to :user
 - belongs_to :group


 ##groupsテーブル

 |Column|Type|Options|
 |------|----|-------|
 |group_id|integer|null: false|
 |name|string|null: false|
 
 ###Association
- has_many :members
- has_many :messages
- has_many :users, through: :members
