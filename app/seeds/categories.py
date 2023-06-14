from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.category import Category


def seed_categories():
    hiking = Category(
        type = "Hiking")
    mountain_biking = Category(
        type = "Mountain Biking")
    running = Category(
        type = "Running")
    walking = Category(
        type = "Walking")

    db.session.add(hiking)
    db.session.add(mountain_biking)
    db.session.add(running)
    db.session.add(walking)
    db.session.commit()


def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
