from .db import db, environment, SCHEMA, add_prefix_for_prod



class Trail(db.Model):
    __tablename__ = 'trails'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    trail_name = db.Column(db.String(55), nullable=False, unique=True)
    park = db.Column(db.String(55), nullable=False)
    city = db.Column(db.String(55), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    lat = db.Column(db.Float(precision=6), nullable=False)
    lng = db.Column(db.Float(precision=6), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod("categories.id")), nullable=False)

   #Relationships



    def to_dict(self):
        return {
            'id': self.id,
            'trailName': self.trail_name,
            'park': self.park,
            'city': self.city,
            'state': self.state,
            'lat': self.lat,
            'lng': self.lng,
            'categoryId': self.category_id
        }
