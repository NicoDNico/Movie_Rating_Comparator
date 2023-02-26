import React, {useEffect,useState} from 'react'
export default function Poster(Prop){
    const [imgLoad,setImgLoad] = useState(false)
    const apikey='api_key=5625c97a465184ed5c6509459a4505fb';
    useEffect(()=>{
        let title = Prop.name.replace(/\s+/g,'%20');
        fetch("https://api.themoviedb.org/3/search/movie?"+apikey+"&language=en-US&query="+title+"&year="+Prop.year).then(response => response.json())
        .then((res)=> {
            const results = res.results;
            results.sort((a, b) => b['vote_count'] - a['vote_count'])
            console.log(Prop.name)
            console.log(results)
            console.log(results.length)
            for(let i = 0; i<=results.length;i++){
                let result = results[i];
                const titles = result.title;
                console.log(result.title)
                if (result.poster_path !== null && titles.toLowerCase() === Prop.name.toLowerCase()) {
                    setImgLoad(prev => ("https://image.tmdb.org/t/p/w342"+result.poster_path))
                    break
                }
            }
        } )
    },[Prop])
    return (
        <div key="Prop.key" className="container mx-auto flex flex-col bg-[#2b0071] border-4 border-[#501468] rounded-xl  font-bold font-mono">
            <h1 className='border-l-0 truncate text-2xl text-center stroke-white' style={{}} >{Prop.name}</h1>
            <img  alt={Prop.name} src={imgLoad ? imgLoad: Prop.img}></img>
            <section>
            <span className=' flex flex-row justify-start text-lg font-black gap-2 text-white'>{Prop.primaryStars}<p>{Prop.secondaryStars || "Not seen/played"}</p> </span>
            </section>
        </div>
    )
}