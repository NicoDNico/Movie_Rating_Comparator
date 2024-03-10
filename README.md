The only thing needed to run this should be a tmdb api key. that you should put on a .env file.

INSTRUCTIONS 

1- Get a tmdb api key from them.   
2- Create a .env file in ./src/   
3- Add to the file this REACT_APP_API_KEY="[YOUR KEY]". Add the key between the " and dont add anything else.   
4- Do "npm i" to download all the necesary modules.   
4.5- If you plan on using in webrowser and not build in electron you would need to deactivate cors in your preferred way.   
5- Do npm start to run the code once or if you dont need a permanent page. Do npm build and use the html page in /build for a longlasting page.   
6- give a star or idk.   


TODOS- In importance order   
~~I will add the option to compare imdb and letterboxd accounts. This would give functionality and also help to get more accurate posters as imdb gives the year each movie released preJS load.~~   
~~Make paginator work consistently. This is the hardest thing i have ever done and i had to rework it 3 times.~~     
Change how pagination works so it doesnt send a request for each poster to TMDB api as fast as it can. This should drastically solve 429(too many requests) erros while fetching the poster. This is the hardest thing i have ever done i will need to rework it 3 times and im pretty sure the first way i did pagination was better.      
Add the option to make an electron app without needing to manually add the modules. If you know how you can already do this with electron forge it should work as is.   
Reduce warnings from webpack. I like yellow but not yellow alerts.
Improve performance.   
Add the option to compare more than 2 users.   
