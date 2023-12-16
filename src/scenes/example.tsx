import {
    Circle,
    Knot,
    Latex,
    Line,
    Node,
    Txt,
    makeScene2D,
} from "@motion-canvas/2d";
import {
    Direction,
    all,
    createRef,
    createRefArray,
    createSignal,
    sequence,
    slideTransition,
    waitUntil,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
    const steps = createRefArray<Latex>();

    view.add(
        <Node>
            <Latex
                tex="{\color{white} \text{if } \cos \theta=-\frac{1}{2}, 0 \degree < \theta < 360 \degree, \text{find all values of } \theta}"
                height={141}
                ref={steps}
            />
            <Latex
                tex="{\color{white} \cos RAA=\frac{1}{2}}"
                height={141}
                opacity={0}
                ref={steps}
            />
            <Latex
                tex="{\color{white} RAA=\cos^{-1} \left( \frac{1}{2} \right)}"
                height={141}
                opacity={0}
                ref={steps}
            />
            <Latex
                tex="{\color{white} RAA=60 \degree}"
                height={70.5}
                opacity={0}
                ref={steps}
            />
            <Latex
                tex="{\color{white} \theta \in \{120\degree, 240\degree\}}"
                height={70.5}
                opacity={0}
                ref={steps}
            />
        </Node>
    );

    const castShape = createRef<Node>();
    const cast = createRefArray<Txt>();

    view.add(
        <Node x={0} y={540 / 2} opacity={0} ref={castShape}>
            <Circle stroke={"white"} size={300} lineWidth={5} />
            <Line
                points={[
                    [0, -150],
                    [0, 150],
                ]}
                stroke={"white"}
                lineWidth={5}
            />
            <Line
                points={[
                    [-150, 0],
                    [150, 0],
                ]}
                stroke={"white"}
                lineWidth={5}
            />

            <Txt ref={cast} x={75} y={-75} fill={"white"}>
                A
            </Txt>
            <Txt ref={cast} x={-75} y={-75} fill={"white"}>
                S
            </Txt>
            <Txt ref={cast} x={-75} y={75} fill={"white"}>
                T
            </Txt>
            <Txt ref={cast} x={75} y={75} fill={"white"}>
                C
            </Txt>
        </Node>
    );

    const axes1 = createRef<Node>();
    const axes2 = createRef<Node>();
    const lineTerminal1 = createRef<Line>();
    const lineTerminal2 = createRef<Line>();
    const RAA1 = createRef<Circle>();
    const angle1 = createRef<Circle>();
    const RAA2 = createRef<Circle>();
    const angle2 = createRef<Circle>();
    const RAA1Label = createRef<Txt>();
    const angle1Label = createRef<Txt>();
    const RAA2Label = createRef<Txt>();
    const angle2Label = createRef<Txt>();

    view.add(
        <>
            <Node x={0} y={540 / 2} opacity={0} ref={axes1}>
                <Line
                    points={[
                        [0, -150],
                        [0, 150],
                    ]}
                    stroke={"white"}
                    lineWidth={5}
                />
                <Line
                    points={[
                        [-150, 0],
                        [150, 0],
                    ]}
                    stroke={"white"}
                    lineWidth={5}
                />

                <Line
                    stroke={"white"}
                    lineWidth={5}
                    end={0}
                    endArrow
                    arrowSize={15}
                    ref={lineTerminal1}
                >
                    <Knot position={[0, 0]} />
                    <Knot
                        position={[
                            140 * Math.cos((120 / 180) * Math.PI),
                            -140 * Math.sin((120 / 180) * Math.PI),
                        ]}
                    />
                </Line>

                <Circle
                    stroke={"white"}
                    size={100}
                    lineWidth={5}
                    endAngle={0}
                    startAngle={0}
                    ref={angle1}
                />
                <Txt
                    fill={"white"}
                    text={() =>
                        (
                            Math.round(
                                Math.abs(
                                    angle1().startAngle() - angle1().endAngle()
                                ) * 100
                            ) / 100
                        ).toString() + "°"
                    }
                    position={() => {
                        const avg =
                            (angle1().endAngle() - angle1().startAngle()) / 2;
                        return [
                            angle1().size().x * Math.cos((avg / 180) * Math.PI),
                            -angle1().size().y *
                                Math.sin((avg / 180) * Math.PI),
                        ];
                    }}
                    opacity={0}
                    ref={angle1Label}
                />

                <Circle
                    stroke={"white"}
                    size={80}
                    lineWidth={5}
                    startAngle={-120}
                    endAngle={-120}
                    ref={RAA1}
                />
                <Txt
                    fill={"white"}
                    text={() =>
                        (
                            Math.round(
                                Math.abs(
                                    RAA1().startAngle() - RAA1().endAngle()
                                ) * 100
                            ) / 100
                        ).toString() + "°"
                    }
                    position={() => {
                        const avg =
                            (RAA1().endAngle() - RAA1().startAngle()) / 2;
                        return [
                            -RAA1().size().x * Math.cos((avg / 180) * Math.PI),
                            -RAA1().size().y * Math.sin((avg / 180) * Math.PI),
                        ];
                    }}
                    opacity={0}
                    ref={RAA1Label}
                />
            </Node>
            <Node x={0} y={540 / 2} opacity={0} ref={axes2}>
                <Line
                    points={[
                        [0, -150],
                        [0, 150],
                    ]}
                    stroke={"white"}
                    lineWidth={5}
                />
                <Line
                    points={[
                        [-150, 0],
                        [150, 0],
                    ]}
                    stroke={"white"}
                    lineWidth={5}
                />
                <Line
                    stroke={"white"}
                    lineWidth={5}
                    end={0}
                    endArrow
                    arrowSize={15}
                    ref={lineTerminal2}
                >
                    <Knot position={[0, 0]} />
                    <Knot
                        position={[
                            140 * Math.cos((240 / 180) * Math.PI),
                            -140 * Math.sin((240 / 180) * Math.PI),
                        ]}
                    />
                </Line>

                <Circle
                    stroke={"white"}
                    size={100}
                    lineWidth={5}
                    startAngle={0}
                    endAngle={0}
                    ref={angle2}
                />
                <Txt
                    fill={"white"}
                    text={() =>
                        (
                            Math.round(
                                Math.abs(
                                    angle2().startAngle() - angle2().endAngle()
                                ) * 100
                            ) / 100
                        ).toString() + "°"
                    }
                    position={() => {
                        const avg =
                            (angle2().endAngle() - angle2().startAngle()) / 2;
                        return [
                            angle2().size().x * Math.cos((avg / 180) * Math.PI),
                            -angle2().size().y *
                                Math.sin((avg / 180) * Math.PI),
                        ];
                    }}
                    opacity={0}
                    ref={angle2Label}
                />
                <Circle
                    stroke={"white"}
                    size={80}
                    lineWidth={5}
                    startAngle={-240}
                    endAngle={-240}
                    ref={RAA2}
                />
                <Txt
                    fill={"white"}
                    text={() =>
                        (
                            Math.round(
                                Math.abs(
                                    RAA2().startAngle() - RAA2().endAngle()
                                ) * 100
                            ) / 100
                        ).toString() + "°"
                    }
                    position={() => {
                        const avg =
                            (RAA2().endAngle() - RAA2().startAngle()) / 2;
                        return [
                            -RAA2().size().x * Math.cos((avg / 180) * Math.PI),
                            RAA2().size().y * Math.sin((avg / 180) * Math.PI),
                        ];
                    }}
                    opacity={0}
                    ref={RAA2Label}
                />
            </Node>
        </>
    );

    yield* slideTransition(Direction.Left);
    yield* waitUntil("RAAPositive");
    yield* sequence(
        0.5,
        steps[0].position([0, -150], 1),
        castShape().opacity(1, 1),
        cast[0].scale(1.25, 0.5),
        cast[0].fontWeight(5000, 0.5)
    );
    yield* waitUntil("RAA");
    yield* sequence(
        0.5,
        all(
            castShape().opacity(0, 1),
            cast[0].scale(1, 1),
            cast[0].fontWeight(400, 1)
        ),
        steps[1].opacity(1, 1)
    );
    yield* waitUntil("calc");
    yield* sequence(
        1,
        all(steps[0].y(-300, 1), steps[1].y(-150, 1), steps[2].opacity(1, 1)),
        all(
            steps[0].y(-450, 1),
            steps[1].y(-300, 1),
            steps[2].y(-150, 1),
            steps[3].opacity(1, 1)
        )
    );
    yield* waitUntil("quads");
    yield* sequence(
        0.5,
        steps[0].fill("red", 1),
        all(
            castShape().opacity(1, 1),
            cast[1].scale(1.25, 1),
            cast[1].fontWeight(5000, 1),
            cast[1].fill("red", 1),
            cast[2].scale(1.25, 1),
            cast[2].fontWeight(5000, 1),
            cast[2].fill("red", 1)
        )
    );
    yield* waitUntil("axes");
    yield* sequence(
        1,
        all(steps[0].fill(0, 1), castShape().opacity(0, 1)),
        all(
            axes1().opacity(1, 1),
            axes2().opacity(1, 1),
            axes1().x(540 / 3, 1),
            axes2().x(-540 / 3, 1)
        ),
        all(lineTerminal1().end(1, 1), lineTerminal2().end(1, 1)),
        all(
            angle1().startAngle(-120, 2),
            RAA1().startAngle(-180, 2),
            angle2().startAngle(-240, 2),
            RAA2().endAngle(-180, 2),
            angle1Label().opacity(1, 1),
            RAA1Label().opacity(1, 1),
            angle2Label().opacity(1, 1),
            RAA2Label().opacity(1, 1)
        )
    );
    yield* waitUntil("e");
    yield* all(
        ...steps.map((x) => x.opacity(0, 1)),
        steps[4].opacity(1, 1),
        axes1().opacity(0, 1),
        axes2().opacity(0, 1)
    );
    yield* waitUntil("end");
});
