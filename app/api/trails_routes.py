from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import User, Trail, db
from ..forms.create_trail_form import CreateTrailForm
from flask_login import current_user, login_user, logout_user, login_required


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
    print("hello from backend...............")

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
        print('newTrail in backend...........', new_trail)
        db.session.add(new_trail)
        db.session.commit()
        print("This is your new Trail.........", new_trail)
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
    # print("project...................................", single_project)

    if single_trail is None:
        return {"errors": "Project not Found"}

    response = single_trail.to_dict()
    return {"single_trail": response}


@trails_routes.route("/<int:id>/update", methods=["PUT"])
# @login_required
def update_trail(id):
    print("Updating trail.............................", id)
    edit_form = CreateTrailForm()
    edit_form["csrf_token"].data = request.cookies["csrf_token"]
    print("FORM..................................", edit_form)

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
