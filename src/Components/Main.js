import React ,{useState} from 'react'
import Poster from './Poster'
import Test from './Test'
import HelpImg from './HelpIMG'
export default function Main(Prop){
  // maybe this is to many states but whatever.
  const examplePoster = <Poster load='lazy' name={"the hunt"} img='https://i.pinimg.com/originals/60/83/1f/60831f185c65c38a5942444339f5d95a.png' key={'testkey'} primaryStars={10} secondaryStars={"Not seen/played" && 10} year={"2012"} />
  const [list, setList] = useState([]); //this list will contain all the movies and their names ranking of both users and img
  const [pages ,setPages] = useState({
    user:{mode:'imdb', name:""},
    other:{mode:'imdb', name:""}
  }) // this state is kinda useless but i was told to always use state before using vanilla js to extract info from inputs
  const [stats, setStats] = useState([]); // here will be store the miscallenous info the page will show if you want to know some basic stats of both users.
  const [avgUser,setAvg] = useState()
  const RegexForUR = /^ur/i; // i need this to check the validity of the imdb input
  async function Find(){
    console.log(await fetch('http://127.0.0.1:8000/testeo/nidan'));
  }
  async function test2(){
    
  }
  // Somebody once toll me the world is gonna roll me if i use async in Reactttttt
  // believe me i tried its to much for me, god bless those who can understand how chaining promises work.
  async function runTest(){
    let test2 = await fetch("https://api.themoviedb.org/3/search/multi?api_key=5625c97a465184ed5c6509459a4505fb&language=en-US&query=city%of%god").then(response => response.json());
    let results = test2.results  
    results.forEach(result => {
      if(result.poster_path !== null )
        console.log(result)
      
    });
  }
  async function runMain(){
    // Cheking if the imdb UR is correct
    if((pages.user.mode ==='imdb' && !RegexForUR.test(pages.user.name)) || (pages.other.mode ==='imdb' && !RegexForUR.test(pages.other.name))){
      alert("Please check the username you have given. ALL imdb users start with 'UR'")
      return
    }
    // call to api to fetch the primary user data
    let user = await fetch('https://erzgg8cp3a.execute-api.us-east-1.amazonaws.com/Prod/'+pages.user.mode+'/'+pages.user.name,{headers:{'x-api-key':'0fg31ilvDCl0fdZfhum82clS7J1ad0j3booSddQb'}})
    .then(res => res.json());
    console.log('user:')
    console.log(user)
    // call to api to fetch the other user data
    let other = await fetch('https://erzgg8cp3a.execute-api.us-east-1.amazonaws.com/Prod/'+pages.other.mode+'/'+pages.other.name,{headers:{'x-api-key':'0fg31ilvDCl0fdZfhum82clS7J1ad0j3booSddQb'}})
    .then(res => res.json());
    console.log('other:')
    console.log(other)
    // this loop adds the other user rating to the primary user array. i use thismethod cause thats the only thing we need from the other user.
    // it compares the names of the movies to collect the rating, it may produce errors if one or more movies share the same name.
    //Thankfully the error will just be incorrect ranking.
    for(let i =0; i<other.length;i++){
      let answer = await user.findIndex((position)=> position.Name === other[i].Name);
      if(answer !== -1){
        user[answer]["Other"] = other[i].Rating; // i store everything on the primary USER array cause we only need the rating of each movie from the other user.
        console.log(answer);
      }
      else if (answer === -1){
      }
    }
    console.log(user,other)
    lista(user)
  }
  function lista(user){ //lisa is just list in spanish. 
    
    setList(user.map(((movie,i)=>{
      return(
        <Poster name={movie.Name} img='https://i.pinimg.com/originals/60/83/1f/60831f185c65c38a5942444339f5d95a.png' key={i} primaryStars={movie.Rating} secondaryStars={"Not seen/played" && movie.Other} year={movie.Date.slice(0,3)} />
      );
    })));
  };
  function runStats(){
    let avgMod =[];
    let avgTemp = avgUser[0].length;
    for(let i=0;i<stats.length;i++){
      avgMod.push(Math.abs(stats[i].dif))
    }
      let difference = (stats.reduce((a,b)=>{return a+b.dif},0)/stats.length).toFixed(2);
      console.log("The average difference is:"+(avgMod.reduce((a,b)=>a+b,0)/avgMod.length).toFixed(2))
      console.log("You normally give movies "+difference+(difference<0?" less points than the other":" more points than the other"))
      console.log("Your average movie Rating: "+ (avgUser[0].reduce((a,b)=>a+b,0)/avgUser[0].length).toFixed(2))
    
  }
  let button = "rounded bg-[#2b0071] h-10 w-20 text-center duration-500 hover:h-20 hover:w-40  "
return(
    <main className="flex flex-col  min-h-screen bg-[#150050]  ">
      <title>NicoNico</title>
        <ul className='flex flex-col place-items-center gap-2 sm:gap-4 sm:flex-row  p-5 pt-10 sm:justify-center  text-white'>
          <button className={button}  onClick={runTest}> test</button>
          <button className={button}  onClick={Find}> find Hot Fuzz</button>
          <button className={button}  onClick={runMain}> run main</button>
          <button className={button}  onClick={runStats}>Get Stats</button>
        </ul>
        <div className='collectorMain flex flex-col sm:flex-row justify-center gap-5 sm:gap-20 md:gap-32 mt-10 font-mono font-bold text-xl'>
          <div className='collectorUser flex flex-col gap-3 items-center '>
            <select className='w-max rounded bg-[#2b0071] text-white ' onChange={(e)=> setPages((prev) =>{
              let updated = {...prev};
              updated.user.mode = e.target.value;
              return updated
            }
                )}>
                  <option value={"imdb"}>IMDB</option>
                  <option value={"letterboxd"}>LETTERBOXD</option>
              </select>
              <input type="text" className={`rounded bg-white h-10 w-48 ${(pages.user.mode ==='imdb' && !RegexForUR.test(pages.user.name))  ? `border-4 border-red-600`:``}`} onChange={(e)=> setPages((prev) =>{
              let updated = {...prev};
              updated.user.name = e.target.value;
              return updated
            }
              )
              }></input>
          </div>
          <div className='collectorUser flex flex-col gap-3 items-center  '>
            <select className='w-max rounded bg-[#2b0071] text-white' onChange={(e)=> setPages((prev) =>{
              let updated = {...prev};
              updated.other.mode = e.target.value;
              return updated
            }
              )}>
                <option value={"imdb"}>IMDB</option>
                <option value={"letterboxd"}>LETTERBOXD</option>
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
        <ul className="grid gap-4 mx-20 pt-10  xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {list}
        </ul>
        <HelpImg/>
        {/* <Test/> */}
    </main>
)
}