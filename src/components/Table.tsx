import {
    ComponentChild,
    CurveProps,
    Line,
    Shape,
    ShapeProps,
    signal,
} from "@motion-canvas/2d";
import { SignalValue, SimpleSignal } from "@motion-canvas/core";

export interface TableProps extends ShapeProps, CurveProps {
    rows: SignalValue<number>;
    columns: SignalValue<number>;
    start: SignalValue<number>;
    end: SignalValue<number>;
}

export class Table extends Shape {
    @signal()
    public declare readonly rows: SimpleSignal<number, this>;

    @signal()
    public declare readonly columns: SimpleSignal<number, this>;

    @signal()
    public declare readonly start: SimpleSignal<number, this>;

    @signal()
    public declare readonly end: SimpleSignal<number, this>;

    public constructor(props?: TableProps) {
        super({ ...props, children: null });

        for (let [i, child] of (props.children as ComponentChild[]).entries()) {
            if (child instanceof Shape) {
                child.x(
                    (((i % this.columns()) + 0.5) * this.width()) /
                        this.columns() -
                        this.width() / 2
                );
                child.y(
                    ((Math.ceil((i + 1) / this.columns()) - 0.5) *
                        this.height()) /
                        this.rows() -
                        this.height() / 2
                );
                console.log(child.x(), child.y());
            }
        }
        this.add(props.children);

        for (let i = 0; i <= this.columns(); i++) {
            this.add(
                <Line
                    stroke={this.stroke()}
                    lineWidth={this.lineWidth()}
                    start={() => this.start()}
                    end={() => this.end()}
                    points={[
                        [
                            this.x() -
                                this.width() / 2 +
                                (i * this.width()) / this.columns(),
                            this.y() - this.height() / 2,
                        ],
                        [
                            this.x() -
                                this.width() / 2 +
                                (i * this.width()) / this.columns(),
                            this.y() + this.height() / 2,
                        ],
                    ]}
                />
            );
        }

        for (let i = 0; i <= this.rows(); i++) {
            this.add(
                <Line
                    stroke={this.stroke()}
                    lineWidth={this.lineWidth()}
                    start={() => this.start()}
                    end={() => this.end()}
                    points={[
                        [
                            this.x() - this.width() / 2,
                            this.y() -
                                this.height() / 2 +
                                (i * this.height()) / this.rows(),
                        ],
                        [
                            this.x() + this.width() / 2,
                            this.y() -
                                this.height() / 2 +
                                (i * this.height()) / this.rows(),
                        ],
                    ]}
                />
            );
        }
    }
}
