import { cn } from '@/app/lib/utils'
import { ButtonHTMLAttributes, forwardRef, ReactElement, cloneElement, isValidElement } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-light-accent dark:bg-dark-accent text-white hover:bg-light-accent/90 dark:hover:bg-dark-accent/90',
        secondary: 'bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text hover:bg-light-secondary/80 dark:hover:bg-dark-secondary/80',
        ghost: 'hover:bg-light-secondary dark:hover:bg-dark-secondary text-light-text dark:text-dark-text',
        outline: 'border border-light-accent dark:border-dark-accent text-light-accent dark:text-dark-accent hover:bg-light-accent dark:hover:bg-dark-accent hover:text-white',
      },
      size: {
        default: 'h-10 px-6 py-4',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-12 px-10 mt-10',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const buttonClass = cn(buttonVariants({ variant, size, className }))
    
    if (asChild && isValidElement(children)) {
      // Type assertion to handle the child element properly
      const child = children as ReactElement<any>
      
      return cloneElement(child, {
        className: cn(buttonClass, child.props?.className),
        ref,
        ...props,
        ...child.props, // Preserve existing child props
      })
    }

    return (
      <button
        className={buttonClass}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
