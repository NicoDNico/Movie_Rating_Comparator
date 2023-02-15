import React ,{useState} from 'react'
import Poster from './Poster'

export default function Main(Prop){
  const [list, setList] = useState([]);
  function Find(){
    let searchfor = "Eraserhead";
    let answer = list.findIndex((position)=> position.props.name === searchfor);
    // console.log(list)
    console.log(answer);
  }
  // Somebody once toll me the world is gonna roll me if i use async in Reactttttt
  // believe me i tried its to much for me, god bless those who can understand how chaining promises work.
  async function runTest(){
    let user = await fetch('http://127.0.0.1:8000/api/sslar')
    .then(res => res.json());
    let other = await fetch('http://127.0.0.1:8000/api/Anumess')
    .then(res => res.json())
    for(let i =0; i<other.length;i++){
      let answer = await user.findIndex((position)=> position.Name === other[i].Name);
      if(answer !== -1){
        user[answer]["Other"] = other[i].Rating;
        console.log(answer);
      }
      else if (answer === -1){
      }
    }
    console.log(user,other)
    lista(user)
  }
  function lista(user){
 
    setList(user.map(((movie,i)=>{
      return(
        <Poster name={movie.Name} img='https://i.pinimg.com/originals/60/83/1f/60831f185c65c38a5942444339f5d95a.png' key={i} primaryStars={movie.Rating} secondaryStars={"Not seen/played" && movie.Other} />
      );
    })));
  };
return(
    <main className="flex flex-col min-h-screen bg-[#150050] text-white ">
        <ul className='flex flex-row align-top p-5 pt-10 justify-center'>
          <button className='rounded bg-[#2b0071] h-10 w-20 text-center duration-500 hover:h-20 hover:w-40'  onClick={runTest}> test</button>
          <button className='rounded bg-[#2b0071] h-10 w-20 text-center duration-500 hover:h-20 hover:w-40'  onClick={Find}> find Hot Fuzz</button>
        </ul>
        <div className='collectorMain flex flex-row justify-center gap-32 mt-10 '>
          <div className='collectorUser text-black'>
            <select>
              <option>IMDB</option>
              <option>LETTERBOXD</option>
            </select>
            <input type="text" className='rounded bg-white h-10 w-30'></input>
          </div>
          <div className='collectorUser'>
            <input type="text" className='rounded bg-white h-10 w-30'></input>
          </div>
        </div>
        <ul className="grid grid-cols-5 gap-4 mx-20 pt-10">
            {list}
        </ul>
    </main>
)
}