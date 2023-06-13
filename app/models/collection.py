from .db import db, environment, SCHEMA, add_prefix_for_prod

class Collection(db.Model):
    __tablename__ = "collections"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(55), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # relationships


    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'userId': self.user_id
            }
