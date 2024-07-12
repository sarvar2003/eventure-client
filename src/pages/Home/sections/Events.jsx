import React from "react";
import pic1 from "../../../assets/images/meetup.jpg";
import { UserCircleIcon } from "@heroicons/react/16/solid";

const Events = () => {
  return (
    <>
      <div id="events">
        <div className="events-header">
          <h2 className="main-heading poppins-semibold">
            Top Trending Events
            <span>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.3958 12H20.1969M20.1969 12C20.1969 13.9598 19.3864 15.8389 17.9429 17.2247C16.4993 18.6105 14.5415 19.389 12.5 19.389M20.1969 12C20.1969 10.0402 19.3864 8.16013 17.9429 6.77433C16.4993 5.38853 14.5415 4.611 12.5 4.611M12.5 2.5V4.611M12.5 4.611C10.4587 4.611 8.50092 5.38848 7.05748 6.77419C5.61403 8.15989 4.80311 10.0393 4.80311 11.999C4.80311 13.9587 5.61403 15.8381 7.05748 17.2238C8.50092 18.6095 10.4587 19.389 12.5 19.389M2.60416 12H4.80311M12.5 21.5V19.389"
                  stroke="#000AFF"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
                <path
                  d="M12.5 16.222C13.6664 16.222 14.785 15.7772 15.6098 14.9854C16.4346 14.1936 16.8979 13.1197 16.8979 12C16.8979 10.8803 16.4346 9.80637 15.6098 9.0146C14.785 8.22282 13.6664 7.778 12.5 7.778C11.3336 7.778 10.215 8.22282 9.3902 9.0146C8.56543 9.80637 8.10208 10.8803 8.10208 12C8.10208 13.1197 8.56543 14.1936 9.3902 14.9854C10.215 15.7772 11.3336 16.222 12.5 16.222Z"
                  stroke="#000AFF"
                  stroke-width="1.5"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
              </svg>
              Warsaw
            </span>
          </h2>
        </div>
      </div>
      <div className="top-categories">
        <ul>
          <li>All</li>
          <li>Today</li>
          <li>Online</li>
          <li>AI</li>
          <li>Startups</li>
          <li>Business Coaching</li>
          <li>Tech meetups</li>
        </ul>
      </div>
      <div className="events-container">
        <div className="event-card">
          <div className="thumbnail">
            <img src={pic1} alt="" />
          </div>
          <div className="info">
            <div className="title">
              Business meetup to discover marketing strategies for 2024
            </div>
            <div className="data">Friday | 7:00 p.m</div>
            <div className="location">Warsaw</div>
            <div className="price">Free</div>
            <div className="profile">Sarvarbek Juraev</div>
            <div className="followers">
              <UserCircleIcon
                width={15}
              />
              12389 followers
            </div>
          </div>
        </div>
        <div className="event-card">
          <div className="thumbnail">
            <img src={pic1} alt="" />
          </div>
          <div className="info">
            <div className="title">
              Business meetup to discover marketing strategies for 2024
            </div>
            <div className="data">Friday | 7:00 p.m</div>
            <div className="location">Warsaw</div>
            <div className="price">Free</div>
            <div className="profile">Sarvarbek Juraev</div>
            <div className="followers">
              <UserCircleIcon
                width={15}
              />
              12389 followers
            </div>
          </div>
        </div>
        <div className="event-card">
          <div className="thumbnail">
            <img src={pic1} alt="" />
          </div>
          <div className="info">
            <div className="title">
              Business meetup to discover marketing strategies for 2024
            </div>
            <div className="data">Friday | 7:00 p.m</div>
            <div className="location">Warsaw</div>
            <div className="price">Free</div>
            <div className="profile">Sarvarbek Juraev</div>
            <div className="followers">
              <UserCircleIcon
                width={15}
              />
              12389 followers
            </div>
          </div>
        </div>
        <div className="event-card">
          <div className="thumbnail">
            <img src={pic1} alt="" />
          </div>
          <div className="info">
            <div className="title">
              Business meetup to discover marketing strategies for 2024
            </div>
            <div className="data">Friday | 7:00 p.m</div>
            <div className="location">Warsaw</div>
            <div className="price">Free</div>
            <div className="profile">Sarvarbek Juraev</div>
            <div className="followers">
              <UserCircleIcon
                width={15}
              />
              12389 followers
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
