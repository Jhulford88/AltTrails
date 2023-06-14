from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo1 = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='User', city='Philadelphia', state='PA')
    marnie2 = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Smith', city='Miami', state='FL')
    bobbie3 = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobbie', last_name='Young', city='Denver', state='CO')
    name4 = User(
        username='Woolf123', email='Woolf@aa.io', password='password', first_name='Virginia', last_name='Woolf', city='Pittsburg', state='PA')
    name5 = User(
        username='Kafka123', email='Kafka@aa.io', password='password', first_name='Franz', last_name='Kafka', city='Atlanta', state='GA')
    name6 = User(
        username='Carroll123', email='Carroll@aa.io', password='password', first_name='Lewis', last_name='Carroll', city='Richmond', state='VA')
    name7 = User(
        username='Vonnegut123', email='Vonnegut@aa.io', password='password', first_name='Kurt', last_name='Vonnegut', city='Charleston', state='SC')
    name8 = User(
        username='Joyce123', email='Joyce@aa.io', password='password', first_name='James', last_name='Joyce', city='Austin', state='TX')
    name9 = User(
        username='Tolstoy123', email='Tolstoy@aa.io', password='password', first_name='Leo', last_name='Tolstoy', city='Kansas City', state='MO')
    name10 = User(
        username='Dahl123', email='Dahl@aa.io', password='password', first_name='Roald', last_name='Dahl', city='New York City', state='NY')
    name11 = User(
        username='Hugo123', email='Hugo@aa.io', password='password', first_name='Victor', last_name='Hugo', city='Troy', state='NY')
    name12 = User(
        username='Plath123', email='Plath@aa.io', password='password', first_name='Sylvia', last_name='Plath', city='Boston', state='MA')
    name13 = User(
        username='Kerouac123', email='Kerouac@aa.io', password='password', first_name='Jack', last_name='Kerouac', city='Chicago', state='IL')
    name14 = User(
        username='Chekhov123', email='Chekhov@aa.io', password='password', first_name='Anton', last_name='Chekhov', city='Pheonix', state='AZ')
    name15 = User(
        username='Dostoevsky123', email='Dostoevsky@aa.io', password='password', first_name='Fyodor', last_name='Dostoevsky', city='Boise', state='ID')



    db.session.add(demo1)
    db.session.add(marnie2)
    db.session.add(bobbie3)
    db.session.add(name4)
    db.session.add(name5)
    db.session.add(name6)
    db.session.add(name7)
    db.session.add(name8)
    db.session.add(name9)
    db.session.add(name10)
    db.session.add(name11)
    db.session.add(name12)
    db.session.add(name13)
    db.session.add(name14)
    db.session.add(name15)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
