# Graduate Project

Welcome to `Personology`. This is a website that allows you to find out all the things that contribute to our personalities.

# Set-Up

### ***Make sure when opening these terminals they are in the root directory of the project.***

First you will need to open a terminal and type `cd client`..then type `npm i` to install dependencies.

Then you will need to open a seperate terminal and type `cd server`..then type `npm i` to install dependencies.

On a third terminal you will need to run `mongod`..type `/usr/local/mongodb/bin/mongod --dbpath ~/.mongo` into the third terminal to get `mongod` running.

Do not close the `client`, `server`, or `mongod` terminals without first spinning down the terminal. To do this enter `ctrl + c` into your terminal.

After all the dependencies have been installed type `npm start` in ***BOTH*** the client and server terminals.

# USAGE

## **Admin**

The admin login is as follows: 

 email: `sam@gmail.com`  
 password: `admin`

When you login to the admin account you will see an `admin` link appear in the navbar. Clicking on this link will bring you to the admin page. On this page you will see 2 tabs labeled `Accounts` and `Quotes`. The `Accounts` page is what's displayed when you first come to the Admin Page.

The `Accounts` tab will give the 3 links labeled `All Accounts`, `Active Accounts`, and `Inactive Accounts`. Each link will give you the accounts that corresponds with each link. The `All Accounts` link will display all the accounts registered in our database. The `Active Accounts` link will display all the accounts that are currently active. The `Inactive Accounts` will display all the accounts that have not logged in within the last 6 months. Under each account information the user can see a `Delete` button that will allow the admin to delete the account from the database. 

The `Quotes` tab will display all the quotes that need approval to be added to the account. Each quote will have an `Approve` and `Delete` button. The `Approve` button will allow the admin to add the quotes found to be appropriate and the `Delete` will allow the admin to delete the quotes found to be inappropiate. 

## **Other accounts**

these accounts are seeded into the databse for the admin page so that there are already 2 accounts active and 2 accounts inactive. If you wanted to you could login to these accounts to make the active again.

### **Inactive Accounts**

 email: `amanda@gmail.com`  
 password: `JellyFish1`

 email: `kel@gmail.com`  
 password: `CosmoGirl101`


### **Active Accounts** 

 email: `kyla@gmail.com`  
 password: `PinkFlamingo3`

 email: `tay@gmail.com`  
 password: `BuilderGirl303`

## **Account**

