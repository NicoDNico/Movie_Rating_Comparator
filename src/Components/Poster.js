import React, {useEffect,useState} from 'react'
export default function Poster(Prop){
    const [imgLoad,setImgLoad] = useState(false)
    console.log('test')
    const apikey = 'api_key=5625c97a465184ed5c6509459a4505fb';
    useEffect(()=>{
        let title = Prop.name.replace(/\s+/g,'%20');
        fetch("https://api.themoviedb.org/3/search/multi?"+apikey+"&language=en-US&query="+title).then(response => response.json())
        .then((res)=> {
            if(res.results[0].poster_path){
                setImgLoad(prev => ("https://image.tmdb.org/t/p/w342"+res.results[0].poster_path))
            }
            else{
                if(res.results[1].poster_path){
                    setImgLoad(prev => ("https://image.tmdb.org/t/p/w342"+res.results[1].poster_path))
                }
                else(
                    console.log('No Poster')
                )
            }
        } )
    },[])
    return (
        <div key="Prop.key" className="container mx-auto flex flex-col bg-[#2b0071] border-4 border-[#501468] rounded-xl">
            <h1 className='border-l-0 truncate text-2xl text-center'>{Prop.name}</h1>
            <img  alt={Prop.name} src={imgLoad ? imgLoad: Prop.img}></img>
            <section>
            <p className='justify-end'>{Prop.primaryStars}  {Prop.secondaryStars || "Not seen/played"}</p>
            </section>
        </div>
    )
}