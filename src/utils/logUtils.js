// Copyright 2019 AuthKeys srl
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import util from 'util';

let logger;

export const setLogger = log => {
  logger = log;
};

export const common_debug = function(message, ...args) {
  logger.debug(util.format(message, ...args));
};

export const common_info = function(message, ...args) {
  logger.info(util.format(message, ...args));
};

export const common_warn = function(message, ...args) {
  logger.warn(util.format(message, ...args));
};

export const common_error = function(message, ...args) {
  logger.error(util.format(message, ...args));
};
