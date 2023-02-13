import {useState} from 'react';

export function MemberItem({member}) {
  const [showMore, setShowMore] = useState(false);
  function handleMoreClick() {
    setShowMore(!showMore);
  }
  return (
   
     <li>
          {member.name} 
           <button onClick={handleMoreClick}>
           {showMore ? 'Hide' : 'Show'} details
          </button>
          {showMore && <p>{member.memberRating}</p>}
        </li>
  );
}