'use client';

import React, { PureComponent, ReactNode } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

interface ChartProps {
    data: Array<{ [key: string]: any }>;
    singleCurrencyMode?: boolean;
}

const CustomLegend = ({ payload }: any) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, color: '#fff' }}>
            {payload?.map((entry: any, index: number) => (
                <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            backgroundColor: entry.color,
                            borderRadius: '50%',
                        }}
                    />
                    <span>{entry.value}</span>
                </div>
            ))}
        </div>
    );
};

export default class Chart extends PureComponent<ChartProps> {
    render(): ReactNode {
        const { data, singleCurrencyMode = false } = this.props;

        if (singleCurrencyMode) {
            return (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={data}
                        margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
                    >
                        <XAxis dataKey="name" tick={{ fill: "#ccc", fontSize: 12 }} />
                        <YAxis
                            domain={[
                                (dataMin: number) => (dataMin > 0 ? dataMin * 0.95 : dataMin - 1),
                                (dataMax: number) => dataMax * 1.05,
                            ]}
                            tickFormatter={(value: number) => value.toFixed(2)}
                            tick={{ fill: "#ccc", fontSize: 12 }}
                        />
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (active && payload?.length) {
                                    return (
                                        <div
                                            style={{
                                                background: '#1A2E40',
                                                border: '1px solid #333',
                                                padding: 10,
                                                borderRadius: 8,
                                                color: 'white',
                                            }}
                                        >
                                            <p><strong>{label}</strong></p>
                                            <p>Bid: {payload[0].value.toFixed(4)}</p>
                                            <p>Ask: {payload[1].value.toFixed(4)}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        <Line type="monotone" dataKey="bid" stroke="#8884d8" dot={false} strokeWidth={2} />
                        <Line type="monotone" dataKey="ask" stroke="#82ca9d" dot={false} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            );
        }

        const lineKeys = data.length > 0
            ? Object.keys(data[0]).filter(key => key !== 'date' && key !== 'name')
            : [];

        const colors = ["#8884d8", "#82ca9d", "#ff7300", "#ff4c4c"];

        return (
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 40, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="date" tick={{ fill: "#ccc", fontSize: 12 }} />
                    <YAxis
                        domain={[
                            (dataMin: number) => (dataMin > 0 ? dataMin * 0.95 : dataMin - 1),
                            (dataMax: number) => dataMax * 1.05,
                        ]}
                        tickFormatter={(value: number) => value.toFixed(2)}
                        tick={{ fill: "#ccc", fontSize: 12 }}
                    />
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (active && payload?.length) {
                                return (
                                    <div
                                        style={{
                                            background: '#1A2E40',
                                            border: '1px solid #333',
                                            padding: 10,
                                            borderRadius: 8,
                                            color: 'white',
                                        }}
                                    >
                                        <p><strong>{label}</strong></p>
                                        {payload.map((entry: any, i: number) => (
                                            <p key={i}>{entry.name}: {entry.value?.toFixed(4)}</p>
                                        ))}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend content={<CustomLegend />} />
                    {lineKeys.map((key, index) => (
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={colors[index % colors.length]}
                            dot={false}
                            strokeWidth={2}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        );
    }
}
