import React from "react";
import "./App.css";
import { Canvas } from "./components/canvas";
import { CanvasLife } from "./components/canvasLife";
import { IDrawable } from "./graphlib";
import { Line } from "./graphlib/line";
import { StrokeGroup } from "./graphlib/strokeGroup";

function App() {
    const element: IDrawable = new StrokeGroup({ strokeStyle: "red", lineWidth:1 }).add(new Line({
        x: 10,
        y: 10,
    }, {
        x: 100,
        y: 100,
    })).add(new Line({
        x: 10,
        y: 100,
    }, {
        x: 100,
        y: 10,
    }));

    return (
        <div className="App">
            <Canvas>{(context) =>
                <CanvasLife context={context} drawable={element} />
            }</Canvas>
        </div>
    );
}

export default App;
