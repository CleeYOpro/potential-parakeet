import styled from 'styled-components';

const ReadingListContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  position: relative;
  z-index: 2;
  background: transparent;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
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

// Static book data array based on the provided information
const booksData = [
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
    timeRead: "April 2023",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    pages: 656,
    description: "A comprehensive biography of Apple's co-founder, exploring his innovative genius and complex personality.",
    image: "",
    status: "completed"
  },
  {
    timeRead: "March 2023",
    title: "The Lean Startup",
    author: "Eric Ries",
    pages: 336,
    description: "A methodology for developing businesses and products through validated learning and iterative design.",
    image: "",
    status: "completed"
  },
  {
    timeRead: "February 2023",
    title: "Atomic Habits",
    author: "James Clear",
    pages: 320,
    description: "A practical guide to building good habits and breaking bad ones through small, incremental changes.",
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
  },
  {
    timeRead: "Future",
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    pages: 304,
    description: "Practical advice for building and running a startup, dealing with difficult business decisions.",
    image: "",
    status: "future"
  },
  {
    timeRead: "January 2023",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    pages: 464,
    description: "A brief history of humankind, exploring how Homo sapiens came to dominate the world.",
    image: "",
    status: "completed"
  }
];

// Function to sort books chronologically
const sortBooksChronologically = (books) => {
  return [...books].sort((a, b) => {
    // Priority order: reading > completed (newest first) > future
    if (a.status === 'reading' && b.status !== 'reading') return -1;
    if (b.status === 'reading' && a.status !== 'reading') return 1;
    
    if (a.status === 'completed' && b.status === 'completed') {
      // Sort completed books by date (newest first)
      const dateA = new Date(a.timeRead + ' 1');
      const dateB = new Date(b.timeRead + ' 1');
      return dateB - dateA;
    }
    
    if (a.status === 'completed' && b.status === 'future') return -1;
    if (b.status === 'completed' && a.status === 'future') return 1;
    
    // Future books maintain their original order
    return 0;
  });
};

const ReadingList = () => {
  // Sort books chronologically for display
  const sortedBooks = sortBooksChronologically(booksData);
  
  return (
    <ReadingListContainer>
      <PageTitle>Reading List</PageTitle>
      <BooksContainer>
        {/* Book display will be implemented in subsequent tasks */}
        <div style={{ 
          color: 'var(--primary-color)', 
          textAlign: 'center', 
          fontSize: '1.2rem',
          marginTop: '2rem'
        }}>
          {sortedBooks.length} books in collection
        </div>
        
        {/* Temporary display for development - will be replaced with BookGrid component */}
        <div style={{ marginTop: '2rem' }}>
          {sortedBooks.map((book, index) => (
            <div key={index} style={{
              background: 'rgba(30, 30, 30, 0.85)',
              border: `2px solid ${
                book.status === 'completed' ? 'rgba(34, 197, 94, 0.6)' :
                book.status === 'reading' ? 'rgba(251, 191, 36, 0.6)' :
                'rgba(107, 114, 128, 0.4)'
              }`,
              borderRadius: '10px',
              padding: '1rem',
              margin: '1rem 0',
              color: '#ddd',
              opacity: book.status === 'future' ? 0.9 : 1
            }}>
              <div style={{ 
                color: book.status === 'completed' ? 'rgba(34, 197, 94, 1)' :
                       book.status === 'reading' ? 'rgba(251, 191, 36, 1)' :
                       'rgba(107, 114, 128, 0.9)',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                {book.status === 'completed' && '✓'}
                {book.status === 'reading' && '📖'}
                {book.status === 'future' && '📅'}
                {book.timeRead}
              </div>
              <h3 style={{ color: 'var(--primary-color)', margin: '0.5rem 0' }}>
                {book.title}
              </h3>
              <div>by {book.author}</div>
            </div>
          ))}
        </div>
      </BooksContainer>
    </ReadingListContainer>
  );
};

export default ReadingList;