import { Group } from "./group";
import { StrokeOptions, IStroke } from "./graphlib.interfaces";
import { Stroke } from "./stroke";

export class StrokeGroup extends Stroke {
    private group: Group = new Group();

    public constructor(strokeOptions?: StrokeOptions) {
        super(strokeOptions);
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

    protected doDraw(context: CanvasRenderingContext2D) {
        this.group.draw(context);
    }
}
