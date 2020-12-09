import * as React from "react";
import { useEffect, useRef, useState } from "react";

const style = require("./canvas.module.css");

export interface ICanvas {
    children: (context: CanvasRenderingContext2D | null) => React.ReactNode;
}

export const Canvas: React.FC<ICanvas> = ({ children }: ICanvas) => {
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const div = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (context && div.current) {
            const { height, width } = getComputedStyle(div.current);

            // const dpr = window.devicePixelRatio || 1;
            const dpr =  1;

            const { canvas } = context;
            canvas.width = parseInt(width) * dpr;
            canvas.height = parseInt(height) * dpr;

            // context.scale(dpr, dpr);
        }
    }, [context]);

    const setCanvas = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) {
            return;
        }
        setContext(canvas.getContext("2d"));
    };
    return <div className={style.canvasContainer} ref={div}>
        <canvas className={style.canvas} ref={setCanvas}>{children(context)}</canvas>
    </div>;
};
