from flask import Blueprint, request
from flask_login import login_required
from app.models import User, Trail, Review, favorites, db
from ..forms.create_trail_form import CreateTrailForm
from ..forms.review_form import ReviewForm
from flask_login import current_user, login_required
from sqlalchemy import insert
from sqlalchemy import delete

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


@trails_routes.route('/new', methods=["POST"])
def post_new_trail():
    """
    Posts form data from the frontend and sends back the new trail.
    """

    form = CreateTrailForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data

        new_trail = Trail(
            trail_name=data["trail_name"],
            park=data["park"],
            city=data["city"],
            state=data["state"],
            lat=data["lat"],
            lng=data["lng"],
            category_id=data["category_id"],
            length=data["length"],
            elevation_gain=data["elevation_gain"],
            user_id=current_user.id,
            cover_photo=data["cover_photo"],
            description=data["description"]
        )
        db.session.add(new_trail)
        db.session.commit()
        return (
            {"trail": new_trail.to_dict()},
            200,
            {"Content-Type": "application/json"},
        )

    if form.errors:
        print("There were some form errors", form.errors)
        return {"errors": form.errors}, 400, {"Content-Type": "application/json"}


@trails_routes.route("/<int:id>")
def get_single_trail(id):
    """
    Grabs a single trail by it's id
    """
    single_trail = Trail.query.get(id)

    if single_trail is None:
        return {"errors": "Project not Found"}

    response = single_trail.to_dict()
    return {"single_trail": response}


@trails_routes.route("/<int:id>/update", methods=["PUT"])
# @login_required
def update_trail(id):
    edit_form = CreateTrailForm()
    edit_form["csrf_token"].data = request.cookies["csrf_token"]

    if edit_form.validate_on_submit():
        data = edit_form.data


        updated_trail = Trail.query.get(id)

        if updated_trail is None:
            return {"errors": "Trail does not exist"}, 404

        # if updated_trail.user_id != current_user.id:
        #     return {"errors": "Forbidden"}, 401

        if data["trail_name"]:
            updated_trail.trail_name = data["trail_name"]
        if data["park"]:
            updated_trail.park = data["park"]
        if data["city"]:
            updated_trail.city = data["city"]
        if data["state"]:
            updated_trail.state = data["state"]
        if data["lat"]:
            updated_trail.lat = data["lat"]
        if data["lng"]:
            updated_trail.lng = data["lng"]
        if data["category_id"]:
            updated_trail.category_id = data["category_id"]
        if data["length"]:
            updated_trail.length = data["length"]
        if data["elevation_gain"]:
            updated_trail.elevation_gain = data["elevation_gain"]
        if data["cover_photo"]:
            updated_trail.cover_photo = data["cover_photo"]
        if data["description"]:
            updated_trail.description = data["description"]

        db.session.commit()

        print("This is your new Trail.......................", updated_trail)
        return (
            {"trail": updated_trail.to_dict()},
            200,
            {"Content-Type": "application/json"},
        )

    if edit_form.errors:
        print("There were some form errors", edit_form.errors)
        return {"errors": edit_form.errors}, 400, {"Content-Type": "application/json"}


@trails_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_single_project(id):
    """
    Takes in a trail_id from the frontend then uses that to initalize a
    delete
    """

    trail = Trail.query.get(id)

    if trail is None:
        return {"errors": "Trail does not exist"}, 404

    # if trail.user_id != current_user.id:
    #     return {"errors": "Forbidden"}, 401


    db.session.delete(trail)
    db.session.commit()

    return {"message": "Succesfully Deleted"}


@trails_routes.route("/current")
def get_current_user_trails():
    """
    Grabs all the spots owned by the current user
    """

    id = current_user.id
    print("This is the id of the current user.........", id)

    trails = Trail.query.filter(Trail.user_id == id)

    res = [trail.to_dict() for trail in trails]

    return {"trails": res}


@trails_routes.route("/reviews/<int:id>", methods=["POST"])
# @login_required
def post_new_review(id):
    """
    Posts form data from the frontend into the comments table.
    Should return a JSON obj for the fronted to catch
    """

    form = ReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        newReview = Review(
            review_text=data["review_text"],
            star_rating=data["star_rating"],
            trail_id=id,
            user_id=current_user.id
        )

        db.session.add(newReview)
        db.session.commit()

        return newReview.to_dict()

    if form.errors:
        print("There were some form errors.................", form.errors)
        return form.errors, 400


@trails_routes.route("/reviews/<int:reviewId>/update", methods=["PUT"])
def update_review(reviewId):

    edit_form = ReviewForm()
    edit_form["csrf_token"].data = request.cookies["csrf_token"]
    print("FORM..................................", edit_form)

    if edit_form.validate_on_submit():
        data = edit_form.data


        updated_review = Review.query.get(reviewId)

        if updated_review is None:
            return {"errors": "Review does not exist"}, 404

        # if updated_trail.user_id != current_user.id:
        #     return {"errors": "Forbidden"}, 401

        if data["review_text"]:
            updated_review.review_text = data["review_text"]
        if data["star_rating"]:
            updated_review.star_rating = data["star_rating"]


        db.session.commit()

        return (
            {"trail": updated_review.to_dict()},
            200,
            {"Content-Type": "application/json"},
        )

    if edit_form.errors:
        print("There were some form errors", edit_form.errors)
        return {"errors": edit_form.errors}, 400, {"Content-Type": "application/json"}


@trails_routes.route("/reviews/<int:reviewId>", methods=["DELETE"])
# @login_required
def delete_comment(reviewId):
    print("hello from delete review")
    review = Review.query.get(reviewId)

    if not review:
        return {"errors": "Review does not exist"}, 404

    db.session.delete(review)
    db.session.commit()

    return {"message": "Succesfully Deleted"}


@trails_routes.route('/favorites/<int:trailId>', methods=["POST"])
def post_new_favorite(trailId):
    """
    Posts new entry in the favorites join table.
    """
    print("hello from backend...............")

    user = User.query.get(current_user.id)

    new_favorite = insert(favorites).values(user_id=current_user.id, trail_id=trailId)

    db.session.execute(new_favorite)
    db.session.commit()

    return user.to_dict()


@trails_routes.route("/favorites/<int:trailId>/delete", methods=["DELETE"])
# @login_required
def delete_favorite(trailId):
    print("hello from delete favorite", trailId)

    delete_query = delete(favorites).where(
    ((favorites.c.trail_id == trailId) & (favorites.c.user_id == current_user.id)))

    db.session.execute(delete_query)
    db.session.commit()

    return {"message": "Succesfully Deleted"}
