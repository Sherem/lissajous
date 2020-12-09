import { StrokeGroup } from "./strokeGroup";

export interface IPos {
    x: number;
    y: number;
}

export type Position = IPos | ((context: CanvasRenderingContext2D) => IPos);

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

export interface IDrawable {
    draw: (context: CanvasRenderingContext2D) => void;
}

export interface IGroup extends IDrawable {
    add: (element: IDrawable | IDrawable[]) => IGroup;
}
