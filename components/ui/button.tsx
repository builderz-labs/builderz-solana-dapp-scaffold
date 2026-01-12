import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-builderz-green focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary with brand glow
        default:
          "bg-builderz-green text-black rounded-full shadow-lg shadow-builderz-green/20 hover:bg-builderz-blue hover:shadow-builderz-blue/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        // Destructive
        destructive:
          "bg-destructive text-destructive-foreground rounded-xl shadow-sm hover:bg-destructive/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        // Outlined with hover glow
        outline:
          "border border-border bg-transparent rounded-full hover:border-builderz-green/50 hover:bg-builderz-green/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        // Secondary with subtle style
        secondary:
          "bg-muted text-muted-foreground rounded-xl hover:bg-accent hover:text-foreground hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        // Ghost - minimal
        ghost:
          "rounded-xl hover:bg-accent/80 hover:text-foreground transition-all duration-200",
        // Link style
        link: "text-builderz-green underline-offset-4 hover:underline hover:text-builderz-blue transition-colors duration-200",
        // Glow - premium brand button with strong glow
        glow: "bg-builderz-green text-black rounded-full shadow-[0_0_20px_rgba(20,241,149,0.4)] hover:shadow-[0_0_30px_rgba(20,241,149,0.6)] hover:bg-builderz-blue hover:shadow-[0_0_30px_rgba(0,255,213,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300",
        // Soft - neumorphic soft UI style
        soft: "bg-card text-foreground rounded-2xl shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.1)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.1)] active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.05)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        // Glass - glassmorphism style
        glass:
          "bg-background/50 backdrop-blur-md border border-border/50 text-foreground rounded-full hover:bg-background/70 hover:border-builderz-green/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
