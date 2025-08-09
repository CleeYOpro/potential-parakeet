import { useState, useEffect } from 'react';
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
        switch (props.status) {
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
  height: 250px;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Light mode adjustments */
  body.light-mode & {
    background: linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: opacity 0.3s ease, transform 0.3s ease;
  
  /* Hover effect for better interactivity */
  ${BookCardContainer}:hover & {
    transform: scale(1.02);
  }
  
  /* Ensure proper aspect ratio for book covers */
  aspect-ratio: 2/3;
  max-width: 133px; /* Maintain book cover proportions */
  margin: 0 auto;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  
  /* Light mode adjustments */
  body.light-mode & {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const BookImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #333 0%, #222 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 2.5rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  
  &::before {
    content: "📚";
    filter: drop-shadow(0 0 5px var(--primary-color));
    margin-bottom: 0.5rem;
  }
  
  &::after {
    content: "No Cover";
    font-size: 0.8rem;
    font-family: var(--font-family-mono);
    opacity: 0.6;
    letter-spacing: 1px;
  }
  
  /* Light mode adjustments */
  body.light-mode & {
    background: linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%);
    color: var(--primary-color);
  }
  
  ${BookCardContainer}:hover & {
    opacity: 0.9;
  }
`;

const ImageLoadingSpinner = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 1rem;
  font-family: var(--font-family-mono);
  
  &::before {
    content: "⏳";
    font-size: 2rem;
    margin-bottom: 0.5rem;
    animation: pulse 1.5s infinite;
  }
  
  &::after {
    content: "Loading...";
    opacity: 0.8;
    letter-spacing: 1px;
  }
  
  @keyframes pulse {
    0%, 100% { 
      opacity: 0.6;
      transform: scale(1);
    }
    50% { 
      opacity: 1;
      transform: scale(1.1);
    }
  }
  
  /* Light mode adjustments */
  body.light-mode & {
    background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
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
        switch (props.status) {
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
        switch (props.status) {
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
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    // Use controlled state if provided, otherwise use internal state
    const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

    // Validate book data on mount and when book prop changes
    useEffect(() => {
        const errors = [];

        // Validate required fields
        if (!book) {
            errors.push('Book data is missing');
            setValidationErrors(errors);
            return;
        }

        if (!book.title || typeof book.title !== 'string' || book.title.trim() === '') {
            errors.push('Missing or invalid book title');
        }

        if (!book.author || typeof book.author !== 'string' || book.author.trim() === '') {
            errors.push('Missing or invalid book author');
        }

        if (!book.timeRead || typeof book.timeRead !== 'string' || book.timeRead.trim() === '') {
            errors.push('Missing or invalid time read');
        }

        if (!book.status || !['completed', 'reading', 'future'].includes(book.status)) {
            errors.push('Missing or invalid book status');
        }

        // Validate optional fields
        if (book.pages !== undefined && (typeof book.pages !== 'number' || book.pages <= 0)) {
            errors.push('Invalid pages count');
        }

        if (book.description !== undefined && typeof book.description !== 'string') {
            errors.push('Invalid description type');
        }

        if (book.image !== undefined && typeof book.image !== 'string') {
            errors.push('Invalid image type');
        }

        // Log validation errors
        if (errors.length > 0) {
            console.warn(`BookCard validation errors for "${book?.title || 'Unknown'}":`, errors);
        }

        setValidationErrors(errors);

        // Reset image states when book changes and preload image if available
        setImageError(false);
        if (book?.image && typeof book.image === 'string' && book.image.trim() !== '') {
            preloadImage(book.image.trim());
        } else {
            setImageLoading(false);
        }
    }, [book]);

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
        switch (status) {
            case 'completed': return 'Done';
            case 'reading': return 'Reading';
            case 'future': return 'Planned';
            default: return 'Unknown';
        }
    };

    const isUrl = (str) => {
        if (!str || typeof str !== 'string') return false;

        const trimmedStr = str.trim();
        if (trimmedStr === '') return false;

        try {
            const url = new URL(trimmedStr);
            // Check for valid protocols
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (error) {
            // Log invalid URL attempts for debugging
            if (trimmedStr.startsWith('http://') || trimmedStr.startsWith('https://')) {
                console.warn(`BookCard: Invalid URL detected for "${book?.title || 'Unknown'}": "${trimmedStr}"`, error);
            }
            return false;
        }
    };

    const handleImageLoad = () => {
        setImageLoading(false);
        setImageError(false);
    };

    const handleImageError = (e) => {
        console.warn(`BookCard: Failed to load image for "${book?.title || 'Unknown'}": ${book?.image}`);
        setImageLoading(false);
        setImageError(true);

        // Hide the broken image element
        if (e.target) {
            e.target.style.display = 'none';
        }
    };

    // Preload image for better UX
    const preloadImage = (imageUrl) => {
        if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') {
            return;
        }

        setImageLoading(true);
        setImageError(false);

        const img = new Image();
        img.onload = () => {
            setImageLoading(false);
            setImageError(false);
        };
        img.onerror = () => {
            console.warn(`BookCard: Failed to preload image for "${book?.title || 'Unknown'}": ${imageUrl}`);
            setImageLoading(false);
            setImageError(true);
        };
        img.src = imageUrl;
    };

    const handleLinkClick = (e, url) => {
        e.stopPropagation();

        if (!url || typeof url !== 'string') {
            console.warn(`BookCard: Invalid URL type for "${book?.title || 'Unknown'}":`, typeof url);
            return;
        }

        const trimmedUrl = url.trim();
        if (!trimmedUrl) {
            console.warn(`BookCard: Empty URL for "${book?.title || 'Unknown'}"`);
            return;
        }

        try {
            // Additional validation before opening
            if (isUrl(trimmedUrl)) {
                window.open(trimmedUrl, '_blank', 'noopener,noreferrer');
            } else {
                console.warn(`BookCard: Invalid URL attempted to open for "${book?.title || 'Unknown'}": "${trimmedUrl}"`);
            }
        } catch (error) {
            console.error(`BookCard: Failed to open external link for "${book?.title || 'Unknown'}":`, error);

            // Fallback: try direct navigation with additional safety checks
            try {
                if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
                    window.open(trimmedUrl, '_blank');
                } else {
                    console.error(`BookCard: Fallback also failed - URL doesn't start with http(s) for "${book?.title || 'Unknown'}": "${trimmedUrl}"`);
                }
            } catch (fallbackError) {
                console.error(`BookCard: Fallback link opening also failed for "${book?.title || 'Unknown'}":`, fallbackError);
            }
        }
    };

    const renderDescription = () => {
        if (!book || !book.description) {
            return (
                <span style={{ color: '#888', fontStyle: 'italic' }}>
                    No description available
                </span>
            );
        }

        // Handle non-string descriptions
        if (typeof book.description !== 'string') {
            console.warn(`BookCard: Invalid description type for "${book?.title || 'Unknown'}":`, typeof book.description);
            return (
                <span style={{ color: '#888', fontStyle: 'italic' }}>
                    Description unavailable (invalid format)
                </span>
            );
        }

        // Handle empty or whitespace-only descriptions
        const trimmedDescription = book.description.trim();
        if (!trimmedDescription) {
            return (
                <span style={{ color: '#888', fontStyle: 'italic' }}>
                    No description available
                </span>
            );
        }

        if (isUrl(trimmedDescription)) {
            return (
                <a
                    href={trimmedDescription}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleLinkClick(e, trimmedDescription)}
                    onError={(e) => {
                        console.warn(`BookCard: Link error detected for "${book?.title || 'Unknown'}":`, e);
                    }}
                    style={{
                        // Add visual indication if URL validation failed
                        opacity: isUrl(trimmedDescription) ? 1 : 0.6,
                        cursor: isUrl(trimmedDescription) ? 'pointer' : 'not-allowed'
                    }}
                >
                    Read full review →
                </a>
            );
        }

        // For non-URL descriptions, render as plain text with length validation
        if (trimmedDescription.length > 500) {
            console.warn(`BookCard: Description is very long (${trimmedDescription.length} chars) for "${book?.title || 'Unknown'}"`);
            return <span>{trimmedDescription.substring(0, 497)}...</span>;
        }

        return <span>{trimmedDescription}</span>;
    };

    // Don't render if critical validation errors exist
    if (validationErrors.length > 0 && (!book || !book.title || !book.author)) {
        return (
            <BookCardContainer style={{
                border: '2px solid #ff6b6b',
                opacity: 0.7,
                cursor: 'not-allowed'
            }} data-testid="book-card-error">
                <BookContent>
                    <div style={{ color: '#ff6b6b', textAlign: 'center', padding: '2rem' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
                        <div style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                            Invalid Book Data
                        </div>
                        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                            {validationErrors.slice(0, 2).join(', ')}
                            {validationErrors.length > 2 && '...'}
                        </div>
                    </div>
                </BookContent>
            </BookCardContainer>
        );
    }

    return (
        <BookCardContainer onClick={handleClick} isExpanded={isExpanded} status={book?.status || 'unknown'} data-testid="book-card">
            <StatusIndicator status={book?.status || 'unknown'}>
                {getStatusText(book?.status)}
            </StatusIndicator>

            <BookImageContainer>
                {/* Show loading spinner while image is loading */}
                {imageLoading && book?.image && (
                    <ImageLoadingSpinner />
                )}

                {/* Show actual image when loaded successfully */}
                {book?.image && !imageError && !imageLoading && (
                    <BookImage
                        src={book.image}
                        alt={`${book?.title || 'Unknown book'} cover`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        loading="lazy"
                        decoding="async"
                    />
                )}

                {/* Show placeholder when no image or image failed to load */}
                {(!book?.image || imageError) && !imageLoading && (
                    <BookImagePlaceholder />
                )}
            </BookImageContainer>

            <BookContent>
                <TimeRead status={book?.status || 'unknown'}>
                    {book?.timeRead || 'Unknown time'}
                </TimeRead>

                <BookTitle>
                    {book?.title || 'Unknown Title'}
                </BookTitle>

                <BookAuthor>
                    {book?.author || 'Unknown Author'}
                </BookAuthor>

                {/* Show validation warnings if any */}
                {validationErrors.length > 0 && isExpanded && (
                    <div style={{
                        background: 'rgba(251, 191, 36, 0.1)',
                        border: '1px solid rgba(251, 191, 36, 0.3)',
                        borderRadius: '4px',
                        padding: '0.5rem',
                        margin: '0.5rem 0',
                        fontSize: '0.8rem',
                        color: 'rgba(251, 191, 36, 0.9)'
                    }}>
                        ⚠️ Data issues: {validationErrors.slice(0, 2).join(', ')}
                    </div>
                )}

                <ExpandedContent isExpanded={isExpanded}>
                    {book?.pages && typeof book.pages === 'number' && book.pages > 0 ? (
                        <PageCount>
                            <span>{book.pages}</span> pages
                        </PageCount>
                    ) : isExpanded && book?.pages !== undefined && (
                        <PageCount style={{ color: '#888', fontStyle: 'italic' }}>
                            <span>Invalid page count</span>
                        </PageCount>
                    )}

                    <Description>
                        {renderDescription()}
                    </Description>
                </ExpandedContent>
            </BookContent>

            <ExpandIndicator isExpanded={isExpanded} />
        </BookCardContainer>
    );
};

export default BookCard;