from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.trail import Trail


def seed_trails():
    hiking1 = Trail(
        trail_name='Mount Minsi via Appalachian Trail', park='Delaware Water Gap', city='Stroudsburg', state='PA', lat=40.9797353, lng=-75.1415383, category_id=1, length=4.8, elevation_gain=1036)
    hiking2 = Trail(
        trail_name='Black Bear Wilderness Area Trail', park='Black Bear Wilderness Area', city='Sanford', state='FL', lat=28.8029, lng=81.2695, category_id=1, length=7.3, elevation_gain=29)
    hiking3 = Trail(
        trail_name='Dream Lake Trail', park='Rocky Mountain National Park', city='Estes Park', state='CO', lat=40.30972, lng=-105.65702, category_id=1, length=2, elevation_gain=459)
    hiking4 = Trail(
        trail_name='Ricketts Glenn Falls Trail Loop', park='Ricketts Glenn State Park', city='Ripple', state='PA', lat=41.3265322, lng=-76.2878003, category_id=1, length=4.1, elevation_gain=866)
    hiking5 = Trail(
        trail_name='Mount Yonah Trail', park='Chattahoochee-Oconee National Forest', city='Clevland', state='GA', lat=34.6373228, lng=-83.7256391, category_id=1, length=4.1 , elevation_gain=1453  )
    hiking6 = Trail(
        trail_name='Old Rag Mountain Loop', park='Shenandoah National Park', city='Etlan', state='VA', lat=38.55166, lng=-78.31428, category_id=1, length=9.3 , elevation_gain=2595  )
    hiking7 = Trail(
        trail_name='Rainbow Falls Trail', park='Jones Gap State Park', city='Clevland', state='SC', lat=35.0715, lng=82.5216, category_id=1, length=4.4 , elevation_gain=1181  )
    hiking8 = Trail(
        trail_name='Guadalupe Peak Trail', park='Guadalupe Mountains National Park', city='Salt Flat', state='TX', lat=31.7453, lng=105.0809, category_id=1, length=8.1 , elevation_gain=2949)
    hiking9 = Trail(
        trail_name='Riverscene Trail', park='Castlewood State Park', city='Ballwin', state='MO', lat=38.5951, lng=90.5462, category_id=1, length=3.4 , elevation_gain=282)
    hiking10 = Trail(
        trail_name='Bear Mountain Loop Trail', park='Bear Mountain State Park', city='Ft. Clinton', state='NY', lat=41.31789, lng=-73.99399, category_id=1, length=3.8 , elevation_gain=1154)
    hiking11 = Trail(
        trail_name='Cornish Estate Trail', park='Hudson Highlands State Park Preserve', city='Cold Spring', state='NY', lat=41.4201, lng=73.9546, category_id=1, length=1.8 , elevation_gain=190)
    hiking12 = Trail(
        trail_name='Great Blue Hill via Skyline Trail', park='Blue Hill Reservation', city='Milton', state='MA', lat=42.2134586, lng=-71.1123258, category_id=1, length=3.1, elevation_gain=813)
    hiking13 = Trail(
        trail_name='Little Grand Canyon Trail', park='Shawnee National Forest', city='Pomona', state='IL', lat=37.6281, lng=89.3368, category_id=1, length=3.4, elevation_gain=508)
    hiking14 = Trail(
        trail_name='Devils Bridge Trail', park='Coconino National Forest', city='Sedona', state='AZ', lat=34.9028, lng=-111.81374, category_id=1, length=3.9 , elevation_gain=521)
    hiking15 = Trail(
        trail_name='Tubbs Hill', park='Tubbs Hill Park', city="Coeur d'Alene", state='ID', lat=47.6735, lng=116.7812, category_id=1, length=2.1, elevation_gain=291)
    biking1 = Trail(
        trail_name='Pulpit Rock and Pinnacle Loop', park='Appalachian National Scenic Trail', city='Hamburg', state='PA', lat=40.59654, lng=-75.93164, category_id=2, length=9.2, elevation_gain=1259)
    biking2 = Trail(
        trail_name='Quiet Waters Mountain Bike Trail', park='Quiet Waters Park', city='Deerfield Beach', state='FL', lat=26.3184, lng=80.0998, category_id=2, length=4.6, elevation_gain=42)
    biking3 = Trail(
        trail_name='Red Rocks and Morrison Slide Trails', park='Matthews Winters Open Space Park', city='Morrison', state='CO', lat=39.6536, lng=105.1911, category_id=2, length=3, elevation_gain=679)
    biking4 = Trail(
        trail_name='Trexler Border Trail', park='Trexler Nature Preserve', city='Schnecksville', state='PA', lat=40.6749, lng=75.6179, category_id=2, length=8.9, elevation_gain=1371)
    biking5 = Trail(
        trail_name='Iron Hill Trail', park='Red Top Mountain State Park', city='Cartersville', state='GA', lat=34.1651, lng=84.7999, category_id=2, length=3.4, elevation_gain=141)
    biking6 = Trail(
        trail_name='Buttermilk Trail', park='James River Park', city='Richmond', state='VA', lat=37.5407, lng=77.4360, category_id=2, length=4.5, elevation_gain=410)
    biking7 = Trail(
        trail_name='Sulphur Springs Trail', park='Paris Mountain State Park', city='Greenville', state='SC', lat=34.8526, lng=82.3940, category_id=2, length=4.5, elevation_gain=695)
    biking8 = Trail(
        trail_name='The Lighthouse Trail', park='Palo Duro Canyon State Park', city='Canyon', state='TX', lat=34.9373, lng=101.6589, category_id=2, length=5.8, elevation_gain=521)
    biking9 = Trail(
        trail_name='Grotpeter Trail', park='Castlewood State Park', city='Valley Park', state='MO', lat=38.5492, lng=90.4926, category_id=2, length=4.8, elevation_gain=380)
    biking10 = Trail(
        trail_name='Scarface Mountain', park='Saranac Lakes Wild Forest', city='Ray Brook', state='NY', lat=44.3002, lng=74.0830, category_id=2, length=7.4, elevation_gain=1584)
    biking11 = Trail(
        trail_name='Marcy Dam Trail', park='High Peaks Wilderness', city='Lake Placid', state='NY', lat=44.2795, lng=73.9799, category_id=2, length=4.3, elevation_gain=446)
    biking12 = Trail(
        trail_name='Battle Road Trail', park='Minute Man National Historic Park', city='Concord', state='MA', lat=42.4604, lng=71.3489, category_id=2, length=4.6, elevation_gain=239)
    running1 = Trail(
        trail_name='Hawk Falls Trail', park='Hickory Run State Park', city='Albrightsville', state='PA', lat=41.0145, lng=75.6010, category_id=3, length=1.2, elevation_gain=134)
    running2 = Trail(
        trail_name='Weedon Island Preserve Trail', park='Weedon Island Preserve', city='St. Petersburg', state='FL', lat=27.7676, lng=82.6403, category_id=3, length=4.3, elevation_gain=9)
    running3 = Trail(
        trail_name='Royal Arch Trail', park='Chautauqua Trailhead', city='Boulder', state='CO', lat=39.9845, lng=105.29152, category_id=3, length=3.4, elevation_gain=1469)
    running4 = Trail(
        trail_name='Wissahickon Gorge North Loop', park='Wissahickon Valley Park', city='Lafayette Hill', state='PA', lat=40.0927, lng=75.2532, category_id=3, length=5.4, elevation_gain=738)
    running5 = Trail(
        trail_name='Raven Cliff Falls Trail', park='Raven Cliffs Wilderness', city='Helen', state='GA', lat=34.723182, lng=83.82333, category_id=3, length=4.9, elevation_gain=623)
    running6 = Trail(
        trail_name='Dragons Tooth Trail', park='Jefferson National Forest', city='Catawba', state='VA', lat=37.3827, lng=80.1097, category_id=3, length=4.5, elevation_gain=1256)
    running7 = Trail(
        trail_name='Brissy Ridge', park='Paris Mountain State Park', city='Freenville', state='SC', lat=34.8546, lng=82.3920, category_id=3, length=2.2, elevation_gain=485)
    running8 = Trail(
        trail_name='Emory Peak Trail', park='Big Bend National Forest', city='Terlingua', state='TX', lat=29.3216, lng=103.6160, category_id=3, length=9.8, elevation_gain=2493)
    walking1 = Trail(
        trail_name='Mount Misery Trail', park='Valley Forge National Historical Park', city='Chesterbrook', state='PA', lat=40.0757, lng=75.4591, category_id=4, length=2.9, elevation_gain=675)
    walking2 = Trail(
        trail_name='Kolokee Loop Trail', park='Little Big Econ State Forest', city='Geneva', state='FL', lat=28.7397, lng=81.1151, category_id=4, length=5.1, elevation_gain=78)
    walking3 = Trail(
        trail_name='Green Mountain Trail', park='William F Hayden Green Mountain Park', city='Denver', state='CO', lat=39.7392, lng=104.9903, category_id=4, length=6.4, elevation_gain=1082)
    walking4 = Trail(
        trail_name='Schuylkill River Trail', park='Fairmount Park', city='Philadelphia', state='PA', lat=39.9526, lng=75.1652, category_id=4, length=24.7, elevation_gain=485)
    walking5 = Trail(
        trail_name='Amicalola Falls', park='Amicalola Falls State Park', city='Dawsonville', state='GA', lat=34.4212, lng=84.1191, category_id=4, length=0.3, elevation_gain=242)
    walking6 = Trail(
        trail_name='Great Falls Overlook Trail', park='Chesapeake Canal National historical Park', city='Great Falls', state='VA', lat=38.9982, lng=77.2883, category_id=4, length=1.4, elevation_gain=45)
    walking7 = Trail(
        trail_name='Yellow branch Falls Trail', park='Sumter National Forest', city='Walhalla', state='SC', lat=34.7648, lng=83.0640, category_id=4, length=3.1, elevation_gain=465)
    walking8 = Trail(
        trail_name='River Place Panther Hollow and Canyon Trail', park='National Preserve at River Place', city='West Lake Hills', state='TX', lat=30.2980, lng=97.8020, category_id=4, length=5.5, elevation_gain=823)

    trails = [hiking1,
              hiking2,
              hiking3,
              hiking4,
              hiking5,
              hiking6,
              hiking7,
              hiking8,
              hiking9,
              hiking10,
              hiking11,
              hiking12,
              hiking13,
              hiking14,
              hiking15,
              biking1,
              biking2,
              biking3,
              biking4,
              biking5,
              biking6,
              biking7,
              biking8,
              biking9,
              biking10,
              biking11,
              biking12,
              running1,
              running2,
              running3,
              running4,
              running5,
              running6,
              running7,
              running8,
              walking1,
              walking2,
              walking3,
              walking4,
              walking5,
              walking6,
              walking7,
              walking8]

    [db.session.add(trail) for trail in trails]

    db.session.commit()


def undo_trails():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.trails RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM trails"))

    db.session.commit()
