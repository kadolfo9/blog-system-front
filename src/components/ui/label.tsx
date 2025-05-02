import * as React from "react"
import { type Assign, ark } from '@ark-ui/react'

import { cn, tv, type VariantProps } from "@/lib/utils"

type LabelProps = Assign<
  React.CustomComponentPropsWithRef<typeof ark.span>,
  VariantProps<typeof labelVariants>
>

const labelVariants = tv({
  base: [
    'text-nowrap font-medium font-sans text-fg-1 tracking-normal',
    // disabled
    'data-disabled:text-disabled',
  ],
  variants: {
    size: {
      sm: 'text-sm/5.5',
      md: 'text-base',
      lg: 'text-lg/7',
      xl: 'text-xl/8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

function Label({ className, size, ...props }: LabelProps) {
  return (
    <ark.span
      {...props}
      className={cn(
        labelVariants({
          className,
          size,
        }),
      )}
    />
  )
}

export { Label }
export type { LabelProps }
