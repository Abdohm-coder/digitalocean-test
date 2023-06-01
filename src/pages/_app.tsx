import { useEffect } from "react";
import { AppProps } from "next/app";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/custom-bootstrap.scss";
import "@/styles/globals.css";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { DataProvider } from "@/context/data.context";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <DataProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ScrollToTop />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </DataProvider>
  );
};

export default MyApp;
