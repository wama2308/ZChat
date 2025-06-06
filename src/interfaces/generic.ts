import { type _RawRecord } from "@nozbe/watermelondb/RawRecord";

export type RawWithDetails<T> = _RawRecord & T;
