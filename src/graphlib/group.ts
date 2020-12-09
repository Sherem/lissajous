import { IDrawable, IGroup } from "./graphlib.interfaces";

export class Group implements IGroup {
    private elements: IDrawable[] = [];
    add(element: IDrawable | IDrawable[]): IGroup {
        if (Array.isArray(element)) {
            this.elements = [...this.elements, ...element];
            return this;
        }
        this.elements.push(element);
        return this;
    }

    draw(context: CanvasRenderingContext2D): void {
        this.elements.forEach(element=>element.draw(context));
    }
}
