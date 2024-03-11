The only thing needed to run this should be a tmdb api key. that you should put on a .env file.

INSTRUCTIONS 

1- Get a tmdb api key from them.   
2- Create a .env file in /root        
3- Add to the file this REACT_APP_API_KEY="[YOUR KEY]". Add the key between the " and dont add anything else.   
4- Do "npm i" to download all the necesary modules.   
4.5- If you plan on using in webrowser and not build in electron you would need to deactivate cors in your preferred way.   
5- Do npm start to run the code once or if you dont need a permanent page. Do npm build and use the html page in /build for a longlasting page.   
6- give a star or idk.   

KNOWN PROBLEMS   
Theres a big change any movie with the same name will get mixed up. ejem: if you gave the hunt(2012) a 10 and the hunt (2020) an 8 they will show up in their proper place with the propper rating. But at the time of comparing the rating between users it will mix up both with wichever the user gave a worst score to. if they gave the first  7 and the second a 6 it will show as if they had given both a 6. Theres a quick fix but i dont want to do implement it cause im lazy and there  few other with higher priority.

TODOS- In importance order.   

~~I will add the option to compare imdb and letterboxd accounts. This would give functionality and also help to get more accurate posters as imdb gives the year each movie released preJS load.~~   
~~Make paginator work consistently. This is the hardest thing i have ever done and i had to rework it 3 times.~~     
Change how pagination works so it doesnt send a request for each poster to TMDB api as fast as it can. This should drastically solve 429(too many requests) erros while fetching the poster. This is the hardest thing i have ever done i will need to rework it 3 times and im pretty sure the first way i did pagination was better. Im using solid for all my other projects so idk if i will actually do this cause i cant figure out how to do it without also fetching all the movies for every time i change the page.    
Use the movie ID from letterboxd to differentiate between movies with the same name that are not the same movie.       
Add the option to make an electron app without needing to manually add the modules. If you know how you can already do this with electron forge it should work as is.     
Reduce warnings from webpack. I like yellow but not yellow alerts.      
Improve performance.     
Add the option to compare more than 2 users.   

If you get to this point imma be honest. I did this cause i was on an interview process and wanted to show i know the basics of react. I did a few improvements but i hate react so i dont think im gonna finish half the todos.
