# AltTrails

AltTrails is a soft clone of AllTrails. With a world full of adventure, AltTrails seeks to make those adventures more accessible by allowing its users to share their favorite hiking trails with a larger community. 

## Technologies

AltTrails was created using the following technologies...

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

## Getting started
1. Clone this repository:
   https://github.com/Jhulford88/AltTrails

2. Install denpendencies into the Backed and the Frontend by making a terminal for each one and then run the following:
-backend: "pip install" 
-frontend: "npm install" 

3. Create a .env file using the .envexample provided

4. To start the backend, run "pipenv run flask run"

5. To start the frontend, run "npm start"

6. Now you can use the Demo User or Create an account


## Features

1. Trails
Logged in users can CREATE a trail detail page
All users can READ trail detail pages
Logged in users can UPDATE and DELETE trail detail pages which they have created
2. Reviews
Logged in users can CREATE a review on a trail detail page
ALL users can READ reviews
Logged in users can UPDATE and DELETE their reviews
3. Favorites
Logged in users can CREATE a favorites designation on any trail
Owners of a favorite designation can READ, UPDATE or DELETE the favorite designation through their profile page
4. Collections (coming soon!)
Logged in users can CREATE collections of existing trails
All users can Read collections of existing trails created by other users
Logged in users can UPDATE collections which they have created
Logged in users can DELETE collections which they have created
5. Search / Categories
All users can READ and UPDATE filtered trails based on what the user types into the search bar or by navigating through category links
6. AWS Implementation
All photos loaded by users will be automatically hosted through AWS
