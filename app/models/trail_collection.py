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


# class Trail_Collection(db.Model):
#     __tablename__ = "trail_collections"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}


#     id = db.Column(db.Integer, primary_key=True)
#     trail_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('trails.id')), nullable=False)
#     collection_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('collections.id')), nullable=False)

#     # relationships
#     trails = db.relationship('Trail', back_populates='collections')
#     collections = db.relationship('Collection', back_populates='trail_collections')


#     def to_dict(self):
#         return{
#             'id': self.id,
#             'trailId': self.trail_id,
#             'collectionId': self.collection_id
#             }
