import {Head, Html, Main, NextScript} from "next/document"

export default function RootLayout() {
  return (
      <Html lang="en" suppressHydrationWarning>
        <Head/>
        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
  );
}
