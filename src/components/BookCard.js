import { useState } from 'react';
import styled from 'styled-components';

const BookCardContainer = styled.div`
  background: rgba(30, 30, 30, 0.85);
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.3s, height 0.3s ease, border-color 0.3s ease;
  position: relative;
  min-width: 260px;
  max-width: 100%;
  cursor: pointer;
  
  /* Status-based border colors */
  ${props => {
    switch(props.status) {
      case 'completed':
        return `
          border: 2px solid rgba(34, 197, 94, 0.6);
          
          &:hover {
            border-color: rgba(34, 197, 94, 0.8);
            box-shadow: 0 8px 32px rgba(34, 197, 94, 0.2);
          }
        `;
      case 'reading':
        return `
          border: 2px solid rgba(251, 191, 36, 0.6);
          
          &:hover {
            border-color: rgba(251, 191, 36, 0.8);
            box-shadow: 0 8px 32px rgba(251, 191, 36, 0.2);
          }
        `;
      case 'future':
        return `
          border: 2px solid rgba(107, 114, 128, 0.4);
          opacity: 0.9;
          
          &:hover {
            border-color: rgba(107, 114, 128, 0.6);
            box-shadow: 0 8px 32px rgba(107, 114, 128, 0.1);
            opacity: 1;
          }
        `;
      default:
        return `
          border: 1px solid var(--primary-color);
        `;
    }
  }}
  
  ${props => props.isExpanded && `
    border-color: var(--accent-color, #ffd700);
    box-shadow: 0 8px 32px rgba(255, 215, 0, 0.2);
  `}
  
  &:hover {
    transform: translateY(-6px) scale(1.03);
  }
  
  /* Light mode adjustments */
  body.light-mode & {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 24px rgba(0,0,0,0.1);
    
    &:hover {
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    }
  }
  
  @media (max-width: 768px) {
    min-width: 100%;
    &:hover {
      transform: translateY(-3px) scale(1.01);
    }
  }
`;

const BookImageContainer = styled.div`
  width: 100%;
  height: 180px;
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
`;

const BookImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #333 0%, #222 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 3rem;
  opacity: 0.7;
  
  &::before {
    content: "📚";
    filter: drop-shadow(0 0 5px var(--primary-color));
  }
`;

const BookContent = styled.div`
  padding: 1.2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ExpandedContent = styled.div`
  max-height: ${props => props.isExpanded ? '200px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: ${props => props.isExpanded ? '1' : '0'};
  padding-top: ${props => props.isExpanded ? '1rem' : '0'};
  border-top: ${props => props.isExpanded ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'};
  margin-top: ${props => props.isExpanded ? '0.5rem' : '0'};
`;

const PageCount = styled.div`
  color: #bbb;
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  font-family: var(--font-family-mono);
  
  &::before {
    content: "📖 ";
    margin-right: 0.3rem;
  }
  
  span {
    color: var(--primary-color);
    font-weight: bold;
  }
`;

const Description = styled.div`
  color: #ddd;
  font-size: 0.9rem;
  line-height: 1.4;
  word-wrap: break-word;
  overflow-wrap: break-word;
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    
    &:hover {
      border-bottom-color: var(--primary-color);
      text-shadow: 0 0 5px var(--primary-color);
      transform: translateX(2px);
    }
    
    &:focus {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
      border-radius: 2px;
    }
    
    /* Handle potential link errors gracefully */
    &:invalid {
      color: #888;
      cursor: not-allowed;
      
      &:hover {
        border-bottom-color: transparent;
        text-shadow: none;
        transform: none;
      }
    }
  }
  
  span {
    color: #ddd;
    font-style: italic;
  }
  
  @media (max-width: 768px) {
    font-size: 0.85rem;
    
    a {
      gap: 0.2rem;
    }
  }
`;

const ExpandIndicator = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  color: var(--primary-color);
  font-size: 0.8rem;
  opacity: 0.7;
  transition: transform 0.3s ease, opacity 0.2s ease;
  transform: ${props => props.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  
  &::before {
    content: "▼";
  }
  
  ${BookCardContainer}:hover & {
    opacity: 1;
  }
`;

const TimeRead = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  font-family: var(--font-family-mono);
  letter-spacing: 1px;
  margin-bottom: 0.3rem;
  transition: all 0.3s ease;
  position: relative;
  
  /* Status-based styling */
  ${props => {
    switch(props.status) {
      case 'completed':
        return `
          color: rgba(34, 197, 94, 1);
          text-shadow: 0 0 5px rgba(34, 197, 94, 0.5);
          
          &::before {
            content: "✓ ";
            color: rgba(34, 197, 94, 0.8);
            margin-right: 0.3rem;
          }
          
          /* Light mode adjustments */
          body.light-mode & {
            color: rgba(34, 197, 94, 0.9);
            text-shadow: 0 0 3px rgba(34, 197, 94, 0.3);
          }
        `;
      case 'reading':
        return `
          color: rgba(251, 191, 36, 1);
          text-shadow: 0 0 5px rgba(251, 191, 36, 0.5);
          animation: pulse 2s infinite;
          
          &::before {
            content: "📖 ";
            margin-right: 0.3rem;
            animation: bounce 2s infinite;
          }
          
          @keyframes pulse {
            0%, 100% { 
              opacity: 1;
              text-shadow: 0 0 5px rgba(251, 191, 36, 0.5);
            }
            50% { 
              opacity: 0.8;
              text-shadow: 0 0 8px rgba(251, 191, 36, 0.7);
            }
          }
          
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
          }
          
          /* Light mode adjustments */
          body.light-mode & {
            color: rgba(251, 191, 36, 0.9);
            text-shadow: 0 0 3px rgba(251, 191, 36, 0.3);
            
            @keyframes pulse {
              0%, 100% { 
                opacity: 1;
                text-shadow: 0 0 3px rgba(251, 191, 36, 0.3);
              }
              50% { 
                opacity: 0.8;
                text-shadow: 0 0 5px rgba(251, 191, 36, 0.5);
              }
            }
          }
        `;
      case 'future':
        return `
          color: rgba(107, 114, 128, 0.9);
          text-shadow: none;
          opacity: 0.8;
          
          &::before {
            content: "📅 ";
            color: rgba(107, 114, 128, 0.7);
            margin-right: 0.3rem;
          }
          
          /* Light mode adjustments */
          body.light-mode & {
            color: rgba(107, 114, 128, 0.8);
            opacity: 0.9;
          }
        `;
      default:
        return `
          color: var(--primary-color);
          text-shadow: 0 0 5px var(--primary-color);
        `;
    }
  }}
`;

const BookTitle = styled.h3`
  color: var(--primary-color);
  margin: 0;
  font-size: 1.1rem;
  font-family: var(--font-family);
  font-weight: 500;
  line-height: 1.3;
  text-shadow: 0 0 3px var(--primary-color);
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BookAuthor = styled.div`
  color: #ddd;
  font-size: 0.95rem;
  margin-top: 0.2rem;
  font-style: italic;
  
  &::before {
    content: "by ";
    opacity: 0.7;
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const StatusIndicator = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  z-index: 2;
  transition: all 0.3s ease;
  
  ${props => {
    switch(props.status) {
      case 'completed':
        return `
          background-color: rgba(34, 197, 94, 0.9);
          color: #fff;
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
          border: 1px solid rgba(34, 197, 94, 0.7);
          
          /* Light mode adjustments */
          body.light-mode & {
            background-color: rgba(34, 197, 94, 0.8);
            color: #fff;
            box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
          }
        `;
      case 'reading':
        return `
          background-color: rgba(251, 191, 36, 0.9);
          color: #000;
          box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
          border: 1px solid rgba(251, 191, 36, 0.7);
          animation: glow 2s infinite;
          
          @keyframes glow {
            0%, 100% { 
              box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);
              transform: scale(1);
            }
            50% { 
              box-shadow: 0 0 20px rgba(251, 191, 36, 0.8);
              transform: scale(1.05);
            }
          }
          
          /* Light mode adjustments */
          body.light-mode & {
            background-color: rgba(251, 191, 36, 0.8);
            color: #000;
            box-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
            
            @keyframes glow {
              0%, 100% { 
                box-shadow: 0 0 8px rgba(251, 191, 36, 0.4);
                transform: scale(1);
              }
              50% { 
                box-shadow: 0 0 16px rgba(251, 191, 36, 0.6);
                transform: scale(1.05);
              }
            }
          }
        `;
      case 'future':
        return `
          background-color: rgba(107, 114, 128, 0.9);
          color: #fff;
          box-shadow: 0 0 10px rgba(107, 114, 128, 0.3);
          border: 1px solid rgba(107, 114, 128, 0.5);
          opacity: 0.8;
          
          /* Light mode adjustments */
          body.light-mode & {
            background-color: rgba(107, 114, 128, 0.7);
            color: #fff;
            box-shadow: 0 0 6px rgba(107, 114, 128, 0.2);
            opacity: 0.9;
          }
        `;
      default:
        return `
          background-color: rgba(107, 114, 128, 0.9);
          color: #fff;
          border: 1px solid rgba(107, 114, 128, 0.5);
        `;
    }
  }}
`;

const BookCard = ({ book, isExpanded: controlledExpanded, onToggle }) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  
  const handleClick = (e) => {
    e.preventDefault();
    
    // If controlled by parent, call onToggle
    if (controlledExpanded !== undefined && onToggle) {
      onToggle();
    } else {
      // Otherwise, manage internal state
      setInternalExpanded(!internalExpanded);
      if (onToggle) {
        onToggle();
      }
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Done';
      case 'reading': return 'Reading';
      case 'future': return 'Planned';
      default: return 'Unknown';
    }
  };

  const isUrl = (str) => {
    if (!str || typeof str !== 'string') return false;
    
    try {
      const url = new URL(str);
      // Check for valid protocols
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleLinkClick = (e, url) => {
    e.stopPropagation();
    
    try {
      // Additional validation before opening
      if (isUrl(url)) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        console.warn('Invalid URL attempted to open:', url);
      }
    } catch (error) {
      console.error('Failed to open external link:', error);
      // Fallback: try direct navigation
      try {
        window.open(url, '_blank');
      } catch (fallbackError) {
        console.error('Fallback link opening also failed:', fallbackError);
      }
    }
  };

  const renderDescription = () => {
    if (!book.description) return null;
    
    // Handle empty or whitespace-only descriptions
    const trimmedDescription = book.description.trim();
    if (!trimmedDescription) return null;
    
    if (isUrl(trimmedDescription)) {
      return (
        <a 
          href={trimmedDescription} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => handleLinkClick(e, trimmedDescription)}
          onError={(e) => {
            console.warn('Link error detected:', e);
          }}
        >
          Read full review →
        </a>
      );
    }
    
    // For non-URL descriptions, render as plain text
    return <span>{trimmedDescription}</span>;
  };

  return (
    <BookCardContainer onClick={handleClick} isExpanded={isExpanded} status={book.status} data-testid="book-card">
      <StatusIndicator status={book.status}>
        {getStatusText(book.status)}
      </StatusIndicator>
      
      <BookImageContainer>
        {book.image ? (
          <BookImage 
            src={book.image} 
            alt={`${book.title} cover`}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <BookImagePlaceholder style={{ display: book.image ? 'none' : 'flex' }} />
      </BookImageContainer>
      
      <BookContent>
        <TimeRead status={book.status}>
          {book.timeRead}
        </TimeRead>
        
        <BookTitle>
          {book.title}
        </BookTitle>
        
        <BookAuthor>
          {book.author}
        </BookAuthor>
        
        <ExpandedContent isExpanded={isExpanded}>
          {book.pages && (
            <PageCount>
              <span>{book.pages}</span> pages
            </PageCount>
          )}
          
          {book.description && (
            <Description>
              {renderDescription()}
            </Description>
          )}
          
          {!book.description && isExpanded && (
            <Description>
              <span>No description available</span>
            </Description>
          )}
        </ExpandedContent>
      </BookContent>
      
      <ExpandIndicator isExpanded={isExpanded} />
    </BookCardContainer>
  );
};

export default BookCard;