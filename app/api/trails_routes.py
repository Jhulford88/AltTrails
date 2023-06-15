from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Trail
from ..forms.create_trail_form import CreateTrailForm


trails_routes = Blueprint('trails', __name__)


@trails_routes.route('/')

def getAllTrails():
    """
    Grabs all the Trails with the following joins: ???.
    Should return a JSON obj for the fronted to catch
    """
    trails = Trail.query.all()
    response = [trail.to_dict() for trail in trails]
    return {"trails": response}
