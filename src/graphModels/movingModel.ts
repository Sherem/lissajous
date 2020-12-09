import { IBoundaries, IDrawable, IPos, IPositionable } from "../graphlib";
import { StrokeGroup } from "../graphlib/strokeGroup";
import { Line } from "../graphlib/line";
import { Circle } from "../graphlib/circle";

export function movingModel(): IDrawable {
    const shape1 = new StrokeGroup({
        strokeStyle: "red",
        lineWidth: 1,
    }).add(new Line({
        x: 0,
        y: 0,
    }, {
        x: 300,
        y: 0,
    })).add(new Line({
        x: 300,
        y: 0,
    }, {
        x: 300,
        y: 300,
    })).add(new Line({
        x: 300,
        y: 300,
    }, {
        x: 0,
        y: 300,
    })).add(new Line({
        x: 0,
        y: 300,
    }, {
        x: 0,
        y: 0,
    }));


    const shape2 = new StrokeGroup({
        strokeStyle: "red",
        lineWidth: 1,
    }).add(new Line({
        x: 0,
        y: 0,
    }, {
        x: 60,
        y: 0,
    })).add(new Line({
        x: 60,
        y: 0,
    }, {
        x: 60,
        y: 60,
    })).add(new Line({
        x: 60,
        y: 60,
    }, {
        x: 0,
        y: 60,
    })).add(new Line({
        x: 0,
        y: 60,
    }, {
        x: 0,
        y: 0,
    }));

    const circle1 = new Circle({
        x: 0,
        y: 0,
    }, 5);

    const circle2 = new Circle({
        x: 0,
        y: 0,
    }, 8);

    shape2.add([circle1, circle2]);

    shape1.add(shape2);

    bounceModel({
            shape: shape1,
            boundaries: {
                width: 300,
                height: 300,
            },
            sy: 100 / 1000,
            sx: 100 / 1000,
            initialPos: {
                x: 0,
                y: 0,
            },
        },
    );


    bounceModel({
            shape: shape2,
            boundaries: {
                width: 60,
                height: 60,
            },
            fieldSize: {
                width: 300,
                height: 300,
            },
            sy: 70 / 1000,
            sx: 70 / 1000,
            initialPos: {
                x: 0,
                y: 100,
            },
        },
    );


    bounceModel({
            shape: circle1,
            boundaries: {
                width: 10,
                height: 10,
            },
            fieldSize: {
                width: 60,
                height: 60,
            },
            sy: 50 / 1000,
            sx: 40 / 1000,
            initialPos: {
                x: 8,
                y: 0,
            },
        },
    );


    bounceModel({
            shape: circle2,
            boundaries: {
                width: 16,
                height: 16,
            },
            fieldSize: {
                width: 60,
                height: 60,
            },
            sy: 140 / 1000,
            sx: 150 / 1000,
            initialPos: {
                x: 8,
                y: 18,
            },
        },
    );

    return shape1;
}

function mover(initial: number, getSpeed: () => number) {
    let time = Date.now();
    let pos = initial;
    return (): number => {
        const now = Date.now();
        const timeOffset = now - time;
        time = now;
        const offset = (timeOffset * getSpeed());

        pos += offset;
        return pos;
    };
}


interface IBounceModel {
    initialPos: IPos;
    sx: number;
    sy: number;
    fieldSize?: IBoundaries;
    boundaries: IBoundaries;
    shape: IPositionable;
}

function bounceModel({ shape, initialPos, sx, sy, fieldSize, boundaries }: IBounceModel) {

    let speedX = sx;
    let speedY = sy;

    const moverX = mover(initialPos.x, () => speedX);
    const moverY = mover(initialPos.y, () => speedY);

    function getPos(context: CanvasRenderingContext2D): IPos {
        const x = moverX();
        let w;
        let h;
        if (!fieldSize) {
            let { canvas: { width, height } } = context;
            w = width;
            h = height;
        } else {
            w = fieldSize.width;
            h = fieldSize.height;
        }

        if (x > w - boundaries.width) {
            speedX = -sx;
        } else if (x <= 0) {
            speedX = sx;
        }
        const y = moverY();
        if (y > h - boundaries.height) {
            speedY = -sy;
        } else if (y <= 0) {
            speedY = sy;
        }

        return {
            x,
            y,
        };
    }

    shape.setPos(getPos);
}

