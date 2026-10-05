#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(MapSheetManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(detents, NSArray)
RCT_EXPORT_VIEW_PROPERTY(initialDetentIndex, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(onDetentChange, RCTDirectEventBlock)
@end
