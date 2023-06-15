from .db import db, environment, SCHEMA, add_prefix_for_prod
from .favorite import favorites
from sqlalchemy import or_

class Trail(db.Model):
    __tablename__ = 'trails'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    trail_name = db.Column(db.String(55), nullable=False, unique=True)
    park = db.Column(db.String(55), default='n/a')
    city = db.Column(db.String(55), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    lat = db.Column(db.Float(precision=6), nullable=False)
    lng = db.Column(db.Float(precision=6), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("categories.id")), nullable=False)
    length = db.Column(db.Float(precision=4), nullable=False)
    elevation_gain = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("user.id")), nullable=False)
    cover_photo = db.Column(db.String, nullable=False)

   #Relationships
    category = db.relationship("Category",back_populates="trail")
    trail_photos = db.relationship('Trail_Photo', back_populates='trail', cascade="all, delete" )
    reviews = db.relationship('Review', back_populates='trails', cascade="all, delete")
    user = db.relationship('User', back_populates='trail')

    trail_collections = db.relationship(
        'Collection',
        secondary='trail_collections',
        back_populates='trail_collections')


    favorites = db.relationship(
        'User',
        secondary='favorites',
        back_populates='favorites',
        cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'trailName': self.trail_name,
            'park': self.park,
            'city': self.city,
            'state': self.state,
            'lat': self.lat,
            'lng': self.lng,
            'categoryId': self.category_id,
            'length': self.length,
            "photos": [photo.to_dict() for photo in self.trail_photos]
        }
