'use client';

import {
  Close,
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@repo/ui/lib/utils';

// Re-export Root, Trigger, and Close directly (no customization needed)
const DialogRoot = Root;
const DialogTrigger = Trigger;
const DialogClose = Close;

/**
 * Dialog.Overlay - Covers the screen behind the dialog
 */
function DialogOverlay({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Overlay>) {
  return (
    <Overlay
      className={cn(
        'data-[state=closed]:animate-out data-[state=open]:animate-in',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'fixed inset-0 z-50 bg-black/80',
        className
      )}
      {...props}
    />
  );
}

/**
 * Dialog.Content - The dialog panel itself.
 * Children can be Server Components (passed through as props).
 */
function DialogContent({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Content>) {
  return (
    <Portal>
      <DialogOverlay />
      <Content
        className={cn(
          'data-[state=closed]:animate-out data-[state=open]:animate-in',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
          'gap-4 rounded-lg border bg-white p-6 shadow-lg duration-200',
          className
        )}
        {...props}
      >
        {children}
        <Close
          className={cn(
            'absolute top-4 right-4 rounded-sm opacity-70',
            'transition-opacity hover:opacity-100',
            'focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none'
          )}
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </Close>
      </Content>
    </Portal>
  );
}

/**
 * Dialog.Header - Container for title and description
 */
function DialogHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

/**
 * Dialog.Footer - Container for action buttons
 */
function DialogFooter({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    />
  );
}

/**
 * Dialog.Title - Accessible dialog title (linked via aria-labelledby)
 */
function DialogTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Title>) {
  return (
    <Title
      className={cn(
        'font-semibold text-lg leading-none tracking-tight',
        className
      )}
      {...props}
    />
  );
}

/**
 * Dialog.Description - Accessible dialog description (linked via aria-describedby)
 */
function DialogDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Description>) {
  return (
    <Description
      className={cn('text-gray-600 text-sm', className)}
      {...props}
    />
  );
}

// Named exports only. A namespace object (export const Dialog = {...}) breaks
// when imported from a Server Component, so consumers import these individually.
export {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
};
