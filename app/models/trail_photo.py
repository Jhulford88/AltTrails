from .db import db, environment, SCHEMA, add_prefix_for_prod

class Trail_Photo(db.Model):
    __tablename__ = "trail_photos"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    photo = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    trail_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('trails.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    # Relationships
    users = db.relationship('User', back_populates='trail_photos')
    trail = db.relationship('Trail', back_populates='trail_photos')


    def to_dict(self):
        return{
            'id': self.id,
            'photo': self.photo,
            'description': self.description,
            'trailId': self.trail_id,
            'userId': self.user_id
            }
