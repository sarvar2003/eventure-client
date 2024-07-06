import React from "react";
import { Bars3BottomLeftIcon } from "@heroicons/react/16/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

const Navbar = () => {
  return (
    <div id="navbar">
      <nav>
        <div className="logo">Eventure</div>

        <div className="searchBar">
          <Bars3BottomLeftIcon width={20} height={20} color="#49454F" />
          <input
            type="search"
            name="event-search"
            id="event-search"
            placeholder="Search events"
          />
          <MagnifyingGlassIcon width={20} height={20} color="#49454F" />
        </div>

        <div className="navLinks">
          <ul>
            <li>Find Events</li>
            <li>Create Events</li>
            <li>Login</li>
            <li>Signup</li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
