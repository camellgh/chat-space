class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  mount_uplorder :image, ImageUpLoader
  validates :content, presence: true, unless: :image?
end
