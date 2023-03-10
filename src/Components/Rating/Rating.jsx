import { useEffect } from "react";
export default function Rating(Props) {
    const starsOther = [];
    const starsUser = [];
    const starsOtherNum = "("+Props.totalStars+")";
    const arrow = Props.totalStars < Props.filledStars? "arrow-down":"";
    // this displays the number of stars the user gave and the amount 
    useEffect(()=>{
      console.log('test5')
    },[])
      for (let i = 1; i <= Props.totalStars; i++) {
          starsUser.push(
            <span
            key={i}
            className={''}
          >
            ★
          </span>
          )
      }
      for (let i = 1; i <= Props.filledStars; i++) {
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
    <div className="rating">
      <span>
      {starsUser}
        <span className="rating-number">
          {starsOtherNum}
        </span>
      </span>
      <div className="filled">
        {starsOther}
        <span className="rating-number">
          ({starsOther.length > 0 ? starsOther.length : "Not seen / Rated 0"})
        </span>
        <div className={arrow}  ></div>
      </div>
    </div>);
  }