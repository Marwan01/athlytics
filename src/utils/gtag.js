/**
 * React Starter Kit for Firebase
 * https://github.com/kriasoft/react-firebase-starter
 * Copyright (c) 2015-present Kriasoft | MIT License
 */

/* @flow */

export function gtag() {
  if (window !== undefined && window.config.gaTrackingId) {
    window.dataLayer.push(arguments);
  }
}
