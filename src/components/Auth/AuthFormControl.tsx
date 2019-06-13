import React from 'react'
import { Button } from 'antd'
import { AuthorizationState, authorizationStateWaitPhoneNumber } from '../../store/authorization'

interface FormControlProps {
  authorizationState: AuthorizationState
}

const AuthFormControl = (props: FormControlProps) => {
  // let page: React.ReactNode
  // switch (props.authorizationState) {
  //   case authorizationStateWaitPhoneNumber:

  //     break;

  //   default:
  //     break;
  // }
  return (
    <Button type="primary">Button</Button>
  )
}

export default AuthFormControl
