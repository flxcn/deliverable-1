// you won't need other imports
import fs from 'fs'
import path from 'path'

// gets path to `articles` dir in current working dir
const root = path.join(process.cwd(), 'articles')

export async function getSlugs(): Promise<string[]> {
  // TODO: return discovered slugs in filesystem from `root`
  const slugs = fs.readdirSync(root)
  return slugs
}

export async function getArticle(slug: string): string {
  // TODO: get the text from a markdown file with the given `slug`
  const slugFile = path.join(root, slug)
  // `slug` can be, e.g., `hello-world`, `the-success`, etc.
  const text = fs.readFileSync(slugFile, 'utf8');
  return text;
}

export async function postArticle(slug: string, content: string): boolean {
  // TODO: create markdown file in filesystem with slug and content
  try {
    const slugFile = path.join(root, slug);
    fs.writeFileSync(slugFile, content);
    // return `true` on success
    return true;
  } catch {
    // must handle any errors and exceptions -> should then return `false`
    console.log("error");
    return false;
  }
}
