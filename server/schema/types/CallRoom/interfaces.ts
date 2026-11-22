export interface CallRoomRecord {
  id: string
  title: string
  createdById: string
  authenticatedOnly: boolean
  accessCodeHash: string | null
  closed: boolean
  version: number
  sessionToken?: string
}
export interface CallSession {
  id: string
  roomId: string
  name: string
  userId: string | null
}
export interface CallIceServer {
  urls: string[]
  username?: string
  credential?: string
}
