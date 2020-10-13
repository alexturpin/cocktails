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
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      <img src={post.image} alt={post.title} />
    </div>
  )
}

export default Cocktail
