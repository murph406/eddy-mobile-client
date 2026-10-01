export type Coordinates = {
  latitude: number
  longitude: number
}

export type Pin = { id: string; coordinate: [number, number] }
export type MapMode = 'outdoors' | 'topo' | 'satellite'

