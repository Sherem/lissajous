import { StrokeGroup } from "./strokeGroup";

export interface IPos {
    x: number;
    y: number;
}

export interface IBoundaries {
    width: number,
    height: number
}

export type Position = IPos | ((context: CanvasRenderingContext2D) => IPos);
export type Size = number | ((context: CanvasRenderingContext2D) => number);

export type StrokeStyle = string | CanvasGradient | CanvasPattern;
export type StrokeOptions = {
    strokeStyle: StrokeStyle,
    lineWidth?: number;
};

export interface IStroke extends IDrawable {
    strokeOptions?: StrokeOptions;
    setParent: (parent: StrokeGroup) => void;
}

export interface IStartEnd {
    start: Position;
    end: Position;
}

export interface IPositionable {
    pos: Position;
    setPos(pos: Position): void;
}

export interface ISizable {
    size: Size;
    setSize(size: Size):void;
}

export interface IDrawable {
    draw: (context: CanvasRenderingContext2D) => void;
}

export interface IGroup extends IDrawable {
    add: (element: IDrawable | IDrawable[]) => IGroup;
}
