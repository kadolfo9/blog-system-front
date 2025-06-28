import * as React from "react"
import { ark } from '@ark-ui/react'

import { cn } from "@/lib/utils"

type LabelProps = React.ComponentProps<typeof ark.span>

const Label = ({ className, ...props }: LabelProps) => {
  return (
    <ark.span
      {...props}
      className={cn(
        'text-nowrap font-medium text-base text-fg-1 tracking-normal',
        'data-disabled:cursor-not-allowed data-disabled:text-disabled',
      )}
    />
  )
}

Label.displayName = 'Label'

export { Label, type LabelProps }
