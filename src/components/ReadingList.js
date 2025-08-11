import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BookCard from './BookCard';

const ReadingListContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  z-index: 2;
  background: transparent;
`;

const PageTitle = styled.h1`
  margin-top: 5rem;
  text-align: center;  
  font-size: 2.5rem;
  color: var(--primary-color);
  text-shadow: 0 0 10px var(--primary-color);
  font-family: var(--font-family-mono);
  letter-spacing: 3px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
`;

const BooksContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BooksCount = styled.div`
  color: var(--primary-color);
  text-align: center;
  font-size: 1rem;
  margin-top: 2rem;
  font-family: var(--font-family-mono);
  letter-spacing: 1px;
  
  span {
    color: var(--accent-color, #ffd700);
    font-weight: bold;
  }
`;
const booksData = [
  {timeRead: "Ongoing",
    title: "The Bible",
    author: "Various",
    pages: 1300,
    description: "https://www.bibleref.com/John/1/John-chapter-1.html",
    image: "https://bbhchurchconnection.wordpress.com/wp-content/uploads/2010/11/king-james-cover.jpg",
    status: "reading"},
  {
    timeRead: "March 2023",
    title: "Every Falling Star",
    author: "Sungju Lee",
    pages: 344,
    description: "https://www.supersummary.com/every-falling-star/summary/",
    image: "https://m.media-amazon.com/images/I/81NP3EJAgdL._SY522_.jpg",
    status: "completed"

  },
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
    timeRead: "November 2023",
    title: "Moby Dick",
    author: "Herman Melville",
    pages: 378,
    description: "https://www.readinglength.com/book/BDIyjNj",
    image: "https://prodimage.images-bn.com/pimages/9781454959809_p0_v9_s600x595.jpg",
    status: "completed"
  },
  {
    timeRead: "December 2023",
    title: "Google It",
    author: "Anne Fine",
    pages: 207,
    description: "https://missmegslibrary.wordpress.com/2019/09/22/book-review-google-it-a-history-of-google/",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1524786081i/37901985.jpg",
    status: "completed"
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
    timeRead: "October 2024",
    title: "Shoe Dog",
    author: "Phil Knight",
    pages: 400,
    description: "https://en.wikipedia.org/wiki/Shoe_Dog",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Shoe_dog_book_cover.jpg/800px-Shoe_dog_book_cover.jpg",
    status: "completed"
  },
  {
    timeRead: "January 2025",
    title: "The Martian",
    author: "Andy Weir",
    pages: 388,
    description: "https://www.readinglength.com/book/BNN9esY",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1413706054i/18007564.jpg",
    status: "completed"
  },
  {
    timeRead: "April 2025",
    title: "Leonardo da Vinci",
    author: "Walter Isaacson",
    pages: 624,
    description: "https://en.wikipedia.org/wiki/Leonardo_da_Vinci_(Isaacson_book)",
    image: "https://m.media-amazon.com/images/I/91Ey0+6N-LL._UF1000,1000_QL80_.jpg",
    status: "completed"
  },
  {
    timeRead: "June 2025",
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    pages: 371,
    description: "https://en.wikipedia.org/wiki/The_Kite_Runner",
    image: "https://upload.wikimedia.org/wikipedia/en/6/62/Kite_runner.jpg",
    status: "completed"
  },
  {
    timeRead: "Reading now",
    title: "The Coming Wave",
    author: "Mustafa Suleyman",
    pages: 352,
    description: "https://books.google.com/books/about/The_Coming_Wave.html?id=a-26EAAAQBAJ",
    image: "https://m.media-amazon.com/images/I/81zQiMu4A5L._UF1000,1000_QL80_.jpg",
    status: "reading"
  },
];

// Book data validation utility
const validateBookData = (book, index) => {
  const errors = [];
  const warnings = [];
  
  // Required fields validation
  if (!book.title || typeof book.title !== 'string' || book.title.trim() === '') {
    errors.push(`Book at index ${index}: Missing or invalid title`);
  }
  
  if (!book.author || typeof book.author !== 'string' || book.author.trim() === '') {
    errors.push(`Book at index ${index}: Missing or invalid author`);
  }
  
  if (!book.timeRead || typeof book.timeRead !== 'string' || book.timeRead.trim() === '') {
    errors.push(`Book at index ${index}: Missing or invalid timeRead`);
  }
  
  if (!book.status || typeof book.status !== 'string') {
    errors.push(`Book at index ${index}: Missing or invalid status`);
  } else if (!['completed', 'reading', 'future'].includes(book.status)) {
    warnings.push(`Book at index ${index}: Invalid status "${book.status}". Expected: completed, reading, or future`);
  }
  
  // Optional fields validation
  if (book.pages !== undefined && (typeof book.pages !== 'number' || book.pages <= 0)) {
    warnings.push(`Book at index ${index}: Invalid pages count "${book.pages}". Should be a positive number`);
  }
  
  if (book.description !== undefined && typeof book.description !== 'string') {
    warnings.push(`Book at index ${index}: Invalid description type. Should be a string`);
  }
  
  if (book.image !== undefined && typeof book.image !== 'string') {
    warnings.push(`Book at index ${index}: Invalid image type. Should be a string URL`);
  }
  
  // URL validation for description if it looks like a URL
  if (book.description && typeof book.description === 'string') {
    const trimmedDesc = book.description.trim();
    if (trimmedDesc.startsWith('http://') || trimmedDesc.startsWith('https://')) {
      try {
        new URL(trimmedDesc);
      } catch {
        warnings.push(`Book at index ${index}: Invalid URL in description "${trimmedDesc}"`);
      }
    }
  }
  
  // Image URL validation if provided
  if (book.image && typeof book.image === 'string' && book.image.trim() !== '') {
    const trimmedImage = book.image.trim();
    if (!trimmedImage.startsWith('http://') && !trimmedImage.startsWith('https://') && !trimmedImage.startsWith('/')) {
      warnings.push(`Book at index ${index}: Image URL "${trimmedImage}" may be invalid. Should start with http://, https://, or /`);
    }
  }
  
  return { errors, warnings, isValid: errors.length === 0 };
};

