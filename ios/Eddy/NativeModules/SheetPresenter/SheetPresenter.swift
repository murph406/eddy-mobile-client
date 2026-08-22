import Foundation
import UIKit

@objc(SheetPresenter)
class SheetPresenter: NSObject {

  @objc
  func presentTestSheet(_ resolve: @escaping RCTPromiseResolveBlock,
                          rejecter reject: @escaping RCTPromiseRejectBlock) {
    DispatchQueue.main.async {
      guard let rootVC = UIApplication.shared.connectedScenes
        .compactMap({ ($0 as? UIWindowScene)?.keyWindow?.rootViewController })
        .first else {
        reject("NO_ROOT_VC", "Could not find root view controller", nil)
        return
      }

      let sheetVC = UIViewController()
      sheetVC.view.backgroundColor = .systemBackground

      let label = UILabel()
      label.text = "It works 🎉"
      label.font = .systemFont(ofSize: 24, weight: .semibold)
      label.translatesAutoresizingMaskIntoConstraints = false
      sheetVC.view.addSubview(label)
      NSLayoutConstraint.activate([
        label.centerXAnchor.constraint(equalTo: sheetVC.view.centerXAnchor),
        label.centerYAnchor.constraint(equalTo: sheetVC.view.centerYAnchor),
      ])

      if let sheet = sheetVC.sheetPresentationController {
        sheet.detents = [.medium(), .large()]
        sheet.prefersGrabberVisible = true
        sheet.largestUndimmedDetentIdentifier = .medium
      }

      rootVC.present(sheetVC, animated: true)
      resolve(nil)
    }
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
