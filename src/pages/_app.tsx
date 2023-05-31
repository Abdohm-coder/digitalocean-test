import { AppProps } from "next/app";
import "@/styles/globals.css";
import { Nunito } from "next/font/google";

export const font = Nunito({
  subsets: ["latin"],
});

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (

        <div className={font.className}>
          <Component {...pageProps} />
        </div>
  );
};

export default MyApp;
