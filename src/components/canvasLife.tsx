import * as React from "react";
import { IDrawable } from "../graphlib";
import { useEffect } from "react";

export interface ICanvasLife {
    context: CanvasRenderingContext2D | null
    drawable: IDrawable;
}


export const CanvasLife: React.FC<ICanvasLife> = ({ context, drawable }) => {
    useEffect(() => {
        if (!context) {
            return;
        }

        let frameId: number;

        const render = () => {
            if (context === null) {
                return;
            }

            const { canvas: { width, height } } = context;

            context.clearRect(0, 0, width, height);
            drawable.draw(context);

            frameId = window.requestAnimationFrame(render);
        };

        render();
        return () => window.cancelAnimationFrame(frameId);

    }, [drawable, context]);
    return null;
};
