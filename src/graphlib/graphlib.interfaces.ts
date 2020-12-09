import { StrokeGroup } from "./strokeGroup";

export interface IPos {
    x: number;
    y: number;
}

export type StrokeStyle = string | CanvasGradient | CanvasPattern;
export type StrokeOptions = {
    strokeStyle: string | CanvasGradient | CanvasPattern, lineWidth: number;
};

export interface IStroke extends IDrawable {
    strokeOptions?: StrokeOptions;
    setParent: (parent: StrokeGroup) => void;
}

export interface IStartEnd {
    start: IPos;
    end: IPos;
}

export interface IDrawable {
    draw: (context: CanvasRenderingContext2D) => void;
}

export interface IGroup extends IDrawable {
    add: (element: IDrawable | IDrawable[]) => IGroup;
}
