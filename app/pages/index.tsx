import { Link, InferGetStaticPropsType } from "blitz"
import Layout from "app/layouts/Layout"
import { getAllPosts } from "app/cocktails"

export const getStaticProps = async () => {
  const posts = getAllPosts(["slug", "title"])

  return {
    props: {
      posts,
    },
  }
}

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="container">
      <main>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.slug}>
                <Link href="/[slug]" as={`/${post.slug}`}>
                  {post.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Cocktails à M(ags)">{page}</Layout>

export default Home
