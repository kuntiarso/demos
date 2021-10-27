import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { AuthProvider } from '../lib/auth'
import createEmotionCache from '../lib/emotion-cache'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Form Demo</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </CacheProvider>
  )
}

export default MyApp
