# Button

A versatile button component that supports multiple variants, sizes, and states for consistent user interactions throughout the application.

## Purpose

The Button component provides a standardized way to create interactive elements that trigger actions. It ensures consistent styling, behavior, and accessibility across the application.

**When to use:**
- Triggering actions (submit forms, open modals, navigate)
- Primary and secondary call-to-actions
- Interactive elements that need consistent styling

**When NOT to use:**
- For navigation links (use Link component instead)
- For non-interactive decorative elements
- When you need custom styling that conflicts with the design system

## Props/Parameters

### Required Props
| Prop | Type | Description | Example |
|------|------|-------------|---------|
| children | `React.ReactNode` | The content to display inside the button | `"Click me"` |

### Optional Props
| Prop | Type | Default | Description | Example |
|------|------|---------|-------------|---------|
| variant | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | Visual style variant | `"destructive"` |
| size | `"default" \| "sm" \| "lg" \| "icon"` | `"default"` | Button size | `"lg"` |
| asChild | `boolean` | `false` | Render as child element (using Radix Slot) | `true` |
| disabled | `boolean` | `false` | Disable the button | `true` |
| type | `"button" \| "submit" \| "reset"` | `"button"` | HTML button type | `"submit"` |
| onClick | `(event: React.MouseEvent) => void` | `undefined` | Click event handler | `() => console.log('clicked')` |

### HTML Button Props
The component also accepts all standard HTML button attributes like `id`, `className`, `aria-*`, etc.

## Usage Examples

### Basic Usage
```tsx
import { Button } from '@/components/ui/button';

function Example() {
  return (
    <Button onClick={() => alert('Hello!')}>
      Click me
    </Button>
  );
}
```

### Variants
```tsx
function VariantExamples() {
  return (
    <div className="flex gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link Style</Button>
    </div>
  );
}
```

### Sizes
```tsx
function SizeExamples() {
  return (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

### With Icons
```tsx
import { Plus, Download } from 'lucide-react';

function IconExamples() {
  return (
    <div className="flex gap-2">
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add Item
      </Button>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
    </div>
  );
}
```

### Loading State
```tsx
import { Loader2 } from 'lucide-react';

function LoadingExample() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button disabled={isLoading} onClick={() => setIsLoading(true)}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        'Submit'
      )}
    </Button>
  );
}
```

### As Child (Custom Element)
```tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function AsChildExample() {
  return (
    <Button asChild>
      <Link href="/dashboard">
        Go to Dashboard
      </Link>
    </Button>
  );
}
```

### Form Integration
```tsx
function FormExample() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex gap-2">
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="outline">Reset</Button>
        <Button type="button" variant="secondary">Cancel</Button>
      </div>
    </form>
  );
}
```

## Accessibility

### ARIA Support
- Automatically includes `role="button"` when using `asChild` with non-button elements
- Supports all standard ARIA attributes (`aria-label`, `aria-describedby`, etc.)
- Properly handles `aria-disabled` when disabled

### Keyboard Navigation
- **Space/Enter**: Activates the button
- **Tab**: Moves focus to/from the button
- Disabled buttons are not focusable

### Screen Reader Support
- Button content is announced as the accessible name
- Use `aria-label` for icon-only buttons
- Loading states should include `aria-busy="true"`

### Best Practices
```tsx
// Good: Descriptive text
<Button>Save Changes</Button>

// Good: Icon with accessible label
<Button aria-label="Close dialog">
  <X className="h-4 w-4" />
</Button>

// Good: Loading state with aria-busy
<Button aria-busy={isLoading} disabled={isLoading}>
  {isLoading ? 'Saving...' : 'Save'}
</Button>
```

## Styling

### CSS Variables
The button uses design tokens from the CSS custom properties:

```css
.button {
  --button-bg: hsl(var(--primary));
  --button-text: hsl(var(--primary-foreground));
  --button-border: hsl(var(--border));
  --button-radius: var(--radius);
}
```

### Customization
```tsx
// Custom className
<Button className="w-full justify-start">
  Custom Styling
</Button>

// Custom CSS variables
<Button 
  style={{ 
    '--button-bg': 'hsl(200 100% 50%)',
    '--button-text': 'white'
  } as React.CSSProperties}
>
  Custom Colors
</Button>
```

### Variant Styles
- **default**: Primary brand color background
- **destructive**: Red background for dangerous actions
- **outline**: Transparent background with border
- **secondary**: Muted background color
- **ghost**: Transparent background, visible on hover
- **link**: Styled like a text link with underline

## Edge Cases

### Error States
```tsx
// Button handles invalid props gracefully
<Button variant="invalid" size="nonexistent">
  Still renders with defaults
</Button>
```

### Loading States
```tsx
// Prevent double-clicks during async operations
function AsyncButton() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    if (isLoading) return; // Prevent double-click
    
    setIsLoading(true);
    try {
      await someAsyncOperation();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button disabled={isLoading} onClick={handleClick}>
      {isLoading ? 'Processing...' : 'Submit'}
    </Button>
  );
}
```

### Empty Content
```tsx
// Button with no children still renders
<Button /> // Renders empty button

// Icon-only buttons need aria-label
<Button aria-label="Menu">
  <Menu className="h-4 w-4" />
</Button>
```

### Responsive Behavior
```tsx
// Responsive button sizing
<Button className="w-full sm:w-auto">
  Responsive Button
</Button>

// Different variants on mobile
<Button className="variant-ghost sm:variant-default">
  Responsive Variant
</Button>
```

## Dependencies

### Internal Dependencies
- `@/lib/utils` - For className merging
- `@/components/ui/button` styles from CSS

### External Dependencies
- `@radix-ui/react-slot` - For `asChild` functionality
- `class-variance-authority` - For variant management
- `clsx` & `tailwind-merge` - For className handling

## Testing

### Unit Tests
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('is disabled when disabled prop is true', () => {
  render(<Button disabled>Disabled</Button>);
  expect(screen.getByRole('button')).toBeDisabled();
});
```

### Integration Tests
```tsx
test('submits form when submit button is clicked', () => {
  const handleSubmit = jest.fn();
  render(
    <form onSubmit={handleSubmit}>
      <Button type="submit">Submit</Button>
    </form>
  );
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleSubmit).toHaveBeenCalled();
});
```

## Related Components

- **Link**: For navigation actions
- **IconButton**: Specialized button for icon-only actions
- **DropdownMenuTrigger**: For dropdown menu triggers
- **DialogTrigger**: For modal/dialog triggers

## Changelog

### Version 1.2.0
- Added `asChild` prop for composition
- Improved accessibility with better ARIA support
- Added loading state examples

### Version 1.1.0
- Added `ghost` and `link` variants
- Improved TypeScript types
- Better responsive behavior

### Version 1.0.0
- Initial release with basic variants and sizes

---

*Last updated: January 2025*
*Maintained by: UI Team*