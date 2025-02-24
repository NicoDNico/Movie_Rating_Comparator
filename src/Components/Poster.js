import React, {useEffect,useState} from 'react'
import Rating from './Rating/Rating'
export default function Poster(Prop){
    const [imgLoad,setImgLoad] = useState(false)
    const apikey=process.env.REACT_APP_API_KEY;
    useEffect(()=>{
        let title = Prop.name.replace(/\s+/g,'%20');
        // mfs changed where the api key goes and took me TOO long to figure it out
        // fetch("https://api.themoviedb.org/3/search/movie?"+apikey+"&language=en-US&query="+title+"&year="+Prop.year).then(response => response.json())
        fetch("https://api.themoviedb.org/3/search/movie?"+apikey+"&language=en-US&query="+title).then(response => response.json())
        .then((res)=> {
            const results = res.results;
            // i need a way to figure out wich movie in the bast mount that repeat nmes should be used for the poster
            // i use popularity cause letterboxd doesnt give the year of a movie prescripting. This leads to incorrect posters on some movies specially my favorite in wich it ocurres The hunt (2012)
            results.sort((a, b) => b['vote_count'] - a['vote_count'])
            for(let i = 0; i<=results.length;i++){
                let result = results[i];
                const titles = result.title;
                if (result.poster_path !== null && titles.toLowerCase() === Prop.name.toLowerCase()) {
                    setImgLoad(prev => ("https://image.tmdb.org/t/p/w342"+result.poster_path))
                    break
                }
            }
        } )
    },[Prop])
    return (
        <div href={Prop.Link} className="container mx-auto flex flex-col bg-[#2b0071] border-4 border-[#501468] rounded-xl  font-bold font-mono">
            <h1 className='border-l-0 truncate text-2xl text-center stroke-white' >{Prop.name}</h1>
            <img alt={Prop.name} loading={"lazy"} src={imgLoad ? imgLoad: Prop.img}></img>
            <section >
           <Rating userStars={Prop.primaryStars} otherStars={Prop.secondaryStars} />
            </section>
        </div>
    )
}
