import React from 'react'

import { Dimensions } from 'react-native'

function useDimensions() {
  const [dimensions, setDimensions] = React.useState(Dimensions.get('window'))
  
  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window)
    })
    
    return () =>  subscription?.remove()
  }, [])
  
  return dimensions
}

export default useDimensions