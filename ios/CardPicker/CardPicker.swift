import SwiftUI
import UIKit

// MARK: - Model (driven by React Native)
struct CardPickerOption: Identifiable, Equatable {
  let id: String
  let title: String
  var imageName: String? = nil        // asset catalog image
  var systemImageName: String? = nil  // SF Symbol fallback
}

final class CardPickerModel: ObservableObject {
  @Published var options: [CardPickerOption] = []
  @Published var selectedId: String?
  @Published var accentColor: Color = .accentColor
  var onSelect: ((String) -> Void)?
}

// MARK: - Picker

struct CardPicker: View {
  @ObservedObject var model: CardPickerModel
  @Namespace private var selectionNamespace

  private let maxFittedOptions = 4
  private let scrollingCardWidth: CGFloat = 88

  var body: some View {
    if model.options.count <= maxFittedOptions {
      cards(fixedWidth: nil)
    } else {
      ScrollView(.horizontal, showsIndicators: false) {
        cards(fixedWidth: scrollingCardWidth)
          .padding(.vertical, 8) // room for the ring's glow
          .padding(.horizontal, 4)
      }
    }
  }

  private func cards(fixedWidth: CGFloat?) -> some View {
    HStack(alignment: .top, spacing: 12) {
      ForEach(model.options) { option in
        PickerCard(
          option: option,
          isSelected: option.id == model.selectedId,
          accent: model.accentColor,
          namespace: selectionNamespace
        ) {
          select(option)
        }
        .frame(width: fixedWidth)
      }
    }
  }

  private func select(_ option: CardPickerOption) {
    guard option.id != model.selectedId else { return }
    UISelectionFeedbackGenerator().selectionChanged()
    withAnimation(.spring(response: 0.35, dampingFraction: 0.78)) {
      model.selectedId = option.id
    }
    model.onSelect?(option.id)
  }
}


// MARK: - Card

private struct PickerCard: View {
  let option: CardPickerOption
  let isSelected: Bool
  let accent: Color
  let namespace: Namespace.ID
  let action: () -> Void

  private let cornerRadius: CGFloat = 16

  var body: some View {
    Button(action: action) {
      VStack(spacing: 8) {
        Color.clear
          .aspectRatio(1, contentMode: .fit)
          .overlay(artwork)
          .clipShape(RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
          .overlay {
            if isSelected {
              RoundedRectangle(cornerRadius: cornerRadius + 4, style: .continuous)
                .stroke(accent, lineWidth: 3)
                .padding(-4)
                .shadow(color: accent.opacity(0.55), radius: 10)
                .matchedGeometryEffect(id: "selectionRing", in: namespace)
            }
          }

        Text(option.title)
          .font(.footnote.weight(isSelected ? .semibold : .regular))
          .foregroundStyle(isSelected ? accent : Color.primary)
          .lineLimit(1)
      }
    }
    .buttonStyle(PressableCardStyle())
    .accessibilityLabel(option.title)
    .accessibilityAddTraits(isSelected ? .isSelected : [])
  }

  @ViewBuilder
  private var artwork: some View {
    if let name = option.imageName, UIImage(named: name) != nil {
      Image(name)
        .resizable()
        .scaledToFill()
    } else if let symbol = option.systemImageName {
      ZStack {
        Color(.secondarySystemFill)
        Image(systemName: symbol)
          .font(.system(size: 28, weight: .medium))
          .foregroundStyle(isSelected ? accent : Color.secondary)
      }
    } else {
      // Placeholder until artwork is added
      LinearGradient(
        colors: [.green.opacity(0.6), .blue.opacity(0.6)],
        startPoint: .topLeading,
        endPoint: .bottomTrailing
      )
    }
  }
}


// MARK: - Press feedback

private struct PressableCardStyle: ButtonStyle {
  func makeBody(configuration: Configuration) -> some View {
    configuration.label
      .scaleEffect(configuration.isPressed ? 0.94 : 1)
      .animation(.spring(response: 0.25, dampingFraction: 0.7), value: configuration.isPressed)
  }
}

// MARK: - Preview

struct CardPicker_Previews: PreviewProvider {
  static var previews: some View {
    let maps = CardPickerModel()
    maps.options = [
      CardPickerOption(id: "outdoor", title: "Outdoor", imageName: "map-outdoor"),
      CardPickerOption(id: "topo", title: "Topo", imageName: "map-topo"),
      CardPickerOption(id: "satellite", title: "Satellite", imageName: "map-satellite"),
    ]
    maps.selectedId = "outdoor"

    let appearance = CardPickerModel()
    appearance.options = [
      CardPickerOption(id: "light", title: "Light", systemImageName: "sun.max.fill"),
      CardPickerOption(id: "dark", title: "Dark", systemImageName: "moon.fill"),
      CardPickerOption(id: "system", title: "System", systemImageName: "circle.lefthalf.filled"),
    ]
    appearance.selectedId = "system"

    return VStack(spacing: 32) {
      CardPicker(model: maps)
      CardPicker(model: appearance)
    }
    .padding()
  }
}
