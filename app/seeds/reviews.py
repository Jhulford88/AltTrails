from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.review import Review


# Adds a demo user, you can add other users here if you want
def seed_reviews():
    demo1 = Review(
        review_text="I recently had an incredible hiking experience on the Mount Minsi via Appalachian Trail in Delaware Water Gap, Stroudsburg, PA. This 4.8-mile trail offers breathtaking scenic beauty and a challenging yet rewarding adventure. With an elevation gain of 1036 feet, the trail presents a good workout for hikers. The picturesque surroundings, including lush greenery and stunning vistas, make every step worthwhile. Whether you're a seasoned hiker or just starting out, this trail provides an excellent opportunity to connect with nature and enjoy a fulfilling outdoor adventure.", star_rating= 4, user_id=1, trail_id=1 )
    demo2 = Review(
        review_text="The Mount Minsi via Appalachian Trail in Delaware Water Gap near Stroudsburg, PA offers a thrilling and rewarding hiking experience. With a length of 4.8 miles and an elevation gain of 1036 feet, this trail presents a moderate challenge for outdoor enthusiasts. The scenic beauty of the surrounding nature, including breathtaking views and lush greenery, makes the hike truly enjoyable. The well-maintained path ensures a smooth trek, while the diverse terrain adds excitement and variety to the journey. Whether you're a seasoned hiker or a beginner looking for an invigorating adventure, Mount Minsi via Appalachian Trail is a must-visit destination.", star_rating= 5, user_id=2, trail_id=1 )
    demo3 = Review(
        review_text="The Black Bear Wilderness Area Trail in Sanford, FL, is a hidden gem for nature lovers and outdoor enthusiasts. Spanning 7.3 miles with a minimal elevation gain of 29 feet, this trail offers a leisurely and scenic hike suitable for all skill levels. Located within the picturesque Black Bear Wilderness Area, the trail provides a serene and immersive experience with its diverse flora and fauna. The well-marked path guides visitors through lush landscapes, tranquil marshes, and alongside the beautiful Black Bear Creek. With its abundant wildlife and peaceful surroundings, the Black Bear Wilderness Area Trail is an ideal escape into nature for a rejuvenating outdoor adventure.", star_rating= 5, user_id=3, trail_id=2 )
    demo4 = Review(
        review_text="The Black Bear Wilderness Area Trail in Sanford, FL, may not be everyone's cup of tea. Stretching over 7.3 miles with a mere 29 feet of elevation gain, this trail falls short in terms of challenging terrain and variety. While the Black Bear Wilderness Area itself boasts natural beauty, the trail lacks scenic diversity and fails to deliver breathtaking views. Additionally, the minimal elevation gain may disappoint those seeking a more exhilarating hiking experience. Although the trail is well-marked, it can be crowded at times, detracting from the tranquility one would hope for in a wilderness area. Overall, while it may serve as a decent option for a casual stroll, the Black Bear Wilderness Area Trail might leave avid hikers desiring more excitement and visual splendor.", star_rating= 3, user_id=4, trail_id=2 )
    demo5 = Review(
        review_text="The Dream Lake Trail in Rocky Mountain National Park, located in Estes Park, CO, is an absolute dream come true for hikers. With a length of 2 miles and an elevation gain of 459 feet, this trail packs a punch in a compact distance. The journey to Dream Lake is nothing short of enchanting, surrounded by breathtaking mountain views, lush alpine meadows, and sparkling streams. As you ascend, the trail rewards you with awe-inspiring vistas and the tranquil beauty of Dream Lake itself, nestled in a pristine alpine basin. The well-maintained path ensures a smooth and enjoyable hike, suitable for hikers of various skill levels. Whether you're a nature enthusiast or simply seeking a peaceful escape, the Dream Lake Trail promises an unforgettable experience in the heart of the Rocky Mountains.", star_rating= 5, user_id=5, trail_id=3 )
    demo6 = Review(
        review_text="The Dream Lake Trail in Rocky Mountain National Park, near Estes Park, CO, is an absolute dream come true for hikers. This 2-mile trail with an elevation gain of 459 feet takes you on a breathtaking journey through awe-inspiring alpine landscapes and enchanting forests. The trail leads to the picturesque Dream Lake, nestled among majestic peaks and surrounded by pristine wilderness. The crystal-clear waters mirror the surrounding mountains, creating a truly surreal and awe-inspiring vista. The well-maintained path, along with informative signage, ensures a smooth and enjoyable hiking experience. Whether you're an experienced hiker or a nature enthusiast seeking a tranquil escape, the Dream Lake Trail is an absolute must-visit, offering a slice of mountain paradise that will leave you in awe of nature's grandeur.", star_rating= 4, user_id=6, trail_id=3 )
    demo7 = Review(
        review_text="The Ricketts Glen Falls Trail Loop in Ricketts Glen State Park, near Ripple, PA, is a must-see natural wonder that promises an unforgettable hiking experience. Spanning 4.1 miles with an elevation gain of 866 feet, this trail treats hikers to a captivating display of cascading waterfalls and lush greenery. The trail meanders through a scenic forest, leading visitors to a series of breathtaking waterfalls, including the majestic 94-foot Ganoga Falls. The well-maintained path features stone steps and handrails to ensure safety while exploring the stunning scenery. Although the trail can be challenging at times, the mesmerizing beauty of the waterfalls makes every step worth it. Whether you're a seasoned hiker or an admirer of natural wonders, the Ricketts Glen Falls Trail Loop is a must-visit destination that will leave you in awe of its majestic splendor.", star_rating= 5, user_id=7, trail_id=4 )
    demo8 = Review(
        review_text="The Ricketts Glen Falls Trail Loop in Ricketts Glen State Park, located in Ripple, PA, is a must-visit for waterfall enthusiasts and avid hikers. This 4.1-mile trail offers a captivating journey through lush forests, meandering streams, and an impressive collection of 21 stunning waterfalls. With an elevation gain of 866 feet, the trail provides a moderate challenge that rewards hikers with breathtaking views at every turn. The well-maintained path and clear signage ensure a safe and enjoyable experience, allowing visitors to immerse themselves in the natural beauty of the park. From the towering 94-foot Ganoga Falls to the picturesque beauty of R.B. Ricketts Falls, this trail showcases the power and serenity of water in a truly remarkable way. Whether you're a seasoned hiker or simply seeking a memorable outdoor adventure, the Ricketts Glen Falls Trail Loop promises an unforgettable experience that highlights the splendor of Pennsylvania's natural wonders.", star_rating= 5, user_id=8, trail_id=4 )





    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
