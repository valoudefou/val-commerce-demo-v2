import { fetchRecommendations } from '@/server/utils/recommendations'

export default defineEventHandler(async () => {
  return await fetchRecommendations()
})
