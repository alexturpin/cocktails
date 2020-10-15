import { Document, Html, DocumentHead, Main, BlitzScript /*DocumentContext*/ } from "blitz"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  // static async getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return {...initialProps}
  // }

  render() {
    return (
      <Html lang="en" className="text-gray-900 antialiased leading-tight">
        <DocumentHead />
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
