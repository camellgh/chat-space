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
 