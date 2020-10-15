import markdownToHtml, { getAllPosts, getPostBySlug } from "app/cocktails"
import { InferGetStaticPropsType } from "blitz"

export const getStaticPaths = () => {
  return {
    paths: getAllPosts(["slug"]).map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const post = getPostBySlug(params.slug, ["title", "content", "image"])
  const content = await markdownToHtml(post.content || "")

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

const Cocktail = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl p-4 pb-0 font-bold">{post.title}</h1>
      <img className="max-w-s float-left p-4" src={post.image} alt={post.title} />
      <div className="p-4" dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  )
}

export default Cocktail
