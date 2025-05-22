'use client';

import React, { PureComponent } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface ChartProps {
    data: Array<{
        name: string;
        bid: number;
        ask: number;
    }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: '#1A2E40',
                border: '1px solid #333',
                padding: '10px',
                borderRadius: '8px',
                color: 'white'
            }}>
                <p style={{ margin: 0 }}><strong>{label}</strong></p>
                <p style={{ margin: 0 }}>Bid: {payload[0].value.toFixed(4)}</p>
                <p style={{ margin: 0 }}>Ask: {payload[1].value.toFixed(4)}</p>
            </div>
        );
    }
    return null;
};

export default class Chart extends PureComponent<ChartProps> {
    render() {
        return (
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={this.props.data}
                    margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
                >
                    <XAxis
                        dataKey="name"
                        tick={{ fill: "#ccc", fontSize: 12 }}
                    />
                    <YAxis
                        domain={[
                            (dataMin) => (dataMin > 0 ? dataMin * 0.95 : dataMin - 1),
                            (dataMax) => dataMax * 1.05
                        ]}
                        tickFormatter={(value) => value.toFixed(1)}
                        tick={{ fill: "#ccc", fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="bid"
                        stroke="#8884d8"
                        dot={false}
                        strokeWidth={2}
                        isAnimationActive={true}
                        animationDuration={800}
                        animationBegin={0}
                        animationEasing="ease-in-out"
                    />
                    <Line
                        type="monotone"
                        dataKey="ask"
                        stroke="#82ca9d"
                        dot={false}
                        strokeWidth={2}
                        isAnimationActive={true}
                        animationDuration={800}
                        animationBegin={0}
                        animationEasing="ease-in-out"
                    />
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
