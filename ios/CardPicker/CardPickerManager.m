#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(CardPickerManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(options, NSArray)
RCT_EXPORT_VIEW_PROPERTY(selectedId, NSString)
RCT_EXPORT_VIEW_PROPERTY(accentColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(onCardSelect, RCTDirectEventBlock)
@end
