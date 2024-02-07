import React from 'react'
import LoginForm from '../components/LoginForm'
import { SafeAreaView } from 'react-native'

export default function Login() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
        <LoginForm />
    </SafeAreaView>
  )
}
