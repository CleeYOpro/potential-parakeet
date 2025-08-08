# Design Document

## Overview

The reading list bookshelf feature will be implemented as a new page in the existing React portfolio application. It will integrate seamlessly with the current navigation system and maintain consistency with the existing LED matrix theme and styling approach using styled-components.

The feature will display books in a responsive grid layout with collapsible cards that show basic information initially and expand to reveal additional details when clicked. The design will support different reading statuses (completed, currently reading, future) with visual distinctions.

## Architecture

### Component Structure
```
ReadingList (Main Page Component)
├── BookGrid (Container Component)
│   └── BookCard (Individual Book Component)
│       ├── BookCardCollapsed (Default State)
│       └── BookCardExpanded (Expanded State)
└── BookData (Data Management)
```

### Integration Points
- **App.js**: Add new route handling for `#reading-list` hash
- **Navbar.js**: Already includes "Reading List" navigation (currently shows WIP modal)
- **Styling**: Use existing styled-components approach and CSS custom properties
- **Theme System**: Integrate with existing dark/light mode theme context

## Components and Interfaces

### ReadingList Component
**Purpose**: Main page component that renders the complete reading list interface

**Props**: None (uses internal data)

**State**:
- `books`: Array of book objects
- `filter`: Current reading status filter (optional future enhancement)

**Key Features**:
- Responsive grid layout
- Integration with existing page structure
- Consistent styling with portfolio theme

### BookGrid Component
**Purpose**: Container component that manages the grid layout of book cards

**Props**:
- `books`: Array of book objects
- `onBookClick`: Handler for book card interactions

**Responsibilities**:
- Responsive grid layout (CSS Grid)
- Consistent spacing and alignment
- Mobile-responsive behavior

### BookCard Component
**Purpose**: Individual book display component with expand/collapse functionality

**Props**:
- `book`: Book object with all book data
- `isExpanded`: Boolean state for expansion
- `onToggle`: Handler for expand/collapse

**States**:
- **Collapsed**: Shows time read, title, author, and cover image
- **Expanded**: Additionally shows pages count and description/link

**Interactions**:
- Click anywhere on card to toggle expansion
- External links open in new tabs
- Smooth animation between states

## Data Models

### Book Object Structure
```javascript
{
  timeRead: string,        // e.g., "May 2023", "Reading now", "Future"
  title: string,           // Book title
  author: string,          // Author name
  pages: number,           // Page count
  description: string,     // Description or review URL
  image: string,           // Book cover image URL (optional)
  status: string           // "completed", "reading", "future"
}
```

### Book Data Array
The component will use a static array of book objects based on the provided data:

```javascript
const booksData = [
  {
    timeRead: "May 2023",
    title: "Elon Musk",
    author: "Walter Isaacson",
    pages: 688,
    description: "https://thebestbiographies.com/2023/09/17/review-of-elon-musk-by-walter-isaacson/",
    image: "", // To be added
    status: "completed"
  },
  // ... additional books
];
```

## Error Handling

### Missing Data Handling
- **Missing Images**: Display placeholder or text-only card
- **Missing Description URLs**: Show description text without link
- **Invalid URLs**: Graceful fallback to text display
- **Missing Required Fields**: Skip malformed book entries with console warning

### User Interaction Errors
- **Failed External Links**: Handle with try-catch and user feedback
- **Animation Failures**: Fallback to instant state changes
- **Responsive Layout Issues**: CSS fallbacks for unsupported features

### Data Validation
- Validate book objects on component mount
- Filter out incomplete entries
- Log warnings for data quality issues

## Testing Strategy

### Unit Tests
- **BookCard Component**:
  - Renders correctly in collapsed state
  - Renders correctly in expanded state
  - Toggles state on click
  - Handles missing data gracefully
  - External links open in new tabs

- **BookGrid Component**:
  - Renders correct number of book cards
  - Maintains responsive grid layout
  - Passes props correctly to child components

- **ReadingList Component**:
  - Integrates with app routing
  - Maintains consistent styling
  - Handles empty book data

### Integration Tests
- **Navigation Integration**:
  - Navbar link navigates to reading list
  - Hash routing works correctly
  - Back/forward browser navigation

- **Theme Integration**:
  - Dark mode styling applies correctly
  - Light mode styling applies correctly
  - Theme transitions work smoothly

- **Responsive Design**:
  - Mobile layout renders correctly
  - Tablet layout renders correctly
  - Desktop layout renders correctly
  - Touch interactions work on mobile

### Visual Regression Tests
- Screenshot comparisons for different screen sizes
- Theme variation screenshots
- Expanded/collapsed state screenshots

## Implementation Approach

### Phase 1: Basic Structure
1. Create ReadingList component with basic layout
2. Implement static book data
3. Add routing integration to App.js
4. Update navbar to remove WIP modal

### Phase 2: Book Display
1. Create BookCard component with collapsed state
2. Implement BookGrid container
3. Add basic styling consistent with theme
4. Ensure responsive layout

### Phase 3: Interactive Features
1. Add expand/collapse functionality
2. Implement smooth animations
3. Add external link handling
4. Polish visual states and transitions

### Phase 4: Integration & Polish
1. Integrate with existing theme system
2. Add comprehensive error handling
3. Optimize for performance
4. Add accessibility features

## Styling Approach

### Design System Integration
- Use existing CSS custom properties for colors and fonts
- Maintain LED matrix theme with glowing effects
- Follow existing component styling patterns with styled-components

### Visual Hierarchy
- **Reading Status**: Prominent display with color coding
- **Book Title**: Primary text with theme color
- **Author**: Secondary text styling
- **Cover Images**: Consistent sizing and aspect ratios
- **Expanded Content**: Clear visual separation

### Responsive Design
- **Desktop**: 3-4 column grid
- **Tablet**: 2-3 column grid  
- **Mobile**: 1-2 column grid
- **Card Sizing**: Consistent heights in collapsed state

### Animation Strategy
- Smooth expand/collapse transitions (300ms)
- Hover effects consistent with existing components
- Loading states for images
- Respect user's motion preferences