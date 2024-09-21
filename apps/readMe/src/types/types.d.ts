/// <reference path="dayjs">

declare type FunctionDecoration<T = any> = (t: T, k: string) => undefined;

declare type WithUpperDate<T = Object, D = dayjs.Dayjs> = { Date: D } & T;
