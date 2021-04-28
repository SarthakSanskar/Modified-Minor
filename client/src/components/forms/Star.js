import React from 'react'
import StarRating from 'react-star-ratings'

const Star = ({starClicks , numberOfStar}) => (<>
    <StarRating
        changeRating = {() => starClicks(numberOfStar)}
        numberOfStar = {numberOfStar}
        starDimension = "20px"
        starSpacing = '2px'
        starHoverColor = 'red'
        starEmptyColor = 'red'
    />
    <br />
</>
);

export default Star;