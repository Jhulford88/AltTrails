from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.favorite import Favorite


# Adds a demo user, you can add other users here if you want
def seed_favorites():
    demo1 = Favorite(
        user_id=1, trail_id=1 )
    demo2 = Favorite(
        user_id=1, trail_id=2 )
    marnie1 = Favorite(
        user_id=2, trail_id=3 )
    marnie2 = Favorite(
        user_id=2, trail_id=4 )
    bobbie1 = Favorite(
        user_id=3, trail_id=5 )
    bobbie2 = Favorite(
        user_id=3, trail_id=6 )
    user4_1 = Favorite(
        user_id=4, trail_id=7 )
    user4_2 = Favorite(
        user_id=4, trail_id=8 )




    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(marnie1)
    db.session.add(marnie2)
    db.session.add(bobbie1)
    db.session.add(bobbie2)
    db.session.add(user4_1)
    db.session.add(user4_2)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))

    db.session.commit()
