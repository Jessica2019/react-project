import { useState, useEffect} from 'react';
import {members} from './data';
import "./styles.css";

const useDebounce = (func, milliseconds) => {
  const time = milliseconds || 400
  let timer

  return event => {
      if (timer) {
          clearTimeout(timer)
      }

      timer = setTimeout(func, time, event)
  }
}

function MemberDetail({member, isOpen}) {
  return(isOpen && <div className='detail'>
    Age: {member.age} <br />
    Rating: {member.memberRating} <br />
    Last three activities: <br />
    {member.activities
    .slice(member.activities.length - 3).map(at => <li>{at}</li>)}
    </div>);
}

function MemberItem({member, collapse}) {
  const [showMore, setShowMore] = useState(false);
  function onToggle(){
    setShowMore(!showMore);
  }
    
    
  return (
     <li >
        <button className="btn name" onClick={onToggle} >
          {member.name} 
          </button>
          <MemberDetail isOpen={showMore} member={member} />
        </li>
  );
}


export default function App() {
  const [showMembers, setshowMembers] = useState(members);
  const [searchInput, setSearchInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  
  if (searchInput.length > 0) {
    setshowMembers(showMembers.filter((m) => {
      return m.name.match(searchInput);
    }));
  }
  // should use debounce but I run out of time
  return (
    <>
    <div className='searchbar'>
       <h1 >All members:</h1>
        <input
          type="text"
          placeholder="Search name"
          onChange={handleChange}
          value={searchInput} />
    </div>
      <ul>
        {showMembers.map(m => <MemberItem member={m}/>)}
      </ul>
      
    </>
  );
}

