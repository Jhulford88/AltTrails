from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.category import Category


def seed_categories():
    hiking1 = Category(
        type = "Hiking")
    mountain_biking2 = Category(
        type = "Mountain Biking")
    running3 = Category(
        type = "Running")
    walking4 = Category(
        type = "Walking")

    db.session.add(hiking1)
    db.session.add(mountain_biking2)
    db.session.add(running3)
    db.session.add(walking4)
    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
