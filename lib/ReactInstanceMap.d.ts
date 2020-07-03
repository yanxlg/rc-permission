/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * copy react-dom/packages/share  code to use in outside
 */
declare interface FiberNode {
    elementType: any;
    pendingProps: any;
    return: any;
}
declare global {
    namespace JSX {
        interface Element {
            _owner?: FiberNode;
        }
    }
}
export declare function getOwner(): FiberNode;
export {};
