import { useEffect } from "react";
export default function Rating(Props) {
    const starsOther = [];
    const starsUser = [];
    const starsUserNum = "("+Props.userStars+")";
    var arrow = "";
    // this displays the number of stars the user gave and the amount 
    useEffect(()=>{
    },[])
    if(parseInt(Props.userStars) > parseInt(Props.otherStars)){
      arrow = "arrow-down"
    }else if(parseInt(Props.userStars) < parseInt(Props.otherStars)){
      console.log("userStars:"+Props.userStars+"  "+ parseInt(Props.userStars))
      console.log("otherStars:"+Props.otherStars+"  "+ parseInt(Props.otherStars))
      arrow = "arrow-up"
    }
      for (let i = 1; i <= Props.userStars; i++) {
          starsUser.push(
            <span
            key={i}
            className={''}
          >
            ★
          </span>
          )
      }
      for (let i = 1; i <= Props.otherStars; i++) {
        starsOther.push(
          <span
          key={i}
          className={''}
        >
          ★
        </span>
        )
    };
    return (
    <div className="rating whitespace-nowrap">
      <span className="sm:font-[0.5rem] text-nowrap ">
      {starsUser}
        <span className={(arrow === 'arrow-down')?"arrow-down":''}></span>
        <span className="rating-number ">
          {starsUserNum}
        </span>
      </span>
      <div className="filled sm:font-[0.5rem]">
        {starsOther}
        <span className={(arrow === "arrow-up")?"arrow-up":''}></span>
        <span className="rating-number">
          ({starsOther.length > 0 ? starsOther.length : "Not seen / Rated 0"})
        </span>
      </div>
    </div>);
  }