from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.collection import Collection


# Adds a demo user, you can add other users here if you want
def seed_collections():
    demo1 = Collection(
        name='Demos Favorite Trails!', user_id=1 )
    marnie2 = Collection(
        name='Marnies Favorite Trails!', user_id=2 )
    bobbie3 = Collection(
        name='Bobbies Favorite Trails!', user_id=3 )
    demo4 = Collection(
        name='Great Hikes for Families!', user_id=4 )
    demo5 = Collection(
        name='Expert Level Trails!', user_id=5 )
    demo6 = Collection(
        name='Pennsylvania Trails!', user_id=6 )
    demo7 = Collection(
        name='New York Trails!', user_id=7 )
    demo8 = Collection(
        name='Waterfalls!', user_id=8 )





    db.session.add(demo1)
    db.session.add(marnie2)
    db.session.add(bobbie3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_collections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.collections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM collections"))

    db.session.commit()
