import Link from 'next/link'
import styles from './page.module.css'
import { getSlugs } from '@/lib/api'
import { postArticle } from '@/lib/api'

async function getLinks(): Promise<
  {
    name: string
    href: string
  }[]
> {
  // TODO: make this dynamically query
  // hint: `getSlugs`
  const slugs = await getSlugs()
  const links = slugs.map((slug) => ({
    name: slug,
    href: `/articles/${slug}`,
  }))

  return links
}

export default async function Home() {
  const links = await getLinks()

  const addArticle = async (formData: FormData) => {
    'use server'
    const slugInput = formData.get('slug')
    const contentInput = formData.get('content')
    const article = await postArticle(
      slugInput as string,
      contentInput as string,
    )

    console.log(article)
  }

  return (
    <>
      <main>
        <ul>
          {
            // TODO: use `map` to render links with `Link` component
            // wrapped in ? elements
            links.map((link) => (
              <li key={link.name}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))
          }
        </ul>
      </main>

      {
        // TODO: use Next.js server actions to
        // ultimately `postArticle` in `api.ts`
        // there are also HTML attribute problems
      }
      <form className={styles.articleForm} action={addArticle}>
        <input
          type="text"
          id="slug"
          name="slug"
          placeholder="Enter slug here"
          className={styles.articleEditor}
        ></input>
        <textarea
          id="content"
          name="content"
          placeholder="Enter content here"
          className={styles.articleEditor}
        />
        <button type="submit">Post Article</button>
      </form>
    </>
  )
}
