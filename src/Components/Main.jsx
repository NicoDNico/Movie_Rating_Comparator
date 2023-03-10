import React ,{useState} from 'react'
import Poster from './Poster'
import HelpImg from './HelpIMG'
import PopUp from './Pop-Up/PopUp';
export default function Main(Prop){
  // maybe this is to many states but whatever.
  const [list, setList] = useState([]); //this list will contain all the movies and their names ranking of both users and img
  const [info, setInfo] = useState(); // i save everything in here so i can use it for logic later.
  const [pages ,setPages] = useState({
    user:{mode:'letterboxd', name:"",all:true},
    other:{mode:'letterboxd', name:""}
  }) // this state is kinda useless but i was told to always use state before using vanilla js to extract info from inputs
  const [stats, setStats] = useState([]); // here will be store the miscallenous info the page will show if you want to know some basic stats of both users.
  const [popUp,setPop] = useState(false);
  const RegexForUR = /^ur/i; // i need this to check the validity of the imdb input

  // Somebody once toll me the world is gonna roll me if i use async in Reactttttt
  // believe me i tried its too much for me, god bless those who can understand how chaining promises work.
  async function runTest(){
    console.log(list)
    setList(list.filter((element)=>{
      if(element.props.secondaryStars !== undefined){
        return element
      }
      return 
    }));
  };
  async function runMain(){
    // Cheking if the imdb UR is correct
    if((pages.user.mode ==='imdb' && !RegexForUR.test(pages.user.name)) || (pages.other.mode ==='imdb' && !RegexForUR.test(pages.other.name))){
      alert("Please check the username you have given. ALL imdb users start with 'UR'")
      return
    }
    // call to api to fetch the primary user data
    let user = await fetch('https://erzgg8cp3a.execute-api.us-east-1.amazonaws.com/Prod/'+pages.user.mode+'/'+pages.user.name,{headers:{'x-api-key':'0fg31ilvDCl0fdZfhum82clS7J1ad0j3booSddQb'}})
    .then(res => res.json());
    // call to api to fetch the other user data
    let other = await fetch('https://erzgg8cp3a.execute-api.us-east-1.amazonaws.com/Prod/'+pages.other.mode+'/'+pages.other.name,{headers:{'x-api-key':'0fg31ilvDCl0fdZfhum82clS7J1ad0j3booSddQb'}})
    .then(res => res.json());
    // this loop adds the other user rating to the primary user array. i use thismethod cause thats the only thing we need from the other user.
    // it compares the names of the movies to collect the rating, it may produce errors if one or more movies share the same name.
    //Thankfully the error will just be incorrect ranking.
    for(let i =0; i<other.length;i++){
      let answer = await user.findIndex((position)=> position.Name === other[i].Name);
      if(answer !== -1){
        user[answer]["Other"] = other[i].Rating; // i store everything on the primary USER array cause we only need the rating of each movie from the other user.
      }
      else if (answer === -1){
      }
    };
    setInfo(user);
    lista(user);
  };
  function lista(user){ //lista is just list in spanish. 
    if(pages.user.all){
      setList(user.map(((movie,i)=>{
        return(
          <Poster name={movie.Name} Link={movie.Link} img='https://i.pinimg.com/originals/60/83/1f/60831f185c65c38a5942444339f5d95a.png' key={i} primaryStars={movie.Rating} secondaryStars={"Not seen/played" && movie.Other} year={movie.Date.slice(0,3)} />
        );
      })));
    }
    else{
      // if the mode is not in All it will filter so it only shows movies that are shared between both users. i dont remember how it interacts with movies rated 0 prob as not shared.
      setList(
      user.filter((element)=>{
        if(element.props.secondaryStars !== undefined){
          return element
        }
        return
      }).map(((movie,i)=>{
        return(
          <Poster name={movie.Name} Link={movie.Link} img='https://i.pinimg.com/originals/60/83/1f/60831f185c65c38a5942444339f5d95a.png' key={i} primaryStars={movie.Rating} secondaryStars={"Not seen/played" && movie.Other} year={movie.Date.slice(0,3)} />
        );
      })));
    }
  };
  function runStats(){
    console.log(stats);
    let shared = stats.filter((movie)=>{
      if(movie.Other){
        return [movie.Other,movie.Rating]
      }
      return
    })
    console.log(shared);
  }
  let button = "rounded bg-[#2b0071] h-10 w-20 text-center duration-500 hover:h-20 hover:w-40  "
return(
    <main className="flex flex-col  min-h-screen bg-[#150050]  ">
      {popUp && <PopUp handleClick={()=>{setPop(prev=>!prev)}}/>}
      <ul className='flex flex-col place-items-center gap-2 sm:gap-4 sm:flex-row  p-5 pt-10 sm:justify-center  text-white'>
          {/* <button className={button}  onClick={runTest}> test</button>
          <button className={button}  onClick={runStats}>Get Stats</button> */}
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
          <button className='rounded bg-[#2b0071] h-10 p-2 text-white'  onClick={runMain}>Compare</button>
          <div onClick={()=>setPop(prev=>!prev)}>
            <svg class="h-10 w-10 p-2 text-white hover:p-0"  fill="none" viewBox="0 0 24 24" stroke="currentColor" >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
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

      <ul className="grid gap-4 mx-20 pt-10  xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
            {list}
      </ul>

      <HelpImg/>

      {/* <Test/> */}
    </main>
)
}