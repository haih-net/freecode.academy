import type { CallIceServer } from '../interfaces'

export function getCallIceServers(): CallIceServer[] {
  const stun = process.env.CALL_STUN_URLS?.split(',').filter(Boolean) ?? [
    'stun:stun.l.google.com:19302',
  ]

  const servers: CallIceServer[] = stun.length ? [{ urls: stun }] : []
  const urls = process.env.CALL_TURN_URLS?.split(',').filter(Boolean)
  const username = process.env.CALL_TURN_USERNAME
  const credential = process.env.CALL_TURN_CREDENTIAL
  if (urls?.length && username && credential) {
    servers.push({ urls, username, credential })
  }

  return servers
}
