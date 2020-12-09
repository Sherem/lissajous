import { IPos, IPositionable, ISizable, Position, Size, StrokeOptions } from "./graphlib.interfaces";
import { Stroke } from "./stroke";
import { getPos, getSize, shift } from "./utils";

export class Circle extends Stroke implements IPositionable, ISizable {

    constructor(public pos: Position, public size: Size, strokeOptions?: StrokeOptions) {
        super(strokeOptions);
    }

    public setPos(pos: Position) {
        this.pos = pos;
    }

    setSize(size: Size) {
        this.size = size;
    }

    protected doDraw(context: CanvasRenderingContext2D, offset: IPos): void {
        let { x, y } = getPos(this.pos, context, offset);
        const size = getSize(this.size, context);
        x+=size;
        y+=size;
        context.moveTo(x+size, y);
        context.arc(x, y, size, 0, Math.PI * 2, false);
    }

}
