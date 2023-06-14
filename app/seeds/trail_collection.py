from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.trail_collection import trail_collection
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

        trail_collection_to_insert = insert(trail_collection).values(trail_id=trail_id, collection_id=collection_id)

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


    # demo1 = Trail_Collection(
    #     trail_id=1, collection_id=1 )
    # demo2 = Trail_Collection(
    #     trail_id=2, collection_id=1 )
    # demo3 = Trail_Collection(
    #     trail_id=3, collection_id=1 )
    # demo4 = Trail_Collection(
    #     trail_id=4, collection_id=1 )
    # marnie1 = Trail_Collection(
    #     trail_id=5, collection_id=2 )
    # marnie2 = Trail_Collection(
    #     trail_id=6, collection_id=2 )
    # marnie3 = Trail_Collection(
    #     trail_id=7, collection_id=2 )
    # marnie4 = Trail_Collection(
    #     trail_id=8, collection_id=2 )
    # bobbie1 = Trail_Collection(
    #     trail_id=9, collection_id=3 )
    # bobbie2 = Trail_Collection(
    #     trail_id=10, collection_id=3 )
    # bobbie3 = Trail_Collection(
    #     trail_id=11, collection_id=3 )
    # bobbie4 = Trail_Collection(
    #     trail_id=12, collection_id=3 )
    # demo4_1 = Trail_Collection(
    #     trail_id=13, collection_id=4 )
    # demo4_2 = Trail_Collection(
    #     trail_id=14, collection_id=4 )
    # demo4_3 = Trail_Collection(
    #     trail_id=15, collection_id=4 )
    # demo4_4 = Trail_Collection(
    #     trail_id=16, collection_id=4 )
    # demo5_1 = Trail_Collection(
    #     trail_id=2, collection_id=5 )
    # demo5_2 = Trail_Collection(
    #     trail_id=4, collection_id=5 )
    # demo5_3 = Trail_Collection(
    #     trail_id=6, collection_id=5 )
    # demo5_4 = Trail_Collection(
    #     trail_id=8, collection_id=5 )
    # demo6_1 = Trail_Collection(
    #     trail_id=1, collection_id=6 )
    # demo6_2 = Trail_Collection(
    #     trail_id=4, collection_id=6 )
    # demo6_3 = Trail_Collection(
    #     trail_id=16, collection_id=6 )
    # demo6_4 = Trail_Collection(
    #     trail_id=19, collection_id=6 )
    # demo7_1 = Trail_Collection(
    #     trail_id=10, collection_id=7 )
    # demo7_2 = Trail_Collection(
    #     trail_id=11, collection_id=7 )
    # demo7_3 = Trail_Collection(
    #     trail_id=25, collection_id=7 )
    # demo7_4 = Trail_Collection(
    #     trail_id=26, collection_id=7 )
    # demo8_1 = Trail_Collection(
    #     trail_id=4, collection_id=8 )
    # demo8_2 = Trail_Collection(
    #     trail_id=7, collection_id=8 )
    # demo8_3 = Trail_Collection(
    #     trail_id=9, collection_id=8 )
    # demo8_4 = Trail_Collection(
    #     trail_id=1, collection_id=8 )

    # collections=[demo1,
    #              demo2,
    #              demo3,
    #              demo4,
    #              marnie1,
    #              marnie2,
    #              marnie3,
    #              marnie4,
    #              bobbie1,
    #              bobbie2,
    #              bobbie3,
    #              bobbie4,
    #              demo4_1,
    #              demo4_2,
    #              demo4_3,
    #              demo4_4,
    #              demo5_1,
    #              demo5_2,
    #              demo5_3,
    #              demo5_4,
    #              demo6_1,
    #              demo6_2,
    #              demo6_3,
    #              demo6_4,
    #              demo7_1,
    #              demo7_2,
    #              demo7_3,
    #              demo7_4,
    #              demo8_1,
    #              demo8_2,
    #              demo8_3,
    #              demo8_4]




    # [db.session.add(collection) for collection in collections]


    # db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
# def undo_trail_collections():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.trail_collections RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute(text("DELETE FROM trail_collections"))

#     db.session.commit()
