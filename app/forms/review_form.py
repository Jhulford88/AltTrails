from flask_wtf import FlaskForm
from wtforms import (TextAreaField, IntegerField, TextAreaField)
from wtforms.validators import DataRequired


class ReviewForm(FlaskForm):
    review_text = TextAreaField(
        "Review Text",
        validators=[DataRequired()],
    )
    star_rating = IntegerField("Star Rating", validators=[DataRequired()])
