import { Group } from "./group";
import { StrokeOptions, IStroke, Position, IPos } from "./graphlib.interfaces";
import { Stroke } from "./stroke";
import { getPos } from "./utils";

export class StrokeGroup extends Stroke {
    private pos: Position;
    private group: Group = new Group();

    public constructor(strokeOptions?: StrokeOptions, pos: Position = {
        x: 0,
        y: 0,
    }) {
        super(strokeOptions);
        this.pos = pos;
    }

    add(element: IStroke | IStroke[]): StrokeGroup {
        this.group.add(element);
        if (Array.isArray(element)) {
            element.forEach(element => element.setParent(this));
        } else {
            element.setParent(this);
        }

        return this;
    }

    public setPos(pos: Position) {
        this.pos = pos;
    }

    public getPos(context: CanvasRenderingContext2D, parentOffset: IPos = {
        x: 0,
        y: 0,
    }): IPos {

        if (this.parent) {
            return this.parent.getPos(context, getPos(this.pos, context));
        }

        return getPos(this.pos, context, parentOffset);
    }

    protected doDraw(context: CanvasRenderingContext2D) {
        this.group.draw(context);
    }
}
