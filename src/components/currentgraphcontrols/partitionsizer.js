import React from 'react';
import PropTypes from 'prop-types';
import { Range } from 'rc-slider';

import 'rc-slider/assets/index.css';

function indexesToSizes(indexes) {
    const sizes = [];
    let lastVal = 0;
    for (let i = 0; i < indexes.length; i += 1) {
        sizes.push(indexes[i] - lastVal);
        lastVal = indexes[i];
    }
    return sizes;
}

class PartitionSizer extends React.Component {
    constructor() {
        super();
        this.state = {
            defaultVals: [],
        };
    }

    componentWillMount() {
        this.setDefaultVals(this.props.size, this.props.partitions, this.props.callback);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.partitions !== this.props.partitions) {
            this.setDefaultVals(nextProps.size, nextProps.partitions, nextProps.callback);
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.partitions !== nextProps.partitions;
    }

    setDefaultVals(size, partitions, callback) {
        const defaultVals = [];
        const partitionSize = Math.floor(size / partitions);
        for (let i = 0; i < partitions; i += 1) {
            defaultVals.push(partitionSize);
        }
        if (size - defaultVals.reduce((a, b) => a + b, 0) > 0) {
            let remaining = size - defaultVals.reduce((a, b) => a + b, 0);
            let j = 0;
            while (remaining > 0) {
                defaultVals[j] += 1;
                remaining -= 1;
                j += 1;
            }
        }
        let sum = 0;
        for (let i = 0; i < defaultVals.length; i += 1) {
            sum += defaultVals[i];
            defaultVals[i] = sum;
        }
        callback(defaultVals, indexesToSizes(defaultVals));
        this.setState({ defaultVals });
    }

    render() {
        const handleStyles = [];
        const railStyles = [];
        let b = 255;
        for (let i = 0; i < this.props.partitions - 1; i += 1) {
            handleStyles.push({ borderColor: `rgb(171, 226, ${b.toString()})` });
            railStyles.push({ backgroundColor: `rgb(171, 226, ${b.toString()})` });
            b -= Math.floor(255 / this.props.partitions);
        }
        return (
            <Range
                className="partition-resizer"
                key={this.props.partitions}
                min={0}
                max={this.props.size}
                count={this.props.partitions - 1}
                pushable
                handleStyle={handleStyles}
                trackStyle={railStyles}
                dotStyle={{
                    borderColor: '#888',
                }}
                railStyle={{
                    backgroundColor: '#95a5a6',
                }}
                defaultValue={this.state.defaultVals}
                onAfterChange={(e) => {
                    this.props.callback(e, indexesToSizes(e));
                }}
            />
        );
    }
}

PartitionSizer.defaultProps = {
    size: 0,
    partitions: 2,
    callback: () => [],
};

PartitionSizer.propTypes = {
    size: PropTypes.number,
    partitions: PropTypes.number,
    callback: PropTypes.func,
};

export default PartitionSizer;
