from flask import Blueprint, request
from flask_login import login_required
from app.models import User, Trail, Review, favorites, db
from ..forms.create_trail_form import CreateTrailForm
from ..forms.review_form import ReviewForm
from flask_login import current_user, login_required
from sqlalchemy import insert
from sqlalchemy import delete

collections_routes = Blueprint('collections', __name__)
