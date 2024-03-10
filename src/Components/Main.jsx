import React ,{useEffect, useState} from 'react'
import Poster from './Poster'
import axios from 'axios'
import HelpImg from './HelpIMG'
import * as cheerio from 'cheerio';
import Pagination from './Pagination/Pagination';
export default function Main(Prop){
  // maybe this is to many states but whatever.
  const [list, setList] = useState([]); //this list will contain all the movies and their names ranking of both users and img
  const [pages ,setPages] = useState({
    user:{mode:'letterboxd', name:""},
    other:{mode:'letterboxd', name:""},
    settings:{show:"shared", moviesPerPage:60}
  }) // this state is kinda useless but i was told to always use state before using vanilla js to extract info from inputs
  const [pagesVisibility,setVisibility]= useState([false])
  const RegexForUR = /^ur/i; // i need this to check the validity of the imdb input
  useEffect(()=>{
    setVisibility(false)
}, [])

  // Somebody once toll me the world is gonna roll me if i use async in Reactttttt
  // believe me i tried its too much for me, god bless those who can understand how chaining promises work.
  async function runTest(){
    console.log(await imdbApi("ur49546000",))
    
  };
  // this should not be necessary.
  function doList(storedPages){
    setList(prev=>storedPages)
  }
  async function runMain(){
    let moviesUser
    let moviesOther
    setVisibility(true)
    // Cheking if the imdb UR is correct
    if((pages.user.mode ==='imdb' && !RegexForUR.test(pages.user.name)) || (pages.other.mode ==='imdb' && !RegexForUR.test(pages.other.name))){
      alert("Please check the username you have given. ALL imdb users start with 'UR'")
      return
    }else if(pages.user.name ==="" ||pages.other.name === " "){
      alert("One of the usernames is empty or too short")
      return
    }
    // call to api to fetch the primary user data
    // theres a bug here. if for some reason the fetch returns ok but it resolves to an empty array it will store the empty array as the user info 
    // they would need to reload the page to fix this.
    if (pages.user.mode === "imdb"){
      // local cache of users so they dont have to fetch the data every time
      moviesUser = window.sessionStorage.getItem(pages.user.name)? JSON.parse(window.sessionStorage.getItem(pages.user.name)):await imdbApi({user:pages.user.name, iteration:1},)
      // moviesUser = await imdbApi({user:pages.user.name, iteration:1},);
      console.log(moviesUser.Data);
      window.sessionStorage.setItem(pages.user.name, JSON.stringify(moviesUser));
    }else{
      moviesUser = window.sessionStorage.getItem(pages.user.name) ? JSON.parse(window.sessionStorage.getItem(pages.user.name) ):await letterboxdApi({user:pages.user.name, iteration:1},)
      // moviesUser = await letterboxdApi({user:pages.user.name, iteration:1},);
      console.log(moviesUser);
      window.sessionStorage.setItem(pages.user.name, JSON.stringify(moviesUser));
    }

    if(pages.other.mode === "imdb"){
      moviesOther =window.sessionStorage.getItem(pages.other.name)? JSON.parse(window.sessionStorage.getItem(pages.other.name)): await imdbApi({user:pages.other.name, iteration:1},)
      // moviesOther = await imdbApi({user:pages.other.name, iteration:1},)
      console.log(moviesOther.Data)
      window.sessionStorage.setItem(pages.other.name,JSON.stringify(moviesOther))
    }else{
      moviesOther =window.sessionStorage.getItem(pages.other.name)? JSON.parse(window.sessionStorage.getItem(pages.other.name)): await letterboxdApi({user:pages.other.name, iteration:1},)
      // moviesOther = await letterboxdApi({user:pages.other.name, iteration:1},)
      console.log(moviesOther)
      window.sessionStorage.setItem(pages.other.name,JSON.stringify(moviesOther))
    }
    // call to api to fetch the other user data
    // this loop adds the other user rating to the primary user array. i use thismethod cause thats the only thing we need from the other user.
    // it compares the names of the movies to collect the rating, it may produce errors if one or more movies share the same name.
    //Thankfully the error will just be incorrect ranking.
    lista(moviesUser.Data,moviesOther.Data);
  };
  async function lista(moviesUser,moviesOther){ //lista is just list in spanish. 
    console.log("user")
    console.log(moviesUser)
    console.log("other")
    console.log(moviesOther)
    for(let i =0; i<moviesOther.length;i++){
      let answer = await moviesUser.findIndex((position)=> position.Title === moviesOther[i].Title);
      if(answer !== -1){
        moviesUser[answer]["Other"] = moviesOther[i].Rating; 
        // i store everything on the primary USER array cause we only need the rating of each movie from the other user.
      }
      else if (answer === -1){
      }
    };
    let dividedUser = divideArray(moviesUser,72)
    let storedUserPages = dividedUser.map((pag,i)=>
    pag.map((movie,i)=>{
          return(
            <Poster name={movie.Title} Link={movie.Link} img='https://i.pinimg.com/originals/60/83/1f/60831f185c65c38a5942444339f5d95a.png' key={movie.Title} primaryStars={movie.Rating} secondaryStars={"Not seen/played" && movie.Other} /*year={movie.Date.slice(0,3)}*/ />
          );
        }
      )
    );
    if(pages.settings.show === "ALL"){
      doList(storedUserPages)
    }
    else{
      // if the mode is not in All it will filter so it only shows movies that are shared between both users. i dont remember how it interacts with movies rated 0 prob as not shared.
      console.log("Not All");
      const filteredPosters = moviesUser.filter((element)=>{
        if(element.Other !== undefined){
          return true;
        }
        return false;
      });
      let dividedUser = divideArray(filteredPosters,72)
      let storedUserPages = dividedUser.map((pag,i)=>
      pag.map((movie,i)=>{
            return(
              <Poster name={movie.Title} Link={movie.Link} img='https://i.pinimg.com/originals/60/83/1f/60831f185c65c38a5942444339f5d95a.png' key={movie.Title} primaryStars={movie.Rating} secondaryStars={"Not seen/played" && movie.Other} /*year={movie.Date.slice(0,3)}*/ />
            );
          }
        )
      );
      doList(storedUserPages)
      }
  };
  // i allways use n(movies per page) as 72 but i made it a variable if i ever want to change it or let the user choose.
  function divideArray(arr, n) {
    const dividedArray = [];
    console.log(arr)
    for (let i = 0; i < arr.length; i += n) {
      dividedArray.push(arr.slice(i, i + n));
    }
    return dividedArray;
  };
  async function letterboxdApi(config,prev){
    let data = prev || [];
    let page = await axios.get(`https://letterboxd.com/${config.user}/films/by/entry-rating/page/${config.iteration}`);
      const $ = cheerio.load(page.data);
      const molist = $('.poster-container'); // this list contains all the components we care about.
      let numOfPages = $('.paginate-pages').children().children().last().text(); // i go two steps above cause on the last iteration the classname changes. )
      molist.each((i,element)=>{
        // iterate trough the page to get each movie title and the rating.
          data.push(
            {
              Title:$(element).find('img').attr('alt'),
              Rating:($(element).find('.rating').attr('class'))? $(element).find('.rating').attr('class').match(/\d+/g)[0]:"0", // i dont like this but is this but is less of a mess than counting the stars when theres half stars.
              Link: $(element).find(".poster").attr('data-target-link')
            })
      });
        
      if(numOfPages != config.iteration){
          return await letterboxdApi({user:config.user,iteration:config.iteration+1}, data);
      }
       else{
        return {Data:data, info:{user:config.user, Pages:numOfPages, TotalMovies:data.length}};
      }
  };
  let button = "rounded bg-[#2b0071] h-10 w-20 text-center duration-500 hover:h-20 hover:w-40  "

  async function imdbApi(config,page,prev){
    let temp
    let data = prev || []
    // imdb uses what i can only see as random ids for each page so i need to iterate trough each as if it was a new one.
    // i cant use iteration cause there is no page number on urls.
    if(page){
      temp = await axios.get(page)
    }else{
      temp = await axios.get("https://www.imdb.com/user/"+config.user+"/ratings?sort=your_rating,desc&ratingFilter=0&mode=detail&ref_=undefined&lastPosition=0")
    }
    let $ = cheerio.load(temp.data);
    let nextPage = $('.list-pagination').find('a.next-page').attr('href')
    const molist = $('.lister-item ');
    console.log(nextPage)
    molist.each((i,elem)=>{
      data.push({
        Title: $(elem).find('img').attr('alt'),
        Rating:$(elem).find('.ipl-rating-widget').find('.ipl-rating-star--other-user').text().trim(),
        Year:$(elem).find('.lister-item-year').text()
      })
    })
    console.log(data)
    if (nextPage.length > 1){
       return await imdbApi(config,(`https://www.imdb.com${nextPage}`),data)
    }else{
      return {Data:data, info:{user:config.user, Pages:"placeholder", TotalMovies:data.length}}
    }
    
    
  }


return(
<main className="flex flex-col min-w-full bg-[#150050]  ">
  <div className={lista?'':'hidden'}>
      <ul className='flex flex-col place-items-center gap-2 sm:gap-4 sm:flex-row  p-5 sm:justify-center  text-white'>
      {/* <button className='rounded bg-[#2b0071] h-10 p-2 text-white invisible hidden'  onClick={()=>runTest()}>test</button> */}
          <select className='w-max rounded bg-[#2b0071] text-white ' onChange={(e)=> setPages((prev) =>{
              let updated = {...prev};
              updated.settings.show = e.target.value;
              return updated
            }
                )}>
                  <option value={"shared"}>ONLY SHARED</option>
                  <option value={"ALL"}>ALL</option>
          </select>
          <button className='rounded bg-[#2b0071] h-10 p-2 text-white'  onClick={()=>runTest()}>test</button>
      </ul>

      <div className='collectorMain flex flex-col sm:flex-row justify-center gap-5 sm:gap-20 md:gap-32 mt-10 font-mono font-bold text-xl'>
        <div className='collectorUser flex flex-col gap-3 items-center '>
            <select className='w-max rounded bg-[#2b0071] text-white ' onChange={(e)=> setPages((prev) =>{
              let updated = {...prev};
              updated.user.mode = e.target.value;
              return updated
            }
                )}>
                  <option value={"letterboxd"}>LETTERBOXD</option>
                  <option value={"imdb"}>IMDB</option>
              </select>
              <input type="text" className={`rounded bg-white h-10 w-48 ${(pages.user.mode ==='imdb' && !RegexForUR.test(pages.user.name))  ? `border-4 border-red-600`:``}`} onChange={(e)=> setPages((prev) =>{
              let updated = {...prev};
              updated.user.name = e.target.value;
              return updated
            }
              )
              }></input>
        </div>

        <div className=' flex justify-center items-center flex-col'>
          <button className='rounded bg-[#2b0071] h-10 p-2 text-white'  onClick={()=>runMain()}>Compare</button>
        </div>

          <div className='collectorUser flex flex-col gap-3 items-center  '>

            <select className='w-max rounded bg-[#2b0071] text-white' onChange={(e)=> setPages((prev) =>{
              let updated = {...prev};
              updated.other.mode = e.target.value;
              return updated
            }
              )}>
                <option value={"letterboxd"}>LETTERBOXD</option>
                <option value={"imdb"}>IMDB</option>
            </select>

            <input type="text" className={`rounded bg-white h-10 w-48 ${pages.other.mode ==='imdb' && !RegexForUR.test(pages.other.name) ? `border-4 border-red-600`:``}`}onChange={(e)=> setPages((prev) =>{
              let updated = {...prev};
              updated.other.name = e.target.value;
              return updated
            }
              )
              }></input>
          </div>

      </div>
      <div className='flex flex-row justify-center'>
        <span className='mt-1 h-20 w-full bg-gradient-to-b from-black rounded-t-md'></span>
      </div>
        {pagesVisibility && <Pagination pages={list} key={"pagination"}/>}

  </div>
</main>
)
}

