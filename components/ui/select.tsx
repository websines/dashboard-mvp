"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { defaultValue?: string; onValueChange?: (value: string) => void; children: React.ReactNode }
>(({ className, defaultValue, onValueChange, children, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(defaultValue)
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (newValue: string) => {
        setValue(newValue)
        onValueChange?.(newValue)
        setOpen(false)
    }

    // Clone children to pass props
    const enhancedChildren = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            if (child.type === SelectTrigger) {
                return React.cloneElement(child as React.ReactElement<any>, { onClick: () => setOpen(!open), value })
            }
            if (child.type === SelectContent) {
                return open ? React.cloneElement(child as React.ReactElement<any>, { onSelect: handleSelect, selectedValue: value }) : null
            }
        }
        return child
    })

    return (
        <div ref={containerRef} className={cn("relative", className)} {...props}>
            {enhancedChildren}
        </div>
    )
})
Select.displayName = "Select"

const SelectTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { value?: string }
>(({ className, children, value, ...props }, ref) => (
    <button
        ref={ref}
        type="button"
        className={cn(
            "flex h-9 w-full items-center justify-between border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
        )}
        {...props}
    >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef<
    HTMLSpanElement,
    React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
    <span ref={ref} className={cn("block truncate", className)} {...props} />
))
SelectValue.displayName = "SelectValue"

const SelectContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { onSelect?: (value: string) => void; selectedValue?: string }
>(({ className, children, onSelect, selectedValue, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "absolute z-50 min-w-[8rem] overflow-hidden border border-border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
            "top-[calc(100%+4px)] w-full",
            className
        )}
        {...props}
    >
        <div className="p-1">
            {React.Children.map(children, child => {
                if (React.isValidElement(child) && child.type === SelectItem) {
                    const item = child as React.ReactElement<any>
                    return React.cloneElement(item, {
                        onSelect: () => onSelect?.(item.props.value),
                        isSelected: selectedValue === item.props.value
                    })
                }
                return child
            })}
        </div>
    </div>
))
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string; onSelect?: () => void; isSelected?: boolean }
>(({ className, children, onSelect, isSelected, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "relative flex w-full cursor-default select-none items-center py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        onClick={onSelect}
        {...props}
    >
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
            {isSelected && <Check className="h-4 w-4" />}
        </span>
        <span className="truncate">{children}</span>
    </div>
))
SelectItem.displayName = "SelectItem"

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
