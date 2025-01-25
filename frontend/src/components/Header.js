import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header  >
   
    
   <div className="header header-main">
  
    
        <ul >
          <li>
            <Link to="/page1"  >Set Rate</Link>
          </li>
          <li>
            <Link to="/page2"  >Generate-Quotation</Link>
          </li>
        </ul>
    
   </div>
 
    </header>
  );
}

 

export default Header;
