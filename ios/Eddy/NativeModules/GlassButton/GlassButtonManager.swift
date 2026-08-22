@objc(GlassButtonManager)

class GlassButtonManager: RCTViewManager {
  override func view() -> UIView! {
    return GlassButtonView()
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
