from .db import db, environment, SCHEMA, add_prefix_for_prod
from .trail_collection import trail_collection

class Collection(db.Model):
    __tablename__ = "collections"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationships
    users = db.relationship('User', back_populates='collections')


    trail_collections = db.relationship(
        'Trail',
         secondary='trail_collections',
         back_populates='trail_collections')



    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'userId': self.user_id,
            'trails': [trail.to_dict() for trail in self.trail_collections]
            }
