import { PostProps } from '../../../next-env'

const postTime = (id: number, posts: PostProps[]) => {
  const post = posts.find((post) => post.id === id)

  if (post) {
    const nowTime = new Date()
    const postDate = new Date(post.createdAt)

    const timeChange = nowTime.getTime() - postDate.getTime()

    const seconds = Math.floor(timeChange / 1000)
    const minutes = Math.floor(seconds / 60)
    const hour = Math.floor(minutes / 60)
    const day = Math.floor(hour / 24)

    if (day > 0) {
      return `${day} day`
    }
    if (hour > 0) {
      return `${hour} h`
    }
    if (minutes > 0) {
      return `${minutes} min`
    }
    if (seconds >= 0) {
      return `${seconds} sec`
    }
    if (seconds < 0) {
      return 'posted now'
    }
    if (hour > 24) {
      return `${
        postDate.getDate() +
        '/' +
        (postDate.getMonth() + 1) +
        '/' +
        postDate.getFullYear()
      }`
    }
  }
  return 'not found'
}

export default postTime