If there hasn't been an account already created then you will need to go to the `login` link located at the top of the screen and click on the `Don't Have an account? Sign up here` link provided at the bottom of the modal to create an account. When creating the account if the email trying to be used already exists a message will pop up under the email section letting the user know if the email already exists or if its a valid email. Once the account has been created you will be logged in. After 6 months of no use of your account, the account will be flagged as inactive so that the admin can choose to delete the account due to inactivity.

Once you are logged in then you will be able to see the account information.

If you click on your name in the navbar then you are able to see the current information linked to the account, as well as, a `Edit Account`, `Change Password`, `Delete Account`, and `Change Picture` button along the left-hand side of the users information. At the top of the users information you will see tabs that can be clicked on as well that say `Account Info`, `Quizzez`, `Astrology`,  `Numerology`, and `Quotes`.

The `Edit Account` button allows the user to edit the account (first name, last name, and email) and update the information in the database.

The `Change Password` button allows the user to change their current password to a new one, but you will need your old password to accomplish this.

The `Delete Account` button allows the user to delete their account if they so wish to, as long as they know their current password.

The `Change Picture` button allows the user to change their profile picture.

The `Account Info` tab will take you back to the accounts information and to the edit buttons that are displayed when you first go to the Account Info page.

The `Quizzes` tab will take you to the history of the quizzes that you have taken on this site. If no quizzes have been taken you will see links to the quizzes so you can start taking the them. If you have taken quizzes then you will see the quiz name and then the most recent result of the quiz along with 2 buttons that say `Show History` and `Show Description`. The `Show History` button will show you all the results received for that quiz, as well as, the date the quiz was taken. The `Show Description` button will show you the description of the most recent result only. Once the description is displayed you will see a `Return To Quizzes` button. Click this button to return to the quiz history.

The `Astrology` tab will take you to the astrology sign that is saved to the account. If no astrology sign has been saved to the account you will see a link to go the astrology page to add one. If one has been saved you will see the astrology sign and all the information assosicated with the astrology sign. There will also be a link at the bottom of this description that says `Remove Results`. Click on this link to remove the astrology sign from your account. You can also save family members' astrology signs to your account (look at astrology section below to learn how to do this) and there will be a button that says `See Family Tree` that shows a table of family members saved to your account (the `See Family Tree` button only appears if you have family members added to your account). On this table you can view the description of the sign or delete the family member from your family tree. If viewing a desciption there will be a `Go back` button at the bottom of the description that will take you back to the table.

The `Numerology` tab will take you to the numerology numbers that are saved to the account. If no numerology numbers are saved to the account you will see a link to go the numerology page to add them. If numerology numbers have already been saved to the account then you will see them displayed here with the description of each number. At the bottom of the numbers there will be a `Remove Results` link that will remove the numerology numbers from your account. You can also save family members' numerology numbers to your account (look at numerology section below to learn how to do this) and there will be a button that says `See Family Tree` that shows a table of family members saved to your account  (the `See Family Tree` button only appears if you have family members added to your account). On this table you can view the description of the numbers or delete the family member from your family tree. If viewing a desciption there will be a `Go back` button at the bottom of the description that will take you back to the table.

The `Quotes` tab will take you to all the quotes you have saved to your account from the home page. There is a `Add Your Own` button at the top of this page that will display a form on a modal for you to add your own quote. This quote will be added to the page for others to see (upon approval) if you check the box `I want my quote added to the website.` on the form. If you do not want your quote added to the website then simply do not check the box when adding the quote to your account.

# Landing

On the home page you will see the title and the blurb for this page. You will also see an inspiring quote that you can add to your account page. You have to be logged in to add the quote though. You will see a purple thumbtack once you're logged in and clicking on the thumb tack will save the quote for you to view inside your account information. To get a new quote simply refresh the page or leave the home page and come back to it later.

# Quizzes

To take a quiz simply click on the quizzes drop down in the navbar and click on a quiz name, it will take you to the quiz you're trying to take.

On each one of the quizzes you will see a `Questions?` button that will explain how to take each quiz. You will also see a counter at the top of each quiz that lets you know how many questions are in the quiz and what question you are on.


# Numerology

On this page you will see a form for the user to fill out with their birthday and their first, middle, and last name. Once this form is submitted it will calculate and give the user their numerology numbers. When the results page shows the user will see a `What do the Numbers mean?` button, a `Back to Numerology` link, a `Family` and `My Profile` button, and 4 titles that say "Life Lesson Number", "Soul Number", "Outer Personality Number" and "Destiny Number".

The `What do the Numbers mean?` button will give the user the description of what each number signifies.

The `Back to Numerology` link will allow the user to go back to the numerology form to put in different information.

The `Family` button will add the results to the family tree section on your account info. The family members will stay in the family tree until they are deleted. 

The `My Profile` button will add the results to the users account as their numerology numbers. These numbers will be displayed on the account info page under the Numerology section.

As for the 4 titles you see on the page, these are the results for each category. To view the description and to see your number all the user has to do is click on the title (clicking on the title again will hide the results). 

# Astrology

As soon as the user is on the astrology page you will see 12 dates displayed. To find the users astrology sign they simply have to find the set of dates that their birthday falls in. Once the user finds the set of dates with their birthday all they need to do is click on the date and the entire description for that sign will be displayed. Once the description is displayed you will not only see the description but also a red pin (📍) directly below the date. 

This pin (📍) when clicked on it will show a `Family` and `My Profile` button. These buttons are used to add the results to the users account if they wish to.

The `Family` button will show a form asking for your family members name so that they can be added to the family tree section of your account. Their name can be their real name or a nickname whatever works best for you. Once the name has been typed out click `Add Family` to add the family member. You will also notice a `Back` button attached to this form. The `Back` button will allow the user to go back to way the page was before they clicked the pin.

The `My Profile` will add the astrology sign to the users account as their sign. This sign will be displayed on the account info page under the Astrology section.

# About Pages

When you click on this drop down you will see 3 pages you are able to visit. Those 3 pages are `Astrology`, `Personality`, and `Numerology`. These pages will explain a little bit more about each category offered on the app.

## **About Astrology**

The `Astrology` page offers information on the Sun Sign and also legends tied to how the signs became constellations.

 Once you reach this page you will see tabs at the top of the page that say `Sun Sign` and `Legends`. The user will always start on the Sun Sign tab, so they next thing that will be seen is 4 links (`Dualities`, `Triplicities`, `Quadruplicities`, and `Polarities`). These links are to take you to that section of information instead of having to read through the entire thing if you don't want to. You will also see a `Back ⬆️` button at the bottom of the page, this takes you back to the top of the page.

 The `Legends` tab will take you to where you can see what the legends for each sign is. On the Legends page you will see 12 links, one for each sign. Then you will see a brief description about the legends behind each sign. If you click on one of the links it will display the legend behind the sign you clicked on. At the bottom on the legend displayed you will see a `Back To Main Page` link. Clicking on this link will take you back to the main page with the 12 links so you can click a different one.

 ## **About Personality Quizzes**

 The `Personality` page offers information about taking personality quizzes. It will give you some benefits and pitfalls about taking online personality quizzes. It also asks that you keep in mind that personalities can change and not to read to much into the results given. Nothing is set in stone.

 ## **About Numerology**

 The `Numerology` page offers a description and a little history on how numerology came to be. 

# Explanation/Research

## **Introduction**

I chose to use authentication in my project for the simple reason that I wanted my users to be protected from potential hackers and information breaches. Although using `bcrypt` and `JSON Web Tokens` are not full proof, they make it harder for the hacker to gain access to the users information. Authentication uses both `bcrypt` and `JSON Web Tokens(JWT)` to secure the users information so that hackers have a harder time getting access to said information. JSON Web Token tracks the session to make sure the session is validated and bcrypt hashes the password. Both of these things are explained further down below.

## **JSON Web Token(JWT)**

`JSON Web Tokens` are tracked on the server side instead of the client side and because of this fact they are known as a stateless authentication system. There are primarily two instances where `JSON Web Tokens` would be useful, for authorization and information exchange. I will be using the `JSON Web Token` for authorization purposes. The token is created when the user creates an account or logs in to their account and in that token is the users id, plus the secret key so that when the token is validated the system knows it was created by our server. After the user is logged in and the token is authenticated the token will be set to expire in a certain amount of time, in my case it is 24hrs after the user logs in. The token is checked every time the page refreshes or when a user moves to a new page, it checks to make sure the token is still valid (that is hasn’t expired). As long as the token is still valid it will allow the user access to their account but once the token expires you will be logged out and need to log back in to access the account again. This feature stops the user from being logged in indefinitely. Here is an overview on how `JSON Web Token` works, the user creates an account, the user logs in, and a `JSON Web Token` is assigned to the user, this token is sent by the user when trying to access certain secure routes, once the token has been verified the user is then allowed to access the route.

## **Bcrypt**

`Bcrypt` is the system that is used to hash the password and in this project also the security question answers. The hashing system uses something called salt rounds to hash the password. The higher the salt rounds, the more hashing rounds are done, for this reason the time and difficulty is increased. A hash is where bcrypt takes the plain text password and turns it into a password that has random characters throughout it. Hashes are 60 characters long, so it would turn a password of `'Serenity'` into something like this, `'$2b$12$ld9Kp.5O40H5J831V/JwCuPSTmrgZMvyql2CaHIl1SAjHcEoRKYpy'`. The hash will be different for each account even if the same password is entered for both accounts. Hashing the password like this makes it so that if the database is hacked then the hackers have to try to figure out the algorithm that was used to turn your password into the hash instead of seeing the plain text hash that you started out with. `Bcrypt` has a built in compare function to compare the plain text password the user puts in with the hashed password that was created when the user created the account

## **Conclusion**

In conclusion, the benefits of having user authentication in your application is to protect the users information as much as possible against being hacked and having their information stolen.

# Cited Sources

## **Personality**

The personality quizzes on this site were from mulitple printouts that were given to me by counselors. I do not know what book or site they came from, but they are not my quizzes.

On the about page the beginning 2 paragraphs are from wikipedia from this page `https://wikipedia.tlm.cloud/wikipedia_en_computer_2017-04/A/Personality_psychology.html`. The rest of the page was given to me by a counselor when they gave me the Myers-Brigg personality test. I looked for an author on the print out and could not find one. Nothing on the about page is my own words. They are all borrowed from printouts.

The Intelligence quiz came from the book `Frames of Mind: The Theory of Multiple intelligences.` The original test was created by someone named `Howard Gardner.`

## **Numerology**

All of the numerology information (about page, numerology form and results) on this site came from the `Numerology and The Divine Triangle` book written by `Faith Javane and Dusty Bunker`.

## **Astrology**

All the astology information (astrology page and about page) on this site came from the book `The only Astrology book you'll ever need` written by `Joanna Martine Woolfolk`# Personology
