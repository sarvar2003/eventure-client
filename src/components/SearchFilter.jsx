import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axiosInstance from '../utils/axios';

const SearchFilter = ({ filters, onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [topicsList, setTopicsList] = useState([]);

  useEffect(() => {
    axiosInstance.get('/events/topics/')
      .then(res => setTopicsList(res.data))
      .catch(err => console.error('Failed to fetch topics:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onApplyFilters(localFilters);
  };

  return (
    <Form className="mb-4" onSubmit={handleSubmit}>
      <Row>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search by title..."
            value={localFilters.title}
            onChange={(e) => setLocalFilters({ ...localFilters, title: e.target.value })}
          />
        </Col>
        <Col md={3}>
          <Form.Select
            value={localFilters.language}
            onChange={(e) => setLocalFilters({ ...localFilters, language: e.target.value })}
          >
            <option value="">All Languages</option>
            <option value="en">English</option>
            <option value="uz">Uzbek</option>
            <option value="ru">Russian</option>
            <option value="pl">Polish</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={localFilters.topic}
            onChange={(e) => setLocalFilters({ ...localFilters, topic: e.target.value })}
          >
            <option value="">All Topics</option>
            {topicsList.map(topic => (
              <option key={topic.id} value={topic.id}>
                {topic.name.split(' ').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button type="submit" className="w-100">Search</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchFilter;
