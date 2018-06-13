class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email, presence: true, uniqueness: true
  validates :password, confirmation: true, presence: true, length: { minimum: 8, maximum: 128 }

  attr_accessor :terms_of_service
  validates :terms_of_service, acceptance: true

end
