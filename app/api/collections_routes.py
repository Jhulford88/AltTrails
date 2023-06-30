from flask import Blueprint, request
from flask_login import login_required
from app.models import User, Trail, Review, favorites, Collection, db
from ..forms.create_trail_form import CreateTrailForm
from ..forms.review_form import ReviewForm
from flask_login import current_user, login_required
from sqlalchemy import insert
from sqlalchemy import delete

collections_routes = Blueprint('collections', __name__)


@collections_routes.route('/')
def getAllCollections():
    """
    Grabs all the collections with the following joins: ???.
    Should return a JSON obj for the fronted to catch
    """
    collections = Collection.query.all()
    response = [collection.to_dict() for collection in collections]
    return {"collections": response}


@collections_routes.route("/<int:id>")
def get_single_collection(id):
    """
    Grabs a single collection by it's id
    """
    single_collection = Collection.query.get(id)

    if single_collection is None:
        return {"errors": "Collection not Found"}

    response = single_collection.to_dict()
    return {"single_collection": response}
