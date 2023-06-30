from flask import Blueprint, request
from flask_login import login_required
from app.models import User, Trail, Review, favorites, Collection, db
from app.models.trail_collection import trail_collection
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


@collections_routes.route("/new", methods=["POST"])
def create_new_collection():
    """
    Create a new Collection and add a trail to it
    """
    data = request.get_json()
    new_collection = Collection(
        name=data["collectionName"],
        user_id=current_user.id
    )
    db.session.add(new_collection)
    db.session.commit()

    new_collection_trail = insert(trail_collection).values(trail_id=data["trailId"], collection_id=new_collection.id)

    db.session.execute(new_collection_trail)
    db.session.commit()

    return "Success!"
