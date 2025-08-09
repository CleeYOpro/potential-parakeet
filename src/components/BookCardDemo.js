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
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1692288251i/122765395.jpg",
    status: "completed"
  },
  {
    timeRead: "Reading now",
    title: "The Coming Wave: Technology, Power, and the Twenty-first Century's Greatest Dilemma",
    author: "Mustafa Suleyman",
    pages: 352,
    description: "https://books.google.com/books/about/The_Coming_Wave.html?id=a-26EAAAQBAJ",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1677634533i/123255564.jpg",
    status: "reading"
  },
  {
    timeRead: "July 2024",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    pages: 159,
    description: "https://www.readinglength.com/book/Bz8A7q1",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1383718290i/13079982.jpg",
    status: "completed"
  },
  {
    timeRead: "Future",
    title: "Leonardo da Vinci",
    author: "Walter Isaacson",
    pages: 624,
    description: "https://en.wikipedia.org/wiki/Leonardo_da_Vinci_(Isaacson_book)",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1498061258i/34684622.jpg",
    status: "future"
  },
  {
    timeRead: "Test",
    title: "Book Without Cover",
    author: "Test Author",
    pages: 200,
    description: "This book demonstrates the placeholder functionality when no image is available.",
    image: "",
    status: "completed"
  },
  {
    timeRead: "Test",
    title: "Book With Broken Image",
    author: "Test Author",
    pages: 250,
    description: "This book demonstrates error handling for broken image URLs.",
    image: "https://invalid-url-that-will-fail.com/image.jpg",
    status: "reading"
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