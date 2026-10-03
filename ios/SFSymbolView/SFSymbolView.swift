import UIKit

@objc(SFSymbolView)
class SFSymbolView: UIView {
  private let imageView = UIImageView()
  
  @objc var name: NSString = "" { didSet { updateImage() } }
  @objc var size: CGFloat = 17 { didSet { updateImage() } }
  @objc var weight: NSString = "regular" { didSet { updateImage() } }
  @objc var color: UIColor? {
    didSet { imageView.tintColor = color ?? .label }
  }
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    clipsToBounds = false
    imageView.contentMode = .center
    imageView.tintColor = .label
    imageView.frame = bounds
    imageView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    addSubview(imageView)
  }
  
  required init?(coder: NSCoder) { fatalError("init(coder:) not supported") }
  
  private func updateImage() {
    let config = UIImage.SymbolConfiguration(pointSize: size, weight: symbolWeight)
    imageView.image = UIImage(systemName: name as String, withConfiguration: config)
  }

  private var symbolWeight: UIImage.SymbolWeight {
    switch weight as String {
    case "ultraLight": return .ultraLight
    case "thin": return .thin
    case "light": return .light
    case "medium": return .medium
    case "semibold": return .semibold
    case "bold": return .bold
    case "heavy": return .heavy
    case "black": return .black
    default: return .regular
    }
  }
}
