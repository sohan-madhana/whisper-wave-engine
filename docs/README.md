# Component Documentation

This directory contains comprehensive documentation for all reusable components in the project. Each component follows a standardized documentation format to ensure consistency and ease of use.

## Documentation Structure

### 📋 Template
- [`component-template.md`](./component-template.md) - Standard template for documenting components

### 🧩 Components
- [`button.md`](./components/button.md) - Button component documentation
- [`modal.md`](./components/modal.md) - Modal/Dialog component documentation

## Documentation Standards

Each component documentation includes:

1. **Purpose** - What the component does and when to use it
2. **Props/Parameters** - Complete API reference with types and examples
3. **Usage Examples** - Code examples from basic to advanced use cases
4. **Accessibility** - ARIA support, keyboard navigation, and screen reader considerations
5. **Styling** - Customization options and CSS variables
6. **Edge Cases** - Error states, loading states, and responsive behavior
7. **Dependencies** - Internal and external dependencies
8. **Testing** - Unit and integration testing guidelines
9. **Related Components** - Links to similar or complementary components

## Contributing

When adding new components or updating existing ones:

1. Use the [`component-template.md`](./component-template.md) as your starting point
2. Include working code examples that can be copy-pasted
3. Test all examples to ensure they work correctly
4. Update the changelog when making changes
5. Consider accessibility from the start
6. Document edge cases and error handling

## Quick Reference

### Common Patterns

#### Basic Component Usage
```tsx
import { ComponentName } from '@/components/ui/component-name';

function Example() {
  return <ComponentName>Content</ComponentName>;
}
```

#### With Props
```tsx
<ComponentName
  variant="primary"
  size="lg"
  disabled={false}
  onClick={handleClick}
>
  Content
</ComponentName>
```

#### Accessibility Best Practices
```tsx
// Always provide accessible labels
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// Use semantic HTML
<form onSubmit={handleSubmit}>
  <Button type="submit">Submit</Button>
</form>

// Handle loading states
<Button disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</Button>
```

## Design System Integration

All components are designed to work with our design system:

- **Colors**: Use CSS custom properties from `src/index.css`
- **Spacing**: Follow the 8px grid system
- **Typography**: Use consistent font sizes and weights
- **Shadows**: Use predefined shadow variables
- **Borders**: Use consistent border radius values

## Testing Guidelines

### Unit Tests
- Test component rendering with different props
- Test user interactions (clicks, keyboard navigation)
- Test accessibility features
- Test error states and edge cases

### Integration Tests
- Test component interactions with other components
- Test form submissions and data flow
- Test responsive behavior
- Test with real user scenarios

## Maintenance

Documentation should be updated when:
- Component API changes (props added/removed/modified)
- New features are added
- Bugs are fixed that affect usage
- Accessibility improvements are made
- Breaking changes are introduced

Keep the changelog updated and maintain version numbers for tracking changes over time.