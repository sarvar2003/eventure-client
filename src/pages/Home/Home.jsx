import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';   
import EventList from '../../components/EventList'; 

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container my-5 flex-grow-1">
        {/* <h1 className="text-center mb-4 text-primary">Upcoming Events</h1> */}
        <EventList />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
