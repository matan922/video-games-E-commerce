# Video Game online store - Matan Tenenbaum

My video game store is inspired mainly by Steam
(huge online store for video games)
using Steam's API to get information on the games and populating the database with their images. 
It's a full-stack web application built using Django, Django Rest-framework module, React with TypeScript, Redux for state managing and MySQL. (PostgreSQL in its 'deploy-ready' branch of the git)

## Demo/Live app
Site is live at 
https://precious-queijadas-5fa22b.netlify.app/
for the deploy-ready branch this link is the only thing you need here!

## Key Features
* Built with Django, DRF, React with TypeScript, Redux and MySQL.
* Authentication system that lets the user create his own account and profile and add games to his cart and purchase them.
* Profile system that allows you to change info like profile picture or bio it also shows the games a user has bought.
* Custom logger and decorator for it.
* Secure checkout method through Paypal.

## Superuser:
user: matan
password: 123

(for both demo site and localhost one)

## Paypal fake account:
email: matanten@gmail.com
password: 12341234

# Setup:
first make sure you have Python3 installed.  
download a module to store your dependencies in:

* pip install virtualenv

then create your environment:
* py -m virtualenv [name your environment folder]

then activate it:
py [name of your environment folder]\Scripts\activate

then you need to install on this environment all of your dependencies:
* pip install -r requirements.txt

## Choose a database (unless you want to use MySQL this, Migrations and Populate DB are skippable):
If you want to use MySQL you first need to make sure you have it installed on your computer.

then you need to uncomment the mysql database 
and change it up to your own database.

![alt text](https://img001.prntscr.com/file/img001/yk6cD_nbQjmsWQUSrQYCaw.png)

## Migrations:
after the changes you can use the following 2 commands (navigate to backend folder first):
* py ./manage.py makemigrations
* py ./manage.py migrate

Make sure all the table were migrated.

## Populate DB with the games dataset:
To populate with the dataset given in the backend folder use:
* py ./manage.py loaddata db.json

## Run the server:
Run the server using:
* py ./manage.py runserver




# Setup-frontend

## npm i:
First you want to navigate into the "frontend" directory and then into "app" directory inside "app" in the terminal enter:
* npm i

## npm start
After it finishes downloading all of the dependencies enter in the terminal:
* npm start

That's it you are done!
