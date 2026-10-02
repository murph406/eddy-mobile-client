import UIKit
import SwiftUI
import React

@objc(CardPickerView)
class CardPickerView: UIView {
  private let model = CardPickerModel()
  private var hostingController: UIHostingController<CardPicker>?

  @objc var onCardSelect: RCTDirectEventBlock?

  @objc var options: NSArray = [] {
    didSet {
      model.options = options.compactMap { item in
        guard
          let dict = item as? [String: Any],
          let id = dict["id"] as? String,
          let title = dict["title"] as? String
        else { return nil }

        return CardPickerOption(
          id: id,
          title: title,
          imageName: dict["imageName"] as? String,
          systemImageName: dict["systemImageName"] as? String
        )
      }
    }
  }

  @objc var selectedId: NSString? {
    didSet {
      let newId = selectedId as String?
      guard newId != model.selectedId else { return } // already selected by a tap
      withAnimation(.spring(response: 0.35, dampingFraction: 0.78)) {
        model.selectedId = newId
      }
    }
  }

  @objc var accentColor: UIColor? {
    didSet {
      model.accentColor = accentColor.map { Color($0) } ?? .accentColor
    }
  }

  override init(frame: CGRect) {
    super.init(frame: frame)
    clipsToBounds = false

    model.onSelect = { [weak self] id in
      self?.onCardSelect?(["id": id])
    }

    let host = UIHostingController(rootView: CardPicker(model: model))
    host.view.backgroundColor = .clear
    host.view.clipsToBounds = false
    host.view.frame = bounds
    host.view.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    addSubview(host.view)
    hostingController = host
  }

  required init?(coder: NSCoder) { fatalError("init(coder:) not supported") }
}
