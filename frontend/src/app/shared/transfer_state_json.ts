/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {APP_ID, NgModule} from '@angular/core';
import {TransferState, ɵescapeHtml as escapeHtml} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';
import {BEFORE_APP_SERIALIZED} from '@angular/platform-server';

export function serializeTransferStateFactory(
    doc: Document, appId: string, transferStore: TransferState) {
  return () => {
    return JSON.parse(transferStore.toJson());
  };
}

/**
 * NgModule to install on the server side while using the `TransferState` to transfer state from
 * server to client.
 *
 * @experimental
 */
@NgModule({
  providers: [
    TransferState, {
      provide: BEFORE_APP_SERIALIZED,
      useFactory: serializeTransferStateFactory,
      deps: [DOCUMENT, APP_ID, TransferState],
      multi: true,
    }
  ]
})
export class ServerTransferStateJsonModule {
}
