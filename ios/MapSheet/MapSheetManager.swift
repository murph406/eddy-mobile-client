import React

@objc(MapSheetManager)
class MapSheetManager: RCTViewManager {
  
  override func view() -> UIView! {
    MapSheetView()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    true
  }
}
