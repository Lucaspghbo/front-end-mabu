/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { FormControl, FormField, FormItem, FormLabel } from "./form"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

function CheckBoxForm({
  control,
  label,
}:
  {
    control: any,
    label: string,
  }) {
  return (
    <FormField
      control={control}
      name="isAdmin"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              className="bg-white w-5 h-5"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="text-lg leading-none cursor-pointer">
            <FormLabel className="text-slate-50 text-lg cursor-pointer">
              {label}
            </FormLabel>
          </div>
        </FormItem>
      )}
    />
  )
}

export { Checkbox, CheckBoxForm }
