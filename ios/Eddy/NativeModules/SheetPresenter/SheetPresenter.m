#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SheetPresenter, NSObject)

RCT_EXTERN_METHOD(presentTestSheet:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
