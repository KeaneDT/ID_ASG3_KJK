# Link 
- Github: https://keanedt.github.io/ID_ASG3_KJK/

- Google Drive (Pitch):

# ID Assignment 3 (Pandemapic)

For this ID Assignment 3 we have decided to use Html, CSS, JavaScript, Bootstrap, Google Maps API, Charts.JS and some more APIs to make a Covid-19 Map Game that can be used on both mobile and desktop. The application consists of 3 main parts, the Home page, the Game page and the Store page itself. The Home page consists of a title screen, the about section of the application, a Google Maps API example and a button to take the user to the game page. In the Game page, there is a Map box and a statistics box. In the store page, there is a simple store with purchasable badges.

The application uses Google Maps API to determine the country selected by the user. The Country clicked on will then display it's name and its Covid-19 Statistics of Active cases, Recovered cases and deaths based on the data taken from the free covid-19 API, https://covid19api.com/ . The relevant data for the country is then displayed in the statistics box, alongside a doughnut chart made using Charts.JS to help visualise the data. Included in this page is also a game which rewards the user with points based on a question provided as well as the number of attempts remaining. Upon obtaining enough points, the user can spend them on Lottie badges located in the store. Badges can be displayed by clicking on the display badges button on the botton of the store page. There are also Load and Save features located on the Game page and the Store page to enable users to save their progress and pick it back up at any point in time. Lottie animations are also scattered throughout the application in relevant locations to help make the website look more professional. There is a clear data button at the bottom of the site to clear the LocalStorage.

# Reason

The main reason why we are creating this application is to ensure that users can stay informed about the Covid-19 Pandemic that is affecting the entire world all while they have fun. The game aspect of the application creates an incentive to lure users back to the website to play the map game and try to unlock the various badges.

From the perspective of the user, I would like a simple to use application that keeps me informed about the worldly events relating to the virus as well as keeping me hooked & entertained.

# Features implemented

- Clicking anywhere on the Google Maps API brings up the Country name, using reverse-geocoding.
- Clicking on invalid locations on the map bring up the "Invalid Location" infowindow.
- Once a valid location has been clicked on, the relevant Covid-19 data is taken from the Covid-19 API and appended in the statistics box.
- A doughnut chart from Chats.JS is generated using the information obtained from the API. (Corresponds with the respective colours)
- A game can be run that selects a random question from 5 different questions in the JavaScript file which gives the user 5 attempts.
- There is a refresh question button that generates a new question.
- There is a display points button on both the Game and Store page.
- Users are rewared points based on the amount of attempts remaining.
- Users can then proceed to the Store page to spend the points on the badges.
- System implemeted to check if user has enough points.
- Badges (Covid-19 Lottie Animations) are displayed at the botton of the store page.
- Users game and store data are saved without the user needing to click anything.
- There is a clear data button on both the game page and store page to clear the LocalStorage.

# Problems Faced

- The Covid-19 API used (https://covid19api.com/) sometimes has inaccurate data such as 0 recovered cases/0 active cases.
- Using the Covid-19 API too many times causes the localhost to get blocked due to the CORS policy. We tried using Axios and a proxy server to mitigate this problem but to no avail.
- Sometimes the map will not load and will require the page to be refreshed.
- We initially wanted to implement a News feature in the store that could be bought. However due to the CORS policy we were unable to implement it.
- Another issue we face is the Covid-19 API implementation not working on GitHub. The issue is caused by a problem called 'mixed-content'.

# Technology used

So far we have used Bootstrap, Jquery, Google Maps API, Geoplugin, Covid-19 API, Lottie & Chart.Js to help us make the website.

- We have also added nomalize css: https://necolas.github.io/normalize.css/8.0.1/normalize.css
- Axios was also used: https://github.com/axios/axios

# Media 

- Coronavirus image from: https://gulfbusiness.com/gcc-coronavirus-update-total-cases-surge-past-180/
- Map Background in Game/Store Pages were taken from a screenshot off google maps.

# Acknowledgements

- Reverse-Geocoding: https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
- How to create alert boxes: https://www.w3schools.com/howto/howto_js_alert.asp
- Covid-19 API Documentation: https://documenter.getpostman.com/view/10808728/SzS8rjbc

# List of Lottie Animations used:

- https://assets9.lottiefiles.com/packages/lf20_CXxysN.json
- https://assets2.lottiefiles.com/private_files/lf30_1KyL2Q.json
- https://assets10.lottiefiles.com/private_files/lf30_oGbdoA.json
- https://assets10.lottiefiles.com/packages/lf20_6R2HIH.json
- https://assets7.lottiefiles.com/private_files/lf30_yQtj4O.json
- https://assets7.lottiefiles.com/packages/lf20_wv4mTG.json


