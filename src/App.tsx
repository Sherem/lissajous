import React from "react";
import "./App.css";
import { Canvas } from "./components/canvas";
import { CanvasLife } from "./components/canvasLife";
import { IDrawable } from "./graphlib";
import { movingModel } from "./graphModels/movingModel";

function App() {
    const element: IDrawable = movingModel();

    return (
        <div className="App">
            <Canvas>{(context) =>
                <CanvasLife context={context} drawable={element} />
            }</Canvas>
        </div>
    );
}

export default App;
