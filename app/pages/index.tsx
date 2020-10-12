import { Link, BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

const Home: BlitzPage = () => {
  return (
    <div className="container">
      <main>Home</main>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
