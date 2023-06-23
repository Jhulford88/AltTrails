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
    favorites.schema = SCHEMA
