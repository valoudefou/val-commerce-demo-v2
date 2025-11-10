import { handleRecommendationsRequest } from '@/server/utils/recommendations'

export default defineEventHandler(async (event) => {
  return await handleRecommendationsRequest(event, 'POST')
})
