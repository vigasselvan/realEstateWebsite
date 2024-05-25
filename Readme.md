# Real Estate Website

## Description

    This is a MERN stack based website to create, search, update and delete
    properties by a registered user.

    sign up and login can be done in via google oauth too. simple within a singlw click login.

    Sorting properties in search functionality isn't till now for backend, so those aren't available to be used yet.

    We can create listing only after sign in.

## Tech stack used: 
1. ReactJS
2. MongoDB
3. NodeJS
4. ExpressJS
5. Google oAuth
6. Redux
7. JWT

## Steps to run the application locally

1. install node packages in root dir. :

```bash
npm i
```

2. install node packages of frontend :

```bash
cd client
npm i
```

3. create `config.env` file in root dir.

```text
PORT=3000
URI=mongoDB user URI
JWT_SECRET=vigas12345bs12
```

4. go to root dir. path to connect to database and server.

```bash
npm start
```

4. go to frontend dir. path to run frontend application

```bash
cd client
npm run dev
```

4. go to `https://localhost:5173/` to see output.

## Website:

### Home page

![home page] (https://drive.google.com/file/d/1svBi9KVJkWyZ3FzJLDymRBzlCh5zy_Rq/view?usp=drive_link)

1. go to sign in
2. enter username and password
   ![signin page] (https://drive.google.com/file/d/1Z6xTbTxF4wco5_KLxShlpsqBnSqJXN5p/view?usp=drive_link)
3. now create listing and show listing button will be available on the page.
4. click show listing to see already created properties below, there we can update or delete those listings.
   ![after signin] (https://drive.google.com/file/d/1bZBQmO0nLapTaCM2j681s9Nv04bSlI5C/view?usp=drive_link)

### create Listing page

1. click `create listing` in profile page to create new property
   ![create-listing page] (https://drive.google.com/file/d/1Lv90ahYlaOfAo846U4HYawakWLdYTf3C/view?usp=drive_link)
2. Now the listing can be seen in `show listing`

### created properties by user

Click `show Listing` in profile page after signin
![show-listing](https://drive.google.com/file/d/1bZBQmO0nLapTaCM2j681s9Nv04bSlI5C/view?usp=drive_link)
![property-img](https://drive.google.com/file/d/1gDgCUddy3zg0ZY9hjSuj-J8l8Y3NRG6Z/view?usp=drive_link)

### Search option

![serach-page](https://drive.google.com/file/d/1pGBrser_5DUIRWdYGvKq310WTfeVUW49/view?usp=drive_link)

### repo for github: [Repo Link](https://github.com/vigasselvan/realEstateWebsite)

## Important actions
1. create config.env file with port, URI, JWT_SECRET=vigas12345bs12.
2. `npm i` both frontend and backend files.

###  Developer info:
Name: vigas.B.S
LinkedIn: https://www.linkedin.com/in/vigas-selvan/
github:  https://github.com/vigasselvan
portolio website: https://vigas.me/Personal_website/