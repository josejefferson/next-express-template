import {
  Avatar,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  SkeletonCircle
} from '@chakra-ui/react'
import Link from 'next/link'
import { useAuth } from '../../contexts/auth'
import { getAvatarColor, getName } from '../../utils/helpers'
import ChangePasswordPopover from './change-password-popover'

interface IProps {
  hideChangePasswordPopover?: boolean
}

export default function User({ hideChangePasswordPopover }: IProps) {
  const { user, loading, login, logout } = useAuth()

  return (
    <Menu>
      <MenuButton rounded="full" cursor="pointer" minW={0} ml={1} textDecoration="none">
        <>
          <SkeletonCircle size="8" hidden={!loading} />
          <ChangePasswordPopover disabled={hideChangePasswordPopover}>
            <Avatar
              bg={getAvatarColor(user?.name) + '.500'}
              size="sm"
              name={user?.name}
              src={user?.photo}
              hidden={loading}
            />
          </ChangePasswordPopover>
        </>
      </MenuButton>

      <MenuList alignItems="center">
        <Center mt={4}>
          <Avatar
            bg={getAvatarColor(user?.name) + '.500'}
            size="2xl"
            name={user?.name}
            src={user?.photo}
          />
        </Center>

        <Center my={5}>{getName(user?.name)}</Center>

        <MenuDivider />

        <Link href="/change-password" hidden={!user}>
          <MenuItem>Trocar senha</MenuItem>
        </Link>

        <MenuItem hidden={!!user} onClick={login}>
          Fazer login
        </MenuItem>

        <MenuItem onClick={logout} hidden={!user}>
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
