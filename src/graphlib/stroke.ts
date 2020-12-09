import { StrokeOptions, IStroke } from "./graphlib.interfaces";
import { StrokeGroup } from "./strokeGroup";

export abstract class Stroke implements IStroke {
    private parent?: StrokeGroup;

    protected constructor(public strokeOptions?: StrokeOptions) {
    }

    draw(context: CanvasRenderingContext2D): void {
        if (!this.parent) {
            if (this.strokeOptions) {
                context.strokeStyle = this.strokeOptions.strokeStyle;
                context.lineWidth = this.strokeOptions.lineWidth;
            }
            context.beginPath();
        }
        this.doDraw(context);
        if (!this.parent) {
            context.stroke();
        }
    }

    protected abstract doDraw(context: CanvasRenderingContext2D): void;

    setParent(parent: StrokeGroup): void {
        this.parent = parent;
    }

}
