import React from 'react'
import { type AppProps } from 'next/app'

import 'bootstrap/dist/css/bootstrap.min.css'

import '../styles/Layout.scss'
import '../styles/index.scss'
import '../styles/textbook.scss'

export default function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />
}
