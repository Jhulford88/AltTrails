from flask_wtf import FlaskForm
from wtforms import (StringField, TextAreaField, IntegerField, TextAreaField, DecimalField)
from wtforms.validators import DataRequired, Length


class CreateTrailForm(FlaskForm):
    trail_name = StringField('Trail Name', validators=[DataRequired()])
    park = StringField('Park', validators=[DataRequired()])
    city = StringField('City', validators=[DataRequired()])
    state = StringField('State', validators=[DataRequired(), Length(
                min=2,
                max=2,
                message="Please use the state's two character abbreviation."
            )])
    lat = DecimalField('Latitude', validators=[DataRequired()])
    lng = DecimalField('Longitude', validators=[DataRequired()])
    category_id = IntegerField("Category ID", validators=[DataRequired()])
    length = DecimalField('Length', validators=[DataRequired()])
    elevation_gain = IntegerField("Elevation Gain", validators=[DataRequired()])
    cover_photo = StringField('Cover Photo', validators=[DataRequired()])
    description = TextAreaField(
        "Description",
        validators=[DataRequired()],
    )
