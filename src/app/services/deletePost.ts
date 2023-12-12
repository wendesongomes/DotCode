const DelPost = async (id: number, update: () => void) => {
  const createPost = await fetch('/api/delete/post', {
    method: 'POST',
    body: JSON.stringify({
      id,
    }),
  })
  await update()
  if (!createPost.ok) {
    const { error } = await createPost.json()
    console.error('error:', error)
  }
}

export default DelPost
