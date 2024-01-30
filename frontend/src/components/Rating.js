import React from 'react';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ randomrating }) => {
   const stars = [];

   for (let i = 0; i < 5; i++) {
     if (i < randomrating) {
       stars.push(<AiFillStar key={i} />);
     } else {
       stars.push(<AiOutlineStar key={i} />);
     }
   }
  return (
    <div>
        {stars}
    </div>
  )
};

export default Rating