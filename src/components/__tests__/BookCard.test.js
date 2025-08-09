import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from '../BookCard';

// Mock CSS custom properties for testing
const mockCSSProperties = `
  :root {
    --primary-color: #00ff00;
    --accent-color: #ffd700;
    --font-family: 'Arial', sans-serif;
    --font-family-mono: 'Courier New', monospace;
  }
`;

// Add CSS to document head for testing
beforeAll(() => {
  const style = document.createElement('style');
  style.textContent = mockCSSProperties;
  document.head.appendChild(style);
});

// Mock book data for testing
const mockBook = {
  timeRead: "May 2023",
  title: "Test Book",
  author: "Test Author",
  pages: 300,
  description: "This is a test description for the book.",
  image: "",
  status: "completed"
};

const mockBookWithUrl = {
  ...mockBook,
  description: "https://example.com/review"
};

const mockBookWithInvalidUrl = {
  ...mockBook,
  description: "not-a-valid-url"
};

const mockBookWithEmptyDescription = {
  ...mockBook,
  description: ""
};

const mockBookWithWhitespaceDescription = {
  ...mockBook,
  description: "   "
};

const mockBookWithImage = {
  ...mockBook,
  image: "https://example.com/book-cover.jpg"
};

const mockBookWithInvalidImage = {
  ...mockBook,
  image: "invalid-url"
};

const mockBookWithEmptyImage = {
  ...mockBook,
  image: ""
};

describe('BookCard', () => {
  test('renders book information', () => {
    render(<BookCard book={mockBook} />);
    
    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('May 2023')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  test('renders expanded content', () => {
    render(<BookCard book={mockBook} />);
    
    // Content should be in the document
    expect(screen.getByText('300 pages')).toBeInTheDocument();
    expect(screen.getByText('This is a test description for the book.')).toBeInTheDocument();
  });

  test('handles click events', () => {
    const mockOnToggle = jest.fn();
    render(<BookCard book={mockBook} onToggle={mockOnToggle} />);
    
    const cardContainer = screen.getByTestId('book-card');
    fireEvent.click(cardContainer);
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  test('renders external link when description is URL', () => {
    render(<BookCard book={mockBookWithUrl} />);
    
    const link = screen.getByText('Read full review →');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'https://example.com/review');
    expect(link.closest('a')).toHaveAttribute('target', '_blank');
  });

  test('supports controlled expanded state', () => {
    const { rerender } = render(<BookCard book={mockBook} isExpanded={false} />);
    
    // Re-render with expanded=true
    rerender(<BookCard book={mockBook} isExpanded={true} />);
    
    // Should render the expanded content
    expect(screen.getByText('300 pages')).toBeInTheDocument();
  });

  test('handles invalid URLs gracefully', () => {
    render(<BookCard book={mockBookWithInvalidUrl} />);
    
    // Should render as plain text, not as a link
    expect(screen.getByText('not-a-valid-url')).toBeInTheDocument();
    expect(screen.queryByText('Read full review →')).not.toBeInTheDocument();
  });

  test('handles empty description gracefully', () => {
    render(<BookCard book={mockBookWithEmptyDescription} isExpanded={true} />);
    
    // Should show fallback message
    expect(screen.getByText('No description available')).toBeInTheDocument();
  });

  test('handles whitespace-only description gracefully', () => {
    render(<BookCard book={mockBookWithWhitespaceDescription} isExpanded={true} />);
    
    // Should show fallback message for whitespace-only description
    expect(screen.getByText('No description available')).toBeInTheDocument();
  });

  test('external links open in new tab without navigation', () => {
    // Mock window.open
    const mockWindowOpen = jest.fn();
    const originalOpen = window.open;
    window.open = mockWindowOpen;

    render(<BookCard book={mockBookWithUrl} />);
    
    const link = screen.getByText('Read full review →');
    fireEvent.click(link);
    
    expect(mockWindowOpen).toHaveBeenCalledWith(
      'https://example.com/review',
      '_blank',
      'noopener,noreferrer'
    );

    // Restore original window.open
    window.open = originalOpen;
  });

  test('link click does not trigger card toggle', () => {
    const mockOnToggle = jest.fn();
    render(<BookCard book={mockBookWithUrl} onToggle={mockOnToggle} />);
    
    const link = screen.getByText('Read full review →');
    fireEvent.click(link);
    
    // Card toggle should not be called when clicking the link
    expect(mockOnToggle).not.toHaveBeenCalled();
  });

  test('renders book cover image when provided', () => {
    render(<BookCard book={mockBookWithImage} />);
    
    const image = screen.getByAltText('Test Book cover');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/book-cover.jpg');
    expect(image).toHaveAttribute('loading', 'lazy');
    expect(image).toHaveAttribute('decoding', 'async');
  });

  test('shows placeholder when no image is provided', () => {
    render(<BookCard book={mockBookWithEmptyImage} />);
    
    // Should show placeholder with book emoji and "No Cover" text
    const placeholder = screen.getByText('📚');
    expect(placeholder).toBeInTheDocument();
  });

  test('handles image loading states', () => {
    render(<BookCard book={mockBookWithImage} />);
    
    // Initially should show loading state
    expect(screen.getByText('⏳')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('handles image error gracefully', () => {
    render(<BookCard book={mockBookWithInvalidImage} />);
    
    const image = screen.getByAltText('Test Book cover');
    
    // Simulate image load error
    fireEvent.error(image);
    
    // Should show placeholder after error
    expect(screen.getByText('📚')).toBeInTheDocument();
  });

  test('preloads images for better performance', () => {
    // Mock Image constructor
    const mockImage = {
      onload: null,
      onerror: null,
      src: ''
    };
    
    global.Image = jest.fn(() => mockImage);
    
    render(<BookCard book={mockBookWithImage} />);
    
    // Should create new Image instance for preloading
    expect(global.Image).toHaveBeenCalled();
  });
});