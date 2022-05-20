import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layout'
import { useEffect } from 'react';
import GeoService from '../api/GeoService';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
     GeoService.recordVisit();
  }, []);

  return <Layout> <Component {...pageProps} /></Layout>
}

export default  React.memo(MyApp)
