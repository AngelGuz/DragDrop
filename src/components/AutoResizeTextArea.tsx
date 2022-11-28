import React from "react";
import ResizeTextarea from 'react-textarea-autosize';
import { Textarea, TextareaProps } from "@chakra-ui/react";

export const AutoResizeTextArea = React.forwardRef<HTMLTextAreaElement, TextareaProps>( (props, ref) => {
    return <Textarea as={ResizeTextarea} minH="unset" ref={ref} {...props} />
} )