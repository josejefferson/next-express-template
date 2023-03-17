import type { InputProps } from '@chakra-ui/react'
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md'

export default function PasswordInput(props: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <InputGroup>
      <InputLeftElement width="3rem" height="100%" pr={2}>
        <MdLock />
      </InputLeftElement>

      <Input type={showPassword ? 'text' : 'password'} {...props} />

      <InputRightElement h="full">
        <IconButton
          aria-label="Exibir/ocultar senha"
          title={(showPassword ? 'Ocultar' : 'Exibir') + ' senha'}
          size="sm"
          variant="ghost"
          colorScheme="white"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
        </IconButton>
      </InputRightElement>
    </InputGroup>
  )
}
