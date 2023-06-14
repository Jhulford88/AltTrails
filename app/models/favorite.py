from .db import db, environment, SCHEMA, add_prefix_for_prod

favorites = db.Table(
    "favorites",
    db.Column(
        'user_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        primary_key=True
    ),
    db.Column(
        'trail_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('trails.id')),
        primary_key=True
    ),
    db.UniqueConstraint('user_id', 'trail_id')
)

if environment == "production":
        __table_args__ = {'schema': SCHEMA}


# class Favorite(db.Model):
#     __tablename__ = "favorites"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}


#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
#     trail_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('trails.id')), nullable=False)

#     # relationships
#     users = db.relationship('User', back_populates='favorites')
#     trails = db.relationship('Trail', back_populates='favorites')

#     def to_dict(self):
#         return{
#             'id': self.id,
#             'userId': self.user_id,
#             'trailId': self.trail_id
#             }
