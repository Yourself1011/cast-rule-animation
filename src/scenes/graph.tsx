import { LinePlot, Plot } from "@hhenrichsen/motion-canvas-graphing";
import { Circle, Line, Rect, makeScene2D } from "@motion-canvas/2d";
import {
    all,
    createRef,
    map,
    range,
    sequence,
    tween,
    waitUntil,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const plot = createRef<Plot>();
    const linePlot = createRef<LinePlot>();

    view.add(
        <Plot
            clip
            size={600}
            ref={plot}
            tickLabelSize={24}
            minX={0}
            maxX={360}
            minY={-2}
            maxY={2}
            opacity={1}
            ticks={[4, 4]}
        >
            <LinePlot
                lineWidth={4}
                stroke={"lightblue"}
                end={0}
                ref={linePlot}
            />
        </Plot>
    );

    linePlot().data(
        plot().makeGraphData(0.1, (x) => Math.sin((x / 180) * Math.PI))
    );

    yield* linePlot().end(1, 1);
    yield* waitUntil("invSin");
    yield* linePlot().end(0, 1);
    yield* all(plot().min([-2, 0], 1), plot().max([2, 360], 1));
    yield* all(
        linePlot().data(
            range(0, 360, 0.1).map((y) => [Math.sin((y / 180) * Math.PI), y]),
            1
        ),
        linePlot().end(1, 1)
    );
    yield* waitUntil("problem");

    const issueLine = createRef<Line>();
    const circle1 = createRef<Circle>();
    const circle2 = createRef<Circle>();
    view.add(
        <>
            <Line
                ref={issueLine}
                points={[
                    [75, 300],
                    [75, -300],
                ]}
                lineWidth={4}
                end={0}
                stroke={"pink"}
            />

            <Circle
                x={75}
                y={250}
                size={20}
                fill={"red"}
                opacity={0}
                ref={circle1}
            />
            <Circle
                x={75}
                y={50}
                size={20}
                fill={"red"}
                opacity={0}
                ref={circle2}
            />
        </>
    );

    yield* sequence(
        0.5,
        issueLine().end(1, 1),
        circle1().opacity(1, 1),
        circle2().opacity(1, 1)
    );
    yield* waitUntil("fix");
    yield* sequence(
        0.5,
        circle2().opacity(0, 1),
        circle1().opacity(0, 1),
        issueLine().end(0, 1),
        linePlot().end(0.25, 1)
    );
    yield* waitUntil("negProblem");

    const rect = createRef<Rect>();
    view.add(
        <Rect
            ref={rect}
            opacity={0}
            bottomLeft={[-150, 300]}
            width={150}
            height={600}
            fill={"red"}
        />
    );
    yield* tween(1, (value) => {
        rect().opacity((Math.sin(map(0, 2.5 * Math.PI, value)) + 1) * 0.25);
    });
    yield* waitUntil("tableScene");
});
