import UIKit

@objc(GlassSurfaceView)
class GlassSurfaceView: UIView {
  private let effectView = UIVisualEffectView()

  @objc var glassStyle: NSString = "regular" { didSet { updateEffect() } }
  @objc var glassTint: UIColor? { didSet { updateEffect() } }
  @objc var cornerRadius: CGFloat = 0 {
    didSet { effectView.layer.cornerRadius = cornerRadius }
  }

  override init(frame: CGRect) {
    super.init(frame: frame)
    effectView.frame = bounds
    effectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    effectView.clipsToBounds = true
    effectView.layer.cornerCurve = .continuous
    addSubview(effectView)
    updateEffect()
  }

  required init?(coder: NSCoder) { fatalError("init(coder:) not supported") }

  private func updateEffect() {
    if #available(iOS 26.0, *) {
      let effect = UIGlassEffect(style: glassStyle == "clear" ? .clear : .regular)
      effect.tintColor = glassTint
      effectView.effect = effect
    } else {
      effectView.effect = UIBlurEffect(style: .systemMaterial)
    }
  }
}
