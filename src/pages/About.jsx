import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../components/Navbar'; 
import { about } from '../assets/images/export';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
        <Navbar/>
        <Container className="my-5">
        <h1 className="text-center mb-4">About Eventure</h1>

        <Row className="mb-5">
            <Col md={6}>
            <img
                src={about} // make sure image is in /public or import it
                alt="About Eventure"
                className="img-fluid rounded"
            />
            </Col>
            <Col md={6}>
            <h3>Who We Are</h3>
            <p>
                Eventure is your one-stop destination for discovering and attending the most exciting events around you. 
                Whether it's concerts, workshops, or conferences – we make it easy to explore, book, and enjoy.
            </p>
            <h3>Our Mission</h3>
            <p>
                We're on a mission to connect people with unforgettable experiences, helping organizers and guests find each other with ease and confidence.
            </p>
            </Col>
        </Row>

        <Row className="text-center">
            <Col md={4}>
            <Card className="p-3 shadow-sm">
                <h4>Discover Events</h4>
                <p>Find trending and nearby events from all categories in one place.</p>
            </Card>
            </Col>
            <Col md={4}>
            <Card className="p-3 shadow-sm">
                <h4>Book with Ease</h4>
                <p>Reserve your spot in just a few clicks. Fast, simple, and secure.</p>
            </Card>
            </Col>
            <Col md={4}>
            <Card className="p-3 shadow-sm">
                <h4>Organize Your Way</h4>
                <p>Create and manage your events effortlessly, with full control.</p>
            </Card>
            </Col>
        </Row>
        </Container>
        <Footer />
    </div>
  );
};

export default About;
