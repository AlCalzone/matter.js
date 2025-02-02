/**
 * @license
 * Copyright 2022-2023 Project CHIP Authors
 * SPDX-License-Identifier: Apache-2.0
 */
import { MatterError } from "../error/MatterError";

export class EndOfStreamError extends MatterError { }

export interface Stream<T> {
    read(): Promise<T>;
    write(data: T): Promise<void>;
}
