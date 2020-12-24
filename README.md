## Chai Noon

[chai-noon.herokuapp.com](https://chai-noon.herokuapp.com/)

Chai Noon is a mock e-commerce site designed to sell high quality tea. Users can browse teas, add teas to their cart, update their cart, and navigate to a checkout page. The cart persists in the database for authenticated users and in the browser's local storage for guest users. If a guest adds items to their cart and then signs in to an account with an existing cart, the carts are merged. Administrators can add, update, or delete teas from the database. 

![screenshot](https://github.com/grace-shopper-orgs/chai-noon/blob/master/Screen%20Shot%202020-11-21%20at%205.37.59%20PM.png)


## Tech Stack

Frontend: React, Redux

Backend: Node.js, Express, Postgres, Sequelize, Passport.js

Testing: Mocha, Chai

## Authors

Valerie Ingmann, Leslie Meng, Aminat Puebla, Ellen Kwan

## Setup

```
git clone https://github.com/grace-shopper-orgs/chai-noon.git
cd chai-noon

// make sure you have psql command line installed
createdb grace-shopper grace-shopper-test

npm install
npm run start-dev
```
Google OAuth setup: 

- Obtain an OAuth Client Id from Google
- Create a secrets.js file in the root directory and add your Google info:

```
process.env.GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"
process.env.GOOGLE_CLIENT_SECRET = "YOUR_GOOGLE_CLIENT_SECRET"
process.env.GOOGLE_CALLBACK = "YOUR_GOOGLE_CALLBACK"
```
