const DelPost = async (id: number, update: () => void, image?: string) => {
  const createPost = await fetch('/api/delete/post', {
    method: 'POST',
    body: JSON.stringify({
      id,
      image,
    }),
  })
  await update()
  if (!createPost.ok) {
    const { error } = await createPost.json()
    console.error('error:', error)
  }
}

export default DelPost
