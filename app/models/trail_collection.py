from .db import db, environment, SCHEMA, add_prefix_for_prod

class Trail_Collection(db.Model):
    __tablename__ = "trail_collections"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    trail_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('trails.id')), nullable=False)
    collection_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('collections.id')), nullable=False)

    # relationships


    def to_dict(self):
        return{
            'id': self.id,
            'trailId': self.trail_id,
            'collectionId': self.collection_id
            }
