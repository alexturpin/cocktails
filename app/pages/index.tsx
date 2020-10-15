import { Link, InferGetStaticPropsType } from "blitz"
import Layout from "app/layouts/Layout"
import { getAllPosts } from "app/cocktails"

export const getStaticProps = async () => {
  const posts = getAllPosts(["slug", "title", "image"])

  return {
    props: {
      posts,
    },
  }
}

const Home = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl my-4 font-bold">Cocktails à M(ags)</h1>
      <div className="grid grid-cols-2 gap-4 max-w-xl">
        {posts.map((post) => (
          <Post post={post} key={post.slug} />
        ))}
      </div>
    </div>
  )
}

Home.getLayout = (page) => <Layout title="Cocktails à M(ags)">{page}</Layout>

//
const Post = ({ post }) => {
  return (
    <Link href="/[slug]" as={`/${post.slug}`}>
      <div className="max-w-xs rounded overflow-hidden shadow-lg cursor-pointer">
        <img className="w-full" src={post.image} alt={post.title} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-center">{post.title}</div>
        </div>
      </div>
    </Link>
  )
}

export default Home
