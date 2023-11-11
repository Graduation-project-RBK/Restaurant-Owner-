import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Nav.css';


function NavBar() {
    return (
      <div class="navbar">
      <a class="navbar-brand" href="/home">Reservi</a>
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="/Images">Images</a></li>
        <li class="nav-item"><a href="/reservation-list" class="nav-link"><i class="fa fa-bell"></i> </a></li>
        <li class="nav-item"><a href="/Messages" class="nav-link"><i class="fa fa-envelope"></i> </a></li>
        <li class="nav-item"><a href="/Reviews" class="nav-link">Reviews</a></li>
        <li class="nav-item"><a href="/Settings" class="nav-link"><i class="fa fa-cog"></i> </a></li>
        <li class="nav-item"><a href="/" class="nav-link">Log In</a></li>
      </ul>
    </div>
    
    
      
      
    );
}

export default NavBar;
