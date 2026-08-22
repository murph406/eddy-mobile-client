import React from 'react'

import { StyleSheet } from 'react-native'

import { getBounds, getCenter } from 'geolib'
import ReactMapView, { Region, UrlTile } from 'react-native-maps'

import useStyles from '@hooks/useStyles'
import { ThemeContextType } from '@stores/ThemeContext'
import { EventEmitter, GeoPoint } from '@utils/Structures'
import { ScaledSize } from 'react-native'

const URL_TEMPLATE = "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}"

export type MapOptions = {
  zoomEnabled?: boolean
  scrollEnabled?: boolean
  rotateEnabled?: boolean
  pitchEnabled?: boolean
  showsUserLocation?: boolean
  region?: Region
}

export type MapViewHandle = {
  on: (event: string, callback: (data: unknown) => void) => EventEmitter
  off: (event: string, callback: (data: unknown) => void) => void
  emit: (event: string, data: unknown) => void
  setMapType: (data: 'standard' | 'satellite') => void
  navigateToSeattle: (slideUpHeight?: number) => void
  navigateToCoordinates: (coordinates?: GeoPoint[], slideUpHeight?: number) => void
  seattleLatLng: GeoPoint
}

type Props = {
  children?: React.ReactNode
  options?: MapOptions
}

const MapView = React.forwardRef<MapViewHandle, Props>(function MapView({ children, options = {} }, ref) {
  const emitterRef = React.useRef(new EventEmitter())
  const mapRef = React.useRef<ReactMapView>(null)

  const [mapType, setMapType] = React.useState<'standard' | 'satellite'>('standard')

  const s = useStyles(createStyles)
  const seattleLatLng = new GeoPoint(47.639370, -122.326248)

  options = {
    zoomEnabled: true,
    scrollEnabled: true,
    rotateEnabled: true,
    pitchEnabled: true,
    showsUserLocation: true,
    region: {
      latitude: seattleLatLng.latitude,
      longitude: seattleLatLng.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
    ...options,
  }

  React.useImperativeHandle(ref, () => {
    return {
      on: (event: string, callback: (data: unknown) => void) => emitterRef.current.on(event, callback),
      off: (event: string, callback: (data: unknown) => void) => emitterRef.current.off(event, callback),
      emit: (event: string, data: unknown) => emitterRef.current.emit(event, data),
      setMapType: (data: 'standard' | 'satellite') => setMapType(data),
      navigateToSeattle: (slideUpHeight: number = 400) => { mapRef.current?.animateToRegion(getRegion([seattleLatLng], slideUpHeight), 1000) },
      navigateToCoordinates: (coordinates: GeoPoint[] = [seattleLatLng], slideUpHeight: number = 400) => {
        if (coordinates == null || coordinates?.length == 0) return
        if (coordinates.length === 1) mapRef.current?.animateToRegion(getRegion(coordinates, slideUpHeight), 1000)
        else mapRef.current?.fitToCoordinates(coordinates, {
          edgePadding: {
            top: 10,
            right: 50,
            bottom: slideUpHeight + 50,
            left: 50,
          },
          animated: true,
        })
      },
      seattleLatLng,
    }
  }, [])

  function getRegion(coordinates: GeoPoint[] = [seattleLatLng], slideUpHeight: number = 0): Region {
    const bounds = getBounds(coordinates)
    const center = getCenter(coordinates) || { latitude: 0, longitude: 0 }
    const LATITUDE_BUFFER = 0.01
    const LONGITUDE_BUFFER = 0.01
    const ZOOM_OUT_FACTOR = 1

    const latitudeDelta = (bounds.maxLat - bounds.minLat + LATITUDE_BUFFER) * ZOOM_OUT_FACTOR
    const longitudeDelta = (bounds.maxLng - bounds.minLng + LONGITUDE_BUFFER) * ZOOM_OUT_FACTOR
    const offsetPercentage = slideUpHeight / s.screenHeight
    const latitudeOffset = latitudeDelta * offsetPercentage * 0.5

    return {
      latitude: center.latitude - latitudeOffset,
      longitude: center.longitude,
      latitudeDelta,
      longitudeDelta
    }
  }

  return (
    <ReactMapView
      ref={mapRef}
      style={s.container}
      zoomEnabled={options?.zoomEnabled}
      scrollEnabled={options?.scrollEnabled}
      rotateEnabled={options?.rotateEnabled}
      pitchEnabled={options?.pitchEnabled}
      mapType={mapType}
      showsUserLocation={options?.showsUserLocation}
      region={options?.region}>
      {mapType === 'standard' && (
        <UrlTile
          urlTemplate={URL_TEMPLATE}
          maximumZ={19}
          flipY={false}
          shouldReplaceMapContent={true}
          tileSize={256}
        />
      )}

      {children}
    </ReactMapView>
  )
})

const createStyles = (theme: ThemeContextType | null, dimensions: ScaledSize) => {
  const { height } = dimensions

  return {
    ...StyleSheet.create({
      container: {
        flex: 1,
        width: '100%' as const,
        height: '100%' as const,
        zIndex: 0,
      },
    }),
    screenHeight: height
  }
}

export default MapView