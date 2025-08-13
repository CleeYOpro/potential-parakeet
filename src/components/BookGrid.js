import styled from 'styled-components';
import BookCard from './BookCard';

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 2rem 2vw;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: 98vw;
    padding-left: 3vw;
    padding-right: 3vw;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
    max-width: 55vw;
    padding-left: 3vw;
    padding-right: 3vw;
  }

}

  overflow-x: auto;
`;

const BookGrid = ({ books, onBookClick }) => {
  return (
    <BooksGrid>
      {books.map((book, index) => (
        <BookCard
          key={index}
          book={book}
          onToggle={() => onBookClick && onBookClick(index)}
        />
      ))}
    </BooksGrid>
  );
};

export default BookGrid;
