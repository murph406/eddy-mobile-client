import React

@objc(SFSymbolManager)
class SFSymbolManager: RCTViewManager {
  override func view() -> UIView! { SFSymbolView() }
  override static func requiresMainQueueSetup() -> Bool { true }
}
