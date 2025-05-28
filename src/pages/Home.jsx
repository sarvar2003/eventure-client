import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import SearchFilter from '../components/SearchFilter'

const Home = () => {
  const [filters, setFilters] = useState({
    title: '',
    language: '',
    topic: '',
  });

  useEffect(() => {

    const userInterestedTopics = document.cookie.split('; ').find(row => row.startsWith('user_interested_topics='));
    if (!userInterestedTopics) {
           window.location.href = '/interests';
    }
  }, []);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="container my-5 flex-grow-1">
        <SearchFilter filters={filters} onApplyFilters={handleApplyFilters} />
        <EventList filters={filters} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
