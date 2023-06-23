from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.trail_collection import trail_collections
from sqlalchemy import insert
from sqlalchemy.exc import IntegrityError

# Adds a demo user, you can add other users here if you want
def seed_trail_collections():
    trail_collections_to_seed = [
        {'trail_id':1, 'collection_id':1},
        {'trail_id':2, 'collection_id':1},
        {'trail_id':3, 'collection_id':1},
        {'trail_id':4, 'collection_id':1},
        {'trail_id':5, 'collection_id':2},
        {'trail_id':6, 'collection_id':2},
        {'trail_id':7, 'collection_id':2},
        {'trail_id':8, 'collection_id':2},
        {'trail_id':9, 'collection_id':3},
        {'trail_id':10, 'collection_id':3},
        {'trail_id':11, 'collection_id':3},
        {'trail_id':12, 'collection_id':3},
        {'trail_id':13, 'collection_id':4},
        {'trail_id':14, 'collection_id':4},
        {'trail_id':15, 'collection_id':4},
        {'trail_id':16, 'collection_id':4},
        {'trail_id':2, 'collection_id':5},
        {'trail_id':4, 'collection_id':5},
        {'trail_id':6, 'collection_id':5},
        {'trail_id':8, 'collection_id':5},
        {'trail_id':1, 'collection_id':6},
        {'trail_id':4, 'collection_id':6},
        {'trail_id':16, 'collection_id':6},
        {'trail_id':19, 'collection_id':6},
        {'trail_id':10, 'collection_id':7},
        {'trail_id':11, 'collection_id':7},
        {'trail_id':25, 'collection_id':7},
        {'trail_id':26, 'collection_id':7},
        {'trail_id':4, 'collection_id':8},
        {'trail_id':7, 'collection_id':8},
        {'trail_id':9, 'collection_id':8},
        {'trail_id':1, 'collection_id':8}
    ]

    for trail_collection_data in trail_collections_to_seed:
        trail_id = trail_collection_data['trail_id']
        collection_id = trail_collection_data['collection_id']

        trail_collection_to_insert = insert(trail_collections).values(trail_id=trail_id, collection_id=collection_id)

        try:
            db.session.execute(trail_collection_to_insert)
            db.session.commit()
        except IntegrityError as e:
            db.session.rollback()


def undo_trail_collections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.trail_collections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM trail_collections"))

    db.session.commit()
