import { StrokeOptions, IPos, IStartEnd, IStroke } from "./graphlib.interfaces";
import { Stroke } from "./stroke";

export class Line extends Stroke implements IStartEnd, IStroke {
    constructor(public start: IPos, public end: IPos, strokeOptions?: StrokeOptions) {
        super(strokeOptions);
    }

    doDraw(context: CanvasRenderingContext2D): void {
        const { start: { x: x1, y: y1 }, end: { x: x2, y: y2 } } = this;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
    }
}
