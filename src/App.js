import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Abstract from './components/Abstract';
import Podcast from './components/Podcast';
import Architecture from './components/Architecture';
import Demo from './components/Demo';
import Results from './components/Results';
import Citation from './components/Citation';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <Abstract />
      <Podcast />
      <Architecture />
      <Demo />
      {/* <Installation /> */}
      <Results />
      <Citation />
      <Footer />
    </div>
  );
}

export default App;
