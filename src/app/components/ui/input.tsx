/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form"
import InputMask from 'react-input-mask';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-lg shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-zinc-500 text-slate-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

interface InputFormProps {
  control?: any;
  type?: string;
  name: string;
  label: string;
  placeholder: string;
  Icon?: any;
  mask?: string
  className?: string
  labelColor?: string;
  value?: string
  disabled?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputSingle = ({
  type = "text",
  name,
  label,
  labelColor,
  placeholder,
  Icon,
  className,
  value,
  onChange,
  disabled,
}: InputFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";

  return (
    <div className="flex flex-col gap-2 relative">
      <label className={`${labelColor || 'text-slate-50'} text-lg`}>{label}</label>
      <Input
        name={name}
        type={isPasswordField && !showPassword ? "password" : type}
        placeholder={placeholder}
        className={cn("pr-10 placeholder:text-slate-100/60", className)}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {isPasswordField && (
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ?
            <EyeOff
              color="#fff"
              size={20}
            /> :
            <Eye
              color="#fff"
              size={20}
            />}
        </button>
      )}
      {Icon && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Icon />
        </div>
      )}
    </div>
  )
}

const InputForm = ({
  control,
  type = "text",
  name,
  label,
  placeholder,
  className,
  labelColor,
}: InputFormProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={`${labelColor || 'text-slate-50'} text-lg`}>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={type}
                placeholder={placeholder}
                className={cn("pr-10 placeholder:text-slate-100/60", className)}
                {...field}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const InputFormPassword = ({
  control,
  type = "text",
  name,
  label,
  placeholder,
  Icon,
  className,
  labelColor,
}: InputFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={`${labelColor || 'text-slate-50'} text-lg`}>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={isPasswordField && !showPassword ? "password" : "text"}
                placeholder={placeholder}
                className={`pr-10 placeholder:text-slate-100/60 ${className}`}
                {...field}
              />
              {isPasswordField && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ?
                    <EyeOff
                      color="#fff"
                      size={20}
                    /> :
                    <Eye
                      color="#fff"
                      size={20}
                    />}
                </button>
              )}
              {Icon && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Icon />
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
const InputFormMask = ({
  control,
  type = "text",
  name,
  label,
  placeholder,
  Icon,
  className,
  labelColor,
  mask
}: InputFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={`${labelColor || 'text-slate-50'} text-lg`}>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <InputMask
                mask={mask || ''}
                type={isPasswordField && !showPassword ? "password" : type}
                placeholder={placeholder}
                className={cn(
                  "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-lg shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-zinc-500 text-slate-50 pr-10 placeholder:text-slate-100/60",
                  className
                )}
                {...field}
              />
              {isPasswordField && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ?
                    <EyeOff
                      color="#fff"
                      size={20}
                    /> :
                    <Eye
                      color="#fff"
                      size={20}
                    />}
                </button>
              )}
              {Icon && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Icon />
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Input, InputForm, InputSingle, InputFormMask, InputFormPassword };
