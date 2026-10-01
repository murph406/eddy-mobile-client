import React

@objc(GlassSurfaceManager)
class GlassSurfaceManager: RCTViewManager {
  override func view() -> UIView! { GlassSurfaceView() }
  override static func requiresMainQueueSetup() -> Bool { true }
}
