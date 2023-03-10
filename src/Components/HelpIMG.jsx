import Poster from "./Poster"
export default function HelpImg(){
    console.log("test7")
    return(
        <div className="flex  justify-center ">
            <div className="w-1/4 flex">
            <Poster load='lazy' name={"the hunt"} img={'https://i.pinimg.com/originals/60/83/1f/60831f185c65c38a5942444339f5d95a.png'} key={'testkey'} primaryStars={10} secondaryStars={10} year={"2012"} />
            </div>
        </div>
    )
}