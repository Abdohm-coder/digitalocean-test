import { useEffect, useRef } from "react";
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
import { usePathname } from "next/navigation";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const pathname = usePathname();
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const searchNavbarRef = useRef<HTMLDivElement | null>(null);
  const searchHeroRef = useRef<HTMLDivElement | null>(null);
  return (
    <DataProvider searchHeroRef={searchHeroRef}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        onClick={(e) => {
          if (
            !searchNavbarRef.current?.contains(e.target) &&
            searchNavbarRef.current
          ) {
            searchNavbarRef.current.children[1].classList.add("search-none");
          } else {
            searchNavbarRef.current?.children[1].classList.remove("search-none");
          }
          if (!searchHeroRef.current?.contains(e.target)) {
            console.log("2", searchHeroRef.current?.children[1].classList);
            searchHeroRef.current?.children[1].classList.add("search-none");
          } else {
            searchHeroRef.current.children[1].classList.remove("search-none");
            console.log("te");
          }
        }}>
        <ScrollToTop />
        <Navbar searchNavbarRef={searchNavbarRef} />
        <Component {...pageProps} />
        {!pathname?.includes("/tickets") && <Footer />}
      </div>
    </DataProvider>
  );
};

export default MyApp;
