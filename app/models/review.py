from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date

class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    review_text = db.Column(db.Text, nullable=False)
    star_rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    trail_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('trails.id')), nullable=False)
    created_at = db.Column(db.Date, nullable=False, default=date.today())

    # Relationships
    users = db.relationship('User', back_populates='reviews')
    trails = db.relationship('Trail', back_populates='reviews')


    def to_dict(self):
        return{
            "id": self.id,
            "reviewText": self.review_text,
            "starRating": self.star_rating,
            "userId": self.user_id,
            "trailId": self.trail_id,
            "createdAt": self.created_at
            }
