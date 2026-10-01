#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(GlassSurfaceManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(glassTint, NSString)
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(cornerRadius, CGFloat)
@end