// Function to validate and filter book data
const validateAndFilterBooks = (books) => {
  if (!Array.isArray(books)) {
    console.error('ReadingList: Book data is not an array');
    return [];
  }
  
  const validBooks = [];
  let totalErrors = 0;
  let totalWarnings = 0;
  
  books.forEach((book, index) => {
    if (!book || typeof book !== 'object') {
      console.error(`ReadingList: Book at index ${index} is not a valid object`);
      totalErrors++;
      return;
    }
    
    const validation = validateBookData(book, index);
    
    // Log errors
    validation.errors.forEach(error => {
      console.error(`ReadingList Validation Error: ${error}`);
      totalErrors++;
    });
    
    // Log warnings
    validation.warnings.forEach(warning => {
      console.warn(`ReadingList Validation Warning: ${warning}`);
      totalWarnings++;
    });
    
    // Only include valid books
    if (validation.isValid) {
      // Sanitize the book data
      const sanitizedBook = {
        ...book,
        title: book.title.trim(),
        author: book.author.trim(),
        timeRead: book.timeRead.trim(),
        status: book.status.toLowerCase(),
        description: book.description ? book.description.trim() : '',
        image: book.image ? book.image.trim() : '',
        pages: typeof book.pages === 'number' ? book.pages : undefined
      };
      
      validBooks.push(sanitizedBook);
    }
  });
  
  // Summary logging
  if (totalErrors > 0 || totalWarnings > 0) {
    console.group('ReadingList Data Validation Summary');
    console.log(`Total books processed: ${books.length}`);
    console.log(`Valid books: ${validBooks.length}`);
    console.log(`Books with errors (excluded): ${totalErrors}`);
    console.log(`Books with warnings (included): ${totalWarnings}`);
    console.groupEnd();
  }
  
  return validBooks;
};

