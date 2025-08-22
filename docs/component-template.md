# Component Documentation Template

This template provides a standardized format for documenting reusable components in the project. Use this structure to ensure consistent and comprehensive documentation.

## Template Structure

```markdown
# ComponentName

Brief one-line description of what the component does.

## Purpose

Detailed explanation of:
- What problem this component solves
- When to use this component
- When NOT to use this component
- How it fits into the design system

## Props/Parameters

### Required Props
| Prop | Type | Description | Example |
|------|------|-------------|---------|
| propName | `type` | Description of what this prop does | `"example value"` |

### Optional Props
| Prop | Type | Default | Description | Example |
|------|------|---------|-------------|---------|
| propName | `type` | `defaultValue` | Description of what this prop does | `"example value"` |

### Variant Props
If the component has variants, document them separately:

| Variant | Values | Description |
|---------|--------|-------------|
| variant | `"primary" \| "secondary" \| "destructive"` | Controls the visual style |
| size | `"sm" \| "md" \| "lg"` | Controls the component size |

## Usage Examples

### Basic Usage
```tsx
import { ComponentName } from '@/components/ui/component-name';

function Example() {
  return (
    <ComponentName>
      Basic example
    </ComponentName>
  );
}
```

### Advanced Usage
```tsx
// More complex examples with multiple props
```

### Common Patterns
```tsx
// Show common use cases and patterns
```

## Accessibility

### ARIA Support
- List of ARIA attributes supported
- Default ARIA behavior
- How to customize accessibility

### Keyboard Navigation
- Supported keyboard shortcuts
- Tab order behavior
- Focus management

### Screen Reader Support
- How the component is announced
- Important accessibility considerations

## Styling

### CSS Variables
List any CSS custom properties that can be used to customize the component:

```css
.component-name {
  --component-bg: hsl(var(--background));
  --component-text: hsl(var(--foreground));
}
```

### Customization
- How to override default styles
- Available style variants
- Integration with design tokens

## Edge Cases

### Error States
- How the component behaves with invalid props
- Error boundaries and fallbacks

### Loading States
- Behavior during async operations
- Loading indicators

### Empty States
- Behavior with no content
- Placeholder content

### Responsive Behavior
- How the component adapts to different screen sizes
- Mobile-specific considerations

## Dependencies

### Internal Dependencies
- Other components this depends on
- Required context providers

### External Dependencies
- Third-party libraries used
- Peer dependencies

## Testing

### Unit Tests
- Key behaviors to test
- Mock requirements

### Integration Tests
- How to test with other components
- User interaction testing

## Migration Guide

If this component replaces an older version:
- Breaking changes
- Migration steps
- Deprecation timeline

## Related Components

- Links to similar or related components
- When to use alternatives

## Changelog

### Version X.X.X
- Changes made
- Breaking changes
- New features

---

*Last updated: [Date]*
*Maintained by: [Team/Person]*
```

## Usage Guidelines

1. **Keep it updated**: Update documentation when the component changes
2. **Be specific**: Include actual code examples, not pseudo-code
3. **Test examples**: Ensure all code examples actually work
4. **Consider users**: Write from the perspective of someone using the component
5. **Link related docs**: Reference design system, accessibility guidelines, etc.