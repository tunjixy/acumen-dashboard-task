import ApiClient from '../api-client'
import type { DashboardStatRes, ChatStatRes, MessageRes } from '@/types'

class DashboardService extends ApiClient {
  fetchStats(): Promise<DashboardStatRes> {
    return this.call<DashboardStatRes>('get', 'dashboard')
  }

  fetchChatStats(): Promise<ChatStatRes> {
    return this.call<ChatStatRes>('get', 'chat_dashboard')
  }

  fetchMessages(page: number): Promise<MessageRes> {
    return this.call<MessageRes>('get', `messages?page=${page}&limit=5`)
  }
}

export default DashboardService
