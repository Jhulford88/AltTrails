from app.models import db, environment, SCHEMA
from sqlalchemy import insert
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql import text
from app.models.favorite import favorites



# Adds a demo user, you can add other users here if you want
def seed_favorites():
    favorites_to_seed = [
        {'user_id':1, 'trail_id':1},
        {'user_id':1, 'trail_id':2},
        {'user_id':2, 'trail_id':3},
        {'user_id':2, 'trail_id':4},
        {'user_id':3, 'trail_id':5},
        {'user_id':3, 'trail_id':6},
        {'user_id':4, 'trail_id':7},
        {'user_id':4, 'trail_id':8}
    ]

    for favorite_data in favorites_to_seed:
        user_id = favorite_data['user_id']
        trail_id = favorite_data['trail_id']

        favorite = insert(favorites).values(user_id=user_id, trail_id=trail_id)

        try:
            db.session.execute(favorite)
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
