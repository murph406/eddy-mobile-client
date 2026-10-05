//
//  MapSheetView.swift
//  Eddy
//
//  Created by Ryan Murphy on 10/4/26.
//

import React
import UIKit

@objc(MapSheetView)
class MapSheetView: UIView {

  @objc var initialDetentIndex: NSInteger = 0
  @objc var onDetentChange: RCTDirectEventBlock?
  @objc var detents: NSArray = [0.12, 0.5, 0.95] {
    didSet {
      setNeedsLayout()
    }
  }

  private let backgroundView = UIVisualEffectView()
  private let grabber = UIView()
  private var animator: UIViewPropertyAnimator?
  private var currentIndex = 0
  private var hasPositioned = false
  private var isDragging = false
  private var panStartOffset: CGFloat = 0
  private let cornerRadius: CGFloat = 28

  //  MARK: SetUp

  override init(frame: CGRect) {
    super.init(frame: frame)
    clipsToBounds = false

    if #available(iOS 26.0, *) {
      backgroundView.effect = UIGlassEffect()
    } else {
      backgroundView.effect = UIBlurEffect(style: .systemMaterial)
    }

    backgroundView.clipsToBounds = true
    backgroundView.layer.cornerRadius = cornerRadius
    backgroundView.layer.cornerCurve = .continuous
    backgroundView.layer.maskedCorners = [
      .layerMaxXMinYCorner, .layerMinXMinYCorner,
    ]
    addSubview(backgroundView)

    grabber.backgroundColor = .tertiaryLabel
    grabber.layer.cornerRadius = 2.5
    addSubview(grabber)

    addGestureRecognizer(
      UIPanGestureRecognizer(
        target: self,
        action: #selector(handlePan(_:))
      )
    )
  }

  required init?(coder: NSCoder) { fatalError("init(coder:) not supported") }

  private var fractions: [CGFloat] {
    detents.compactMap { ($0 as? NSNumber).map { CGFloat($0.doubleValue) } }
      .sorted()
  }

  private var containerHeight: CGFloat {
    superview?.bounds.height ?? bounds.height
  }

  // How far down the sheet slides so that `fraction` of the screen is visible.
  private func offset(for index: Int) -> CGFloat {
    guard fractions.indices.contains(index) else { return 0 }
    return max(0, bounds.height - fractions[index] * containerHeight)
  }

  // Layout
  override func layoutSubviews() {
    super.layoutSubviews()
    backgroundView.frame = bounds
    grabber.frame = CGRect(
      x: (bounds.width - 36) / 2,
      y: 6,
      width: 36,
      height: 5
    )

    guard bounds.height > 0, !fractions.isEmpty else { return }

    if !hasPositioned {
      hasPositioned = true
      currentIndex = min(max(initialDetentIndex, 0), fractions.count - 1)
    }

    if !isDragging && animator == nil {
      transform = CGAffineTransform(
        translationX: 0,
        y: offset(for: currentIndex)
      )
    }
  }

  @objc private func handlePan(_ gesture: UIPanGestureRecognizer) {
    let translation = gesture.translation(in: superview).y

    switch gesture.state {
    case .began:
      animator?.stopAnimation(true)  // freeze mid-animation if the user grabs it
      animator = nil
      isDragging = true
      panStartOffset = transform.ty

    case .changed:
      let highest = offset(for: fractions.count - 1)  // smallest offset = most visible
      let lowest = offset(for: 0)
      var newOffset = panStartOffset + translation

      if newOffset < highest {
        newOffset = highest - rubberBand(highest - newOffset)
      } else if newOffset > lowest {
        newOffset = lowest + rubberBand(newOffset - lowest)
      }
      transform = CGAffineTransform(translationX: 0, y: newOffset)

    case .ended, .cancelled:
      isDragging = false
      let velocity = gesture.velocity(in: superview).y
      let projected = transform.ty + project(velocity)
      let target =
        fractions.indices.min {
          abs(offset(for: $0) - projected) < abs(offset(for: $1) - projected)
        } ?? currentIndex
      snap(to: target, velocity: velocity)

    default:
      break
    }
  }

  private func snap(to index: Int, velocity: CGFloat) {
    let targetOffset = offset(for: index)
    let distance = targetOffset - transform.ty
    let relativeVelocity = abs(distance) > 1 ? velocity / distance : 0

    let spring = UISpringTimingParameters(
      dampingRatio: 0.88,
      initialVelocity: CGVector(dx: relativeVelocity, dy: relativeVelocity)
    )
    let anim = UIViewPropertyAnimator(duration: 0.5, timingParameters: spring)
    anim.addAnimations {
      self.transform = CGAffineTransform(translationX: 0, y: targetOffset)
    }
    anim.addCompletion { [weak self] _ in self?.animator = nil }
    anim.startAnimation()
    animator = anim

    if index != currentIndex {
      currentIndex = index
      onDetentChange?(["index": index])
    }
  }

  // MARK: Physics helpers

  //Apple-style resistance when dragging past the first or last detent.
  private func rubberBand(_ distance: CGFloat) -> CGFloat {
    let c: CGFloat = 0.55
    let d = containerHeight
    return (1 - (1 / (distance * c / d + 1))) * d
  }

  /// Where a flick would carry the sheet, using UIScrollView's deceleration.
  private func project(_ velocity: CGFloat) -> CGFloat {
    let rate = UIScrollView.DecelerationRate.normal.rawValue
    return (velocity / 1000) * rate / (1 - rate)
  }

}
