# Modal (Dialog)

A modal dialog component that displays content in a layer above the main application, requiring user interaction before returning to the main workflow.

## Purpose

The Modal component provides a way to display important information, forms, or actions that require user attention without navigating away from the current page. It ensures consistent behavior, styling, and accessibility for overlay content.

**When to use:**
- Displaying forms that require user input
- Showing confirmations for destructive actions
- Presenting detailed information without page navigation
- Creating focused workflows that need completion

**When NOT to use:**
- For simple tooltips or hints (use Tooltip instead)
- For navigation menus (use DropdownMenu instead)
- For non-critical information that doesn't require immediate attention
- When the content would be better as a separate page

## Props/Parameters

### Dialog (Root)
| Prop | Type | Default | Description | Example |
|------|------|---------|-------------|---------|
| open | `boolean` | `undefined` | Controlled open state | `true` |
| onOpenChange | `(open: boolean) => void` | `undefined` | Callback when open state changes | `setOpen` |
| defaultOpen | `boolean` | `false` | Uncontrolled default open state | `true` |

### DialogTrigger
| Prop | Type | Default | Description | Example |
|------|------|---------|-------------|---------|
| asChild | `boolean` | `false` | Render as child element | `true` |
| children | `React.ReactNode` | - | Trigger element | `<Button>Open</Button>` |

### DialogContent
| Prop | Type | Default | Description | Example |
|------|------|---------|-------------|---------|
| className | `string` | `undefined` | Additional CSS classes | `"max-w-2xl"` |
| children | `React.ReactNode` | - | Modal content | `<form>...</form>` |

### DialogHeader, DialogTitle, DialogDescription
Standard props for content organization and accessibility.

## Usage Examples

### Basic Modal
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

function BasicModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modal Title</DialogTitle>
          <DialogDescription>
            This is a description of what this modal contains.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Modal content goes here.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### Controlled Modal
```tsx
function ControlledModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Open Controlled Modal
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled Modal</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>This modal's state is controlled by the parent component.</p>
            <Button onClick={() => setOpen(false)}>
              Close Modal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

### Form Modal
```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function FormModal() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Enter the user details below to create a new account.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter name" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter email" required />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create User</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
```

### Confirmation Modal
```tsx
function ConfirmationModal({ onConfirm }: { onConfirm: () => void }) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Item</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### Large Content Modal
```tsx
function LargeContentModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detailed Information</DialogTitle>
          <DialogDescription>
            Comprehensive details about the selected item.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {/* Large content that might need scrolling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Section 1</h3>
              <p>Content for section 1...</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Section 2</h3>
              <p>Content for section 2...</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

### Modal with Custom Close Behavior
```tsx
function CustomCloseModal() {
  const [open, setOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && hasUnsavedChanges) {
      const confirmed = confirm('You have unsaved changes. Are you sure you want to close?');
      if (!confirmed) return;
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Edit Settings</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Settings</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <Input 
            placeholder="Make changes here..."
            onChange={() => setHasUnsavedChanges(true)}
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            setHasUnsavedChanges(false);
            setOpen(false);
          }}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

## Accessibility

### ARIA Support
- Automatically includes `role="dialog"`
- Sets `aria-modal="true"` for screen readers
- Manages `aria-labelledby` and `aria-describedby` relationships
- Supports custom `aria-label` when title is not sufficient

### Keyboard Navigation
- **Escape**: Closes the modal
- **Tab**: Cycles through focusable elements within the modal
- **Shift + Tab**: Reverse tab order
- Focus is trapped within the modal when open
- Focus returns to trigger element when closed

### Screen Reader Support
- Modal title is announced when opened
- Description provides additional context
- Focus management ensures screen readers stay within modal content
- Proper semantic structure with headings and landmarks

