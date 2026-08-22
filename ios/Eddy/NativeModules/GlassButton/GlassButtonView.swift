import UIKit

class GlassButtonView: UIView {
  private let button = UIButton(type: .system)

  @objc var onGlassButtonPress: RCTDirectEventBlock?

  @objc var title: String? {
    didSet { updateConfiguration() }
  }
  
  @objc var systemImageName: String? {
    didSet { updateConfiguration() }
  }
  
  @objc var accentColor: UIColor? {
    didSet { updateConfiguration() }
  }
  
  @objc var fontSize: NSNumber? {
    didSet { updateConfiguration() }
  }
  
  @objc var fontWeight: String? {
    didSet { updateConfiguration() }
  }
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    
     button.addTarget(self, action: #selector(handleTap), for: .touchUpInside)
     button.translatesAutoresizingMaskIntoConstraints = false
     addSubview(button)
    
     NSLayoutConstraint.activate([
       button.leadingAnchor.constraint(equalTo: leadingAnchor),
       button.trailingAnchor.constraint(equalTo: trailingAnchor),
       button.topAnchor.constraint(equalTo: topAnchor),
       button.bottomAnchor.constraint(equalTo: bottomAnchor),
     ])
    
     updateConfiguration()
  }
  
  required init?(coder: NSCoder) { fatalError("init(coder:) has not been implemented") }
  
  private func resolvedWeight() -> UIFont.Weight {
    switch fontWeight {
    case "ultraLight": return .ultraLight
    case "thin": return .thin
    case "light": return .light
    case "regular": return .regular
    case "medium": return .medium
    case "semibold": return .semibold
    case "bold": return .bold
    case "heavy": return .heavy
    case "black": return .black
    default: return .semibold
    }
  }
  
  private func updateConfiguration() {
    var config: UIButton.Configuration
    
    if #available(iOS 26.0, *) {
      config = .prominentGlass()
    } else {
      config = .filled()
    }
    
    config.title = title
    
    if let systemImageName {
      config.image = UIImage(systemName: systemImageName)
    }
    
    if let accentColor {
      config.baseBackgroundColor = accentColor
    }
    
    let size = CGFloat(fontSize?.floatValue ?? 17) // 17pt is iOS's standard button label size
    let weight = resolvedWeight()
    
    config.titleTextAttributesTransformer = UIConfigurationTextAttributesTransformer { incoming in
      var outgoing = incoming
      outgoing.font = .systemFont(ofSize: size, weight: weight)
      return outgoing
    }
    
    button.configuration = config
  }
  
  @objc private func handleTap() {
    onGlassButtonPress?([:])
   }
  
}

