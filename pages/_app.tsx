import Wrapper from "@/layout/wrapper/wrapper";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Wrapper>
          <Toaster position="top-right" />
          <Component {...pageProps} />;
        </Wrapper>
      </CookiesProvider>
    </QueryClientProvider>
  );
}
