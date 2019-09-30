# Senior-Project: Athlytics
Athlytics Is a role-based web app program made for a  reliable method for coaches to get workouts to student athletes
* Useful in creating workouts
* Useful in scheduling workouts 

## How and why to use

* Two kinds of users: coaches or student athletes
* Coaches will be able to create workouts for a team sport, even a scheduled time 
* The student will be able to view said workouts and times
* This allows the student to do the team workout if the student is unavailable to do so at a scheduled time

## Burndown Chart

![Screenshot](/src/img/bc.png)


### Tools the team used

* Groupme for the quick communication and fast responses
* slack for communication and file sharing 
* Version control: Github
* Sprint management and board: github projects
* Private repository- waiting to be public ( PUBLIC NOW!)


## Deployment

* We used npm to get a production build of our react app
* We used firebase hosting to upload our production build to the cloud and have it accessible to all the users through the web
* Created a deployment routine where we just need to execute a command to quickly redeploy our project to production

### Firebase Database Advantages

* Security
* Passwords are naturally Encrypted 
* Email verifications for registering
* Easy ability for passwords resets, which prompt email verification
* Offers hosting solution for production deployment

# How to use
## App User:
* Like many web based programs, you will have to sign up
* Verify your email and create a password – secured and safe
* If a new coach wishes to sign up the client needs to give you the admin secret seed
* It is simple as following this link https://athlytics5g.firebaseapp.com/ 

## Developer:
1. Clone the repository
1. ``` cd Athlytics ```
1. ``` npm install ```
1. ``` npm start ```
1. At this stage, the app will launch but no back-end interactions will work.
1. To enable database access, you need to link the app to your own firebase account.
 
  <strong>Screenshots:</strong>
 <br>
![Screenshot](/src/img/sc1.png)
![Screenshot](/src/img/sc2.png)
![Screenshot](/src/img/sc3.png)


#### Authors: Pentagummies
The development team consisted of 5
* Marouen helail– Team leader,  and functionality programmer, authentication
* Alexandru andrei – the main database programmer, and functionality programmer 
* Tudor Ghenea – mitigating between client and team, home page GUI programmer, and tester
* Jinting Liu – Documentation, minor gui, in charge of presentations/interactive prototypes
* Adam Ebel – mitigating between team and management, calendar functionality programing, main tester, documentation, Organizer, presentation creationist
