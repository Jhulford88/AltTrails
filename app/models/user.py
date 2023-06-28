from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .favorite import favorites


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(2), nullable=False)

    #Relationships
    reviews = db.relationship('Review', back_populates='users', cascade="all, delete")
    trail_photos = db.relationship('Trail_Photo', back_populates='users', cascade="all, delete")
    collections = db.relationship('Collection', back_populates='users', cascade="all, delete")

    favorite_trails = db.relationship(
        'Trail',
        secondary='favorites',
        back_populates='favorite_users',
        cascade="all, delete")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'city': self.city,
            'state': self.state,
            "favorites": [favorite.to_dict() for favorite in self.favorite_trails]
        }

    def reviews_to_dict(self):
        return {
            'username': self.username
        }
