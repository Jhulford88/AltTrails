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
            user_id=current_user.id,##############
            cover_photo=data["cover_photo"]
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
