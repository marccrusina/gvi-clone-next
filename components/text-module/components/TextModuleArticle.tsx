import type React from 'react'

interface TextModuleArticleProps {
  title: string
  content: string
}

const TextModuleArticle: React.FC<TextModuleArticleProps> = ({
  title,
  content,
}) => {
  return (
    <article>
      <h1>{title}</h1>
      <p>{content}</p>
    </article>
  )
}

export default TextModuleArticle
