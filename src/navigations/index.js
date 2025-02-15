import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import MainStack from './MainStack'
import MainTab from './MainTab'

const Navigation = () => {
  return (
    <NavigationContainer>
        <MainStack />
    </NavigationContainer>
  )
}

export default Navigation