// Function to sort books chronologically
const sortBooksChronologically = (books) => {
  return [...books].sort((a, b) => {
    // Priority order: future > reading > completed (newest first)
    if (a.status === 'future' && b.status !== 'future') return -1;
    if (b.status === 'future' && a.status !== 'future') return 1;
    
    if (a.status === 'reading' && b.status !== 'reading') return -1;
    if (b.status === 'reading' && a.status !== 'reading') return 1;
    
    if (a.status === 'completed' && b.status === 'completed') {
      // Sort completed books by date (newest first)
      const dateA = new Date(a.timeRead + ' 1');
      const dateB = new Date(b.timeRead + ' 1');
      return dateB - dateA;
    }
    
    // Maintain original order for same status
    return 0;
  });
};

const ReadingList = () => {
  const [validatedBooks, setValidatedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasValidationErrors, setHasValidationErrors] = useState(false);
  const [expandedCards, setExpandedCards] = useState(new Set());
  
  // Validate and process book data on component mount
  useEffect(() => {
    try {
      console.log('ReadingList: Starting book data validation...');
      const validBooks = validateAndFilterBooks(booksData);
      
      if (validBooks.length === 0) {
        console.error('ReadingList: No valid books found after validation');
        setHasValidationErrors(true);
      } else if (validBooks.length < booksData.length) {
        console.warn(`ReadingList: ${booksData.length - validBooks.length} books were excluded due to validation errors`);
        setHasValidationErrors(true);
      }
      
      setValidatedBooks(validBooks);
    } catch (error) {
      console.error('ReadingList: Critical error during book data validation:', error);
      setHasValidationErrors(true);
      setValidatedBooks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Sort books chronologically for display
  const sortedBooks = sortBooksChronologically(validatedBooks);
  
  // Handle card expansion
  const handleCardToggle = (index) => {
    const newExpandedCards = new Set(expandedCards);
    if (newExpandedCards.has(index)) {
      newExpandedCards.delete(index);
    } else {
      newExpandedCards.add(index);
    }
    setExpandedCards(newExpandedCards);
  };
  
  // Loading state
  if (isLoading) {
    return (
      <ReadingListContainer>
        <PageTitle>Reading List</PageTitle>
        <BooksContainer>
          <div style={{ 
            color: 'var(--primary-color)', 
            textAlign: 'center', 
            fontSize: '1.2rem',
            marginTop: '2rem'
          }}>
            Loading books...
          </div>
        </BooksContainer>
      </ReadingListContainer>
    );
  }
  
  // Error state
  if (hasValidationErrors && sortedBooks.length === 0) {
    return (
      <ReadingListContainer>
        <PageTitle>Bookshelf</PageTitle>
        <BooksContainer>
          <div style={{ 
            color: '#ff6b6b', 
            textAlign: 'center', 
            fontSize: '1.2rem',
            marginTop: '2rem'
          }}>
            ⚠️ Unable to load books due to data validation errors.
            <br />
            <span style={{ fontSize: '1rem', opacity: 0.8, marginTop: '1rem', display: 'block' }}>
              Check the console for detailed error information.
            </span>
          </div>
        </BooksContainer>
      </ReadingListContainer>
    );
  }

  return (
    <ReadingListContainer>
      <PageTitle>Bookshelf</PageTitle>
      <BooksContainer>
      <BooksCount>
          Not a big bookworm, but I’ll read for school or if it’s actually interesting. My YouTube history says more about me—anyway, here’s what I’ve read/been reading. Right now I have <span>{sortedBooks.length}</span> books in collection
        </BooksCount>
        
        <BooksGrid>
          {sortedBooks.map((book, index) => (
            <BookCard
              key={`${book.title}-${book.author}-${index}`}
              book={book}
              isExpanded={expandedCards.has(index)}
              onToggle={() => handleCardToggle(index)}
            />
          ))}
        </BooksGrid>
      </BooksContainer>
    </ReadingListContainer>
  );
};

export default ReadingList;