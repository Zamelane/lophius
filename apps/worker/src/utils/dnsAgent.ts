import { Agent } from 'undici'

export function GetDnsAgent(dnsIP: string) {
  return new Agent({
    connect: {
      // The third argument refers to the IP family (4 for IPv4, 6 for IPv6)
      lookup: (_hostname, _options, callback) => callback(null, dnsIP, 4)
    }
  })
}

export { fetch, request } from 'undici'
