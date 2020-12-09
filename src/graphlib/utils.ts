import { IPos, Position, Size } from "./graphlib.interfaces";

export function shift(...pos: IPos[]): IPos {
    return pos.reduce((res, { x, y }) => ({
        x: res.x + x,
        y: res.y + y,
    }), {
        x: 0,
        y: 0,
    });
}

export function getPos(pos: Position, context: CanvasRenderingContext2D, offset: IPos = {
    x: 0,
    y: 0,
}): IPos {
    if (typeof pos === "function") {
        return shift(pos(context), offset);
    } else {
        return shift(pos, offset);
    }
}

export function getSize(size: Size, context: CanvasRenderingContext2D): number {
    if (typeof size === "function") {
        return size(context);
    } else {
        return size;
    }
}
