
export default function Rating(Props) {
    const starsOther = [];
    const starsUser = [];
    const starsOtherNum = "("+Props.totalStars+")";
    // this displays the number of stars the user gave and the amount 
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
  }
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
          ({starsOther.length})
        </span>
      </div>
    </div>);
  }