# Link 
Github: https://keanedt.github.io/ID_ASG3_KJK/
Google Drive (Pitch):

# ID Assignment 3 (Keane & Jun Keat)

For this ID Assignment 3 we have decided to use Html,Css,Javascript,Bootstrap, Google Maps API, Charts.JS and some more APIs to make a Covid-19 Map Game that can be used on both mobile and desktop. The application consists of 3 main parts, the Home page, the Game page and the Store page itself. The Home page consists of a title screen, the about section of the application, a Google Maps API example and a button to take the user to the game page. In the Game page, there is a Map box and a statistics box. In the store page, there is a simple store with 1 item, Covid-19 News.

The application uses Google Maps API to determine the country selected by the user. The Country clicked on will then display it's name and its Covid-19 Statistics of Active cases, Recovered cases and deaths based on the data taken from the free covid-19 API, https://covid19api.com/ . The relevant data for the country is then displayed in the statistics box, alongside a doughnut chart made using Charts.JS to help visualise the data. Included in this page is also a game which rewards the user with points based on a question provided as well as the number of attempts remaining. Upon obtaining enough points, the user can spend them on the Covid-19 News feature in the Store page. The Covid-19 news are taken from the News API, https://newsapi.org/ . Purchasing this option unlocks a button at the bottom of the store page where users can view and read the articles provided from the API. There are also Load and Save buttons located on the Game page and the Store page to enable users to save their progress and pick it back up at any point in time. Lottie animations are also scattered throughout the application in relevant locations to help make the website look more professional.

# Reason

The main reason why we are creating this application is to ensure that users can stay informed about the Covid-19 Pandemic that is affecting the entire world all while they have fun. The game aspect of the application creates an incentive to lure users back to the website to play the map game and try to unlock the additional News feature. The news feature alongside being a goal users work towards, educates users as well.

From the perspective of the user, I would like a simple to use application that keeps me informed about the worldly events relating to the virus as well as keeping me entertained.

# Links to Wireframe

The Wireframe files can be found in the Wireframe folder.
It consists of 6 .xd files, 3 for the Desktop view and the other 3 for the mobile view.

# Features implemented

- Clicking anywhere on the Google Maps API brings up the Country name, using reverse-geocoding.
- Clicking on invalid locations on the map bring up the "Invalid Location" infowindow.
- Once a valid location has been clicked on, the relevant Covid-19 data is taken from the Covid-19 API and appended in the statistics box.
- A doughnut chart from Chats.JS is generated using the information obtained from the API. (Corresponds with the respective colours)
- A game can be run that selects a random question from 5 different questions in the JavaScript file which gives the user 5 attempts.
- Users are rewared points based on the amount of attempts remaining.
- Users can then proceed to the Store page to spend the points on the Covid-19 News feature which uses the News API to get relevant news articles.
- Users have the ability to save and load their progress to and from the LocalStorage.
- Retrieving the values from the local storage would first check that the local storage is not empty.

# Problems Faced

-The Covid-19 API used (https://covid19api.com/) sometimes has inaccurate data such as 0 recovered cases/0 active cases.
-Using the Covid-19 API too many times causes the localhost to get blocked due to the CORS policy. We tried using Axios and a proxy server to mitigate this problem but to no avail.

# Technology used

So far we have used Bootstrap, Jquery, Google Maps API, Geoplugin, Covid-19 API, News API, Lottie & Chart.Js to help us make the website.

We have also added nomalize css: https://necolas.github.io/normalize.css/8.0.1/normalize.css
Axios was also used: https://github.com/axios/axios

# Media 
Money Image used from: https://www.investopedia.com/terms/m/money.asp
Map Background in Game/Store Pages were taken from a screenshot off google maps.

# Acknowledgements

Reverse-Geocoding: https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
How to create alert boxes: https://www.w3schools.com/howto/howto_js_alert.asp
Covid-19 API Documentation: https://documenter.getpostman.com/view/10808728/SzS8rjbc


