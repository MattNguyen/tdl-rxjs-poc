import React, { useState } from 'react'
import { authorizationStateWaitPhoneNumber } from '../../store/authorization'
import AuthPhoneControl from '../../components/Auth/AuthPhoneControl'

const C = () => {
  const [authorizationState] = useState<string | null>(null)

  let page: any
  switch (authorizationState) {
    case authorizationStateWaitPhoneNumber:
      page = <AuthPhoneControl submit={() => Promise.resolve(null) } onFinish={() => null} />
    default:
  }
  return page
}

export default C