### Best Practices
```tsx
// Good: Descriptive title and description
<DialogHeader>
  <DialogTitle>Delete Account</DialogTitle>
  <DialogDescription>
    This will permanently delete your account and all associated data.
  </DialogDescription>
</DialogHeader>

// Good: Focus management for forms
<DialogContent>
  <form>
    <Input autoFocus /> {/* Focus first input */}
  </form>
</DialogContent>

// Good: Clear action buttons
<div className="flex justify-end gap-2">
  <Button variant="outline">Cancel</Button>
  <Button>Confirm</Button>
</div>
```

## Styling

### CSS Variables
```css
.dialog-overlay {
  --dialog-overlay-bg: hsl(0 0% 0% / 0.8);
}

.dialog-content {
  --dialog-bg: hsl(var(--background));
  --dialog-border: hsl(var(--border));
  --dialog-shadow: var(--shadow-card);
  --dialog-radius: var(--radius);
}
```

### Customization
```tsx
// Custom size
<DialogContent className="max-w-2xl">
  Large modal content
</DialogContent>

// Custom positioning
<DialogContent className="top-[10%] translate-y-0">
  Modal positioned near top
</DialogContent>

// Full screen on mobile
<DialogContent className="w-full h-full sm:max-w-lg sm:h-auto">
  Responsive modal
</DialogContent>
```

## Edge Cases

### Error States
```tsx
function ErrorHandlingModal() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setError(null);
      await submitData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <DialogContent>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {/* Rest of modal content */}
    </DialogContent>
  );
}
```

### Loading States
```tsx
function LoadingModal() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Processing...</DialogTitle>
      </DialogHeader>
      
      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Please wait...</span>
        </div>
      ) : (
        <div>Normal content</div>
      )}
    </DialogContent>
  );
}
```

### Responsive Behavior
```tsx
// Mobile-first modal
<DialogContent className="w-full h-full sm:max-w-md sm:h-auto sm:rounded-lg">
  <div className="flex flex-col h-full sm:h-auto">
    <DialogHeader className="flex-shrink-0">
      <DialogTitle>Mobile Optimized</DialogTitle>
    </DialogHeader>
    
    <div className="flex-1 overflow-y-auto py-4">
      Scrollable content
    </div>
    
    <div className="flex-shrink-0 border-t pt-4">
      Action buttons
    </div>
  </div>
</DialogContent>
```

## Dependencies

### Internal Dependencies
- `@/components/ui/button` - For trigger and action buttons
- `@/lib/utils` - For className utilities

### External Dependencies
- `@radix-ui/react-dialog` - Core dialog functionality
- Focus trap and portal management handled by Radix

## Testing

### Unit Tests
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

test('opens modal when trigger is clicked', () => {
  render(
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>Modal content</DialogContent>
    </Dialog>
  );

  fireEvent.click(screen.getByText('Open'));
  expect(screen.getByText('Modal content')).toBeInTheDocument();
});

test('closes modal when escape is pressed', () => {
  render(
    <Dialog defaultOpen>
      <DialogContent>Modal content</DialogContent>
    </Dialog>
  );

  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
});
```

### Integration Tests
```tsx
test('form submission in modal works correctly', async () => {
  const handleSubmit = jest.fn();
  
  render(
    <Dialog defaultOpen>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <input name="test" />
          <button type="submit">Submit</button>
        </form>
      </DialogContent>
    </Dialog>
  );

  fireEvent.click(screen.getByText('Submit'));
  expect(handleSubmit).toHaveBeenCalled();
});
```

## Related Components

- **AlertDialog**: For confirmation dialogs
- **Sheet**: For slide-out panels
- **Popover**: For smaller contextual content
- **Tooltip**: For simple hints and help text

## Changelog

### Version 1.3.0
- Added support for custom close behavior
- Improved mobile responsiveness
- Better error state handling

### Version 1.2.0
- Enhanced accessibility with better ARIA support
- Added focus trap improvements
- Better TypeScript types

### Version 1.1.0
- Added DialogDescription component
- Improved styling customization
- Better responsive behavior

### Version 1.0.0
- Initial release with basic modal functionality

---

*Last updated: January 2025*
*Maintained by: UI Team*