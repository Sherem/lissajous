import { StrokeOptions, IStroke, IPos } from "./graphlib.interfaces";
import { StrokeGroup } from "./strokeGroup";

export abstract class Stroke implements IStroke {
    protected parent?: StrokeGroup;

    protected constructor(public strokeOptions?: StrokeOptions) {
    }

    draw(context: CanvasRenderingContext2D): void {
        if (!this.parent) {
            if (this.strokeOptions) {
                const {lineWidth, strokeStyle} = this.strokeOptions;
                context.strokeStyle = strokeStyle;
                if (lineWidth) {
                    context.lineWidth = lineWidth;
                }
            }
            context.beginPath();
        }
        this.doDraw(context, this.getParentOffset(context));
        if (!this.parent) {
            context.stroke();
        }
    }

    protected abstract doDraw(context: CanvasRenderingContext2D, offset: IPos): void;

    setParent(parent: StrokeGroup): void {
        this.parent = parent;
    }

    protected getParentOffset(context: CanvasRenderingContext2D): IPos {
        if (this.parent) {
            return this.parent.getPos(context);
        } else {
            return  {
                x: 0,
                y: 0,
            }
        }
    }
}
