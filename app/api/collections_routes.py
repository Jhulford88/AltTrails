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


@collections_routes.route("/add", methods=["POST"])
def add_to_collection():
    """
    Add a trail to an existing Collection
    """
    data = request.get_json()


    new_collection_trail = insert(trail_collection).values(trail_id=data["trailId"], collection_id=data["collectionId"])

    db.session.execute(new_collection_trail)
    db.session.commit()

    return "Success!"


@collections_routes.route("/current")
def get_current_user_collections():
    """
    Grabs all the collections owned by the current user
    """

    id = current_user.id

    collections = Collection.query.filter(Collection.user_id == id)

    res = [collection.to_dict() for collection in collections]

    return {"collections": res}


@collections_routes.route("/<int:collectionId>/delete", methods=["DELETE"])
# @login_required
def delete_collection(collectionId):
    print('hello from the backend..................')
    collection = Collection.query.get(collectionId)

    if not collection:
        return {"errors": "Collection does not exist"}, 404

    db.session.delete(collection)
    db.session.commit()

    return {"message": "Succesfully Deleted Collection"}, 200

@collections_routes.route("/delete/<int:collectionId>/<int:trailId>", methods=["DELETE"])
# @login_required
def delete_from_collection(collectionId, trailId):

    delete_query = delete(trail_collection).where(
    ((trail_collection.c.trail_id == trailId) & (trail_collection.c.collection_id == collectionId)))

    db.session.execute(delete_query)
    db.session.commit()

    # collection = Collection.query.get(collectionId)

    # if not collection:
    #     return {"errors": "Collection does not exist"}, 404

    # db.session.delete(collection)
    # db.session.commit()

    return {"message": "Succesfully Deleted Trail From Collection"}, 200
