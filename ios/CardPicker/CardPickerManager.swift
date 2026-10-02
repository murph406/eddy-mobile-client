import React

@objc(CardPickerManager)
class CardPickerManager: RCTViewManager {
  override func view() -> UIView! { CardPickerView() }
  override static func requiresMainQueueSetup() -> Bool { true }
}
