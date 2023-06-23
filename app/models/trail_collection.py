from .db import db, environment, SCHEMA, add_prefix_for_prod

trail_collection = db.Table(
    'trail_collections',
    db.Column(
        'trail_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('trails.id')),
        primary_key=True
    ),
    db.Column(
        'collection_id',
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('collections.id')),
        primary_key=True
    ),
    db.UniqueConstraint('trail_id', 'collection_id')
)

if environment == "production":
        __table_args__ = {'schema': SCHEMA}
