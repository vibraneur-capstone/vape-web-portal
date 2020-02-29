import React from 'react';
import Plot from 'react-plotly.js';

export default class RULDisplay extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div>
                RUL Display
                <Plot style={{ width: '100%', height: '100%' }}
                data={[{
                    x: [1, 2, 3, 4],
                    y: [10, 15, 13, 17],
                    type: 'scatter'
                }]}
                layout={{ autosize: true, showlegend: false, margin: { l: 10, r: 10, b: 10, t: 10 } }}

            ></Plot>
            </div>
        )
    }
}