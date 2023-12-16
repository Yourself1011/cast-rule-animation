import { Circle, Knot, Line, Node, Txt, makeScene2D } from "@motion-canvas/2d";
import {
    Direction,
    all,
    createRef,
    createRefArray,
    sequence,
    slideTransition,
    waitUntil,
} from "@motion-canvas/core";
import { Table } from "../components/Table";

export default makeScene2D(function* (view) {
    const table = createRef<Table>();
    const row1 = createRefArray<Txt>();
    const row2 = createRefArray<Txt>();
    const row3 = createRefArray<Txt>();
    const row4 = createRefArray<Txt>();
    const row5 = createRefArray<Txt>();

    view.add(
        <Table
            ref={table}
            stroke={"white"}
            width={"50%"}
            height={"50%"}
            lineWidth={5}
            rows={5}
            columns={4}
            start={0}
            end={0}
        >
            <></>
            <Txt fill={"white"} ref={row1} opacity={0}>
                Sine
            </Txt>
            <Txt fill={"white"} ref={row1} opacity={0}>
                Cosine
            </Txt>
            <Txt fill={"white"} ref={row1} opacity={0}>
                Tangent
            </Txt>
            <Txt fill={"white"} ref={row2} opacity={0}>
                35°
            </Txt>
            <Txt fill={"white"} ref={row2} opacity={0}>
                +0.5736
            </Txt>
            <Txt fill={"white"} ref={row2} opacity={0}>
                +0.8192
            </Txt>
            <Txt fill={"white"} ref={row2} opacity={0}>
                +0.7002
            </Txt>
            <Txt fill={"white"} ref={row3} opacity={0}>
                145°
            </Txt>
            <Txt fill={"white"} ref={row3} opacity={0}>
                +0.5736
            </Txt>
            <Txt fill={"white"} ref={row3} opacity={0}>
                -0.8192
            </Txt>
            <Txt fill={"white"} ref={row3} opacity={0}>
                -0.7002
            </Txt>
            <Txt fill={"white"} ref={row4} opacity={0}>
                215°
            </Txt>
            <Txt fill={"white"} ref={row4} opacity={0}>
                -0.5736
            </Txt>
            <Txt fill={"white"} ref={row4} opacity={0}>
                -0.8192
            </Txt>
            <Txt fill={"white"} ref={row4} opacity={0}>
                +0.7002
            </Txt>
            <Txt fill={"white"} ref={row5} opacity={0}>
                330°
            </Txt>
            <Txt fill={"white"} ref={row5} opacity={0}>
                -0.5736
            </Txt>
            <Txt fill={"white"} ref={row5} opacity={0}>
                +0.8192
            </Txt>
            <Txt fill={"white"} ref={row5} opacity={0}>
                -0.7002
            </Txt>
        </Table>
    );

    const circle = createRef<Circle>();
    const lineH = createRef<Line>();
    const lineV = createRef<Line>();
    const lineTerminal = createRef<Line>();
    const knotTerminal = createRef<Knot>();
    const cast = createRefArray<Txt>();
    const castShape = createRef<Node>();

    view.add(
        <Node x={(-960 * 3) / 4} y={-540 / 2} ref={castShape}>
            <Circle
                stroke={"white"}
                size={300}
                lineWidth={5}
                end={0}
                ref={circle}
            />
            <Line
                points={[
                    [0, -150],
                    [0, 150],
                ]}
                stroke={"white"}
                lineWidth={5}
                end={0}
                ref={lineH}
            />
            <Line
                points={[
                    [-150, 0],
                    [150, 0],
                ]}
                stroke={"white"}
                lineWidth={5}
                end={0}
                ref={lineV}
            />
            <Line
                stroke={"white"}
                lineWidth={5}
                end={0}
                endArrow
                arrowSize={15}
                ref={lineTerminal}
            >
                <Knot position={[0, 0]} />
                <Knot
                    position={[
                        140 * Math.cos((35 / 180) * Math.PI),
                        -140 * Math.sin((35 / 180) * Math.PI),
                    ]}
                    ref={knotTerminal}
                />
            </Line>

            <Txt ref={cast} opacity={0} x={75} y={-75} fill={"white"}>
                A
            </Txt>
            <Txt ref={cast} opacity={0} x={-75} y={-75} fill={"white"}>
                S
            </Txt>
            <Txt ref={cast} opacity={0} x={-75} y={75} fill={"white"}>
                T
            </Txt>
            <Txt ref={cast} opacity={0} x={75} y={75} fill={"white"}>
                C
            </Txt>
        </Node>
    );

    yield* slideTransition(Direction.Left);
    yield* table().end(1, 1);
    yield* sequence(0.1, ...row1.map((x) => x.opacity(1, 1)));
    yield* all(circle().end(1, 2), lineH().end(1, 2), lineV().end(1, 2));
    yield* waitUntil("values1");
    yield* lineTerminal().end(1, 1);
    yield* sequence(0.5, ...row2.map((x) => x.opacity(1, 1)));
    yield* waitUntil("values2");
    yield* knotTerminal().position(
        [
            140 * Math.cos((145 / 180) * Math.PI),
            -140 * Math.sin((145 / 180) * Math.PI),
        ],
        1
    );
    yield* sequence(0.5, ...row3.map((x) => x.opacity(1, 1)));
    yield* waitUntil("values3");
    yield* knotTerminal().position(
        [
            140 * Math.cos((215 / 180) * Math.PI),
            -140 * Math.sin((215 / 180) * Math.PI),
        ],
        1
    );
    yield* sequence(0.5, ...row4.map((x) => x.opacity(1, 1)));
    yield* waitUntil("values4");
    yield* knotTerminal().position(
        [
            140 * Math.cos((325 / 180) * Math.PI),
            -140 * Math.sin((325 / 180) * Math.PI),
        ],
        1
    );
    yield* sequence(0.5, ...row5.map((x) => x.opacity(1, 1)));
    yield* waitUntil("negs");
    yield* all(
        ...row2.map((x, i) => {
            if (i == 0) return;
            return all(x.text("+", 1), x.fill("green", 1));
        }),
        ...row3.map((x, i) => {
            if (i == 0) return;
            return i == 1
                ? all(x.text("+", 1), x.fill("green", 1))
                : all(x.text("-", 1), x.fill("red", 1));
        }),
        ...row4.map((x, i) => {
            if (i == 0) return;
            return i == 3
                ? all(x.text("+", 1), x.fill("green", 1))
                : all(x.text("-", 1), x.fill("red", 1));
        }),
        ...row5.map((x, i) => {
            if (i == 0) return;
            return i == 2
                ? all(x.text("+", 1), x.fill("green", 1))
                : all(x.text("-", 1), x.fill("red", 1));
        })
    );
    yield* waitUntil("quad1");
    yield* all(
        knotTerminal().position(
            [
                140 * Math.cos((35 / 180) * Math.PI),
                -140 * Math.sin((35 / 180) * Math.PI),
            ],
            1
        ),
        ...row2.map((x) => all(x.fontWeight(5000, 1), x.scale(1.25, 1))),
        cast[0].opacity(1, 1)
    );
    yield* waitUntil("quad2");
    yield* all(
        knotTerminal().position(
            [
                140 * Math.cos((145 / 180) * Math.PI),
                -140 * Math.sin((145 / 180) * Math.PI),
            ],
            1
        ),
        ...row2.map((x) => all(x.fontWeight(100, 1), x.scale(1, 1))),
        ...row3.map((x) => all(x.fontWeight(5000, 1), x.scale(1.25, 1))),
        cast[1].opacity(1, 1)
    );
    yield* waitUntil("quad3");
    yield* all(
        knotTerminal().position(
            [
                140 * Math.cos((215 / 180) * Math.PI),
                -140 * Math.sin((215 / 180) * Math.PI),
            ],
            1
        ),
        ...row3.map((x) => all(x.fontWeight(100, 1), x.scale(1, 1))),
        ...row4.map((x) => all(x.fontWeight(5000, 1), x.scale(1.25, 1))),
        cast[2].opacity(1, 1)
    );
    yield* waitUntil("quad4");
    yield* all(
        knotTerminal().position(
            [
                140 * Math.cos((325 / 180) * Math.PI),
                -140 * Math.sin((325 / 180) * Math.PI),
            ],
            1
        ),
        ...row4.map((x) => all(x.fontWeight(100, 1), x.scale(1, 1))),
        ...row5.map((x) => all(x.fontWeight(5000, 1), x.scale(1.25, 1))),
        cast[3].opacity(1, 1)
    );
    yield* waitUntil("cast");
    yield* all(
        table().end(0, 1),
        ...table()
            .children()
            .map((x) => x.opacity(0, 1)),
        lineTerminal().end(0, 1),
        castShape().position([0, 0], 1),
        castShape().scale(2, 1)
    );
    yield* waitUntil("exampleScene");
});
