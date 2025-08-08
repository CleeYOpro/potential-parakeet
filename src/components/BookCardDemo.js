import React from 'react';
import BookCard from './BookCard';
import styled from 'styled-components';

const DemoContainer = styled.div`
  padding: 2rem;
  background: #1a1a1a;
  min-height: 100vh;
  
  /* Define CSS custom properties for the demo */
  --primary-color: #00ff00;
  --accent-color: #ffd700;
  --font-family: 'Arial', sans-serif;
  --font-family-mono: 'Courier New', monospace;
`;

const DemoTitle = styled.h1`
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 2rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const mockBooks = [
  {
    timeRead: "May 2023",
    title: "Elon Musk",
    author: "Walter Isaacson",
    pages: 688,
    description: "https://thebestbiographies.com/2023/09/17/review-of-elon-musk-by-walter-isaacson/",
    image: "",
    status: "completed"
  },
  {
    timeRead: "Reading now",
    title: "The Innovator's Dilemma",
    author: "Clayton M. Christensen",
    pages: 288,
    description: "Explores why successful companies fail when faced with disruptive innovation and technological change.",
    image: "",
    status: "reading"
  },
  {
    timeRead: "Future",
    title: "Zero to One",
    author: "Peter Thiel",
    pages: 224,
    description: "Notes on startups and how to build the future, focusing on creating unique value and monopolistic advantages.",
    image: "",
    status: "future"
  }
];

const BookCardDemo = () => {
  return (
    <DemoContainer>
      <DemoTitle>BookCard Expand/Collapse Demo</DemoTitle>
      <CardsContainer>
        {mockBooks.map((book, index) => (
          <BookCard
            key={index}
            book={book}
            onToggle={() => console.log(`Toggled book: ${book.title}`)}
          />
        ))}
      </CardsContainer>
    </DemoContainer>
  );
};

export default BookCardDemo;