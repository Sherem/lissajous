import { StrokeOptions, IStartEnd, IStroke, Position, IPos } from "./graphlib.interfaces";
import { Stroke } from "./stroke";
import { getPos } from "./utils";

export class Line extends Stroke implements IStartEnd, IStroke {
    constructor(public start: Position, public end: Position, strokeOptions?: StrokeOptions) {
        super(strokeOptions);
    }

    doDraw(context: CanvasRenderingContext2D, offset: IPos): void {
        const { start, end } = this;
        const { x: x1, y: y1 } = getPos(start, context, offset);
        const { x: x2, y: y2 } = getPos(end, context, offset);
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
    }
}
