export interface Menu {
  title: string
  url: string
  icon: any
}

export interface DashboardStat {
  usersOnline: number
  usersActiveToday: number
  usersActiveThisMonth: number
  peakConcurrency: number
  dashboard: number
}
export interface DashboardStatRes {
  data: DashboardStat
}

export interface ChatStat {
  numberOfUsers: number
  totalMessagesSent: number
  totalStorageUsed: number
  totalMediaSent: number
}

export interface ChatStatRes {
  data: ChatStat
}

export interface Message {
  full_name: string
  message_sent: number
  media_storage_used: number
  date_created: string
  media_sent: number
}

export interface MessageRes {
  data: Message[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
