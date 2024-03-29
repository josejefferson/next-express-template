import type { TextareaProps } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import React from 'react'
import ResizeTextarea from 'react-textarea-autosize'

export const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (props, ref) => {
    return (
      <Textarea
        minH="unset"
        overflow="hidden"
        w="100%"
        resize="none"
        ref={ref}
        minRows={1}
        as={ResizeTextarea}
        {...props}
      />
    )
  }
)
