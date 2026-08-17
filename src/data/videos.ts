export interface Video {
  id: string
  title: string
  url: string
}

const channelUrl = 'https://www.youtube.com/@suegiuperlitaliaconMarco'

const videos: Video[] = [
  { id: 'IJOZ17Kpo90', title: 'In un giorno qualunque - Estratto', url: 'https://www.youtube.com/watch?v=IJOZ17Kpo90&t=14s' },
  { id: 'mOIQyvEJdpI', title: 'Viaggio e racconti - Episodio', url: 'https://www.youtube.com/watch?v=mOIQyvEJdpI' },
  { id: 'EAZ2kvbesiI', title: 'Racconti dal canale', url: 'https://www.youtube.com/watch?v=EAZ2kvbesiI' }
]

export { channelUrl }
export default videos
