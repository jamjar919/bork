import React from 'react';
import PropTypes from 'prop-types';

const $ = require('jquery');

const PartitionInfo = (props) => {
    let ratio = Math.abs(props.info.internalWeight) / Math.abs(props.info.externalWeight);
    if (ratio >= 1) {
        ratio = 1;
    }

    const base = [231, 76, 60]; // red
    const to = [24, 188, 156]; // green
    const difference = [
        Math.max(base[0] + Math.round(-207 * ratio), to[0]),
        Math.min(base[1] + Math.round(112 * ratio), to[1]),
        Math.min(base[2] + Math.round(96 * ratio), to[2]),
    ];
    const colorString = `rgba(${difference[0]}, ${difference[1]}, ${difference[2]}, 1)`;

    return (
        <div
            className="btn btn-secondary"
            data-toggle="tooltip"
            data-placement="bottom"
            title={`Partition ${props.id}`}
            style={{ backgroundColor: colorString }}
        >
            { props.info.internalWeight } <em>/</em> { props.info.externalWeight }
        </div>
    );
};

PartitionInfo.propTypes = {
    info: PropTypes.shape({
        internalWeight: PropTypes.number,
        externalWeight: PropTypes.number,
    }),
    id: PropTypes.number,
};

// eslint-disable-next-line react/prefer-stateless-function
class SolutionInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            hasSolution: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.info !== 'undefined') {
            if (Object.hasOwnProperty.call(nextProps.info, 'cutweight')) {
                this.setState({ hasSolution: true });
            } else {
                this.setState({ hasSolution: false });
            }
        }
    }

    componentDidUpdate() {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    }

    render() {
        const partitionInfo = [];
        if (this.state.hasSolution) {
            for (let i = 0; i < this.props.info.partitionInfo.length; i += 1) {
                partitionInfo.push(
                    <PartitionInfo key={i} id={i} info={this.props.info.partitionInfo[i]} />,
                );
            }
            partitionInfo.push(
                <div
                    key="-1"
                    className="btn btn-info partition-info-help"
                    data-toggle="popover"
                    data-placement="bottom"
                    title="Internal Weight / External Weight"
                    data-content="Internal weight is the sum of the edges inside a partition, and external weight is the sum of the edges to other partitions."
                >
                    <span className="dummy-text">a</span><i className="fa fa-question-circle" />
                </div>,
            );
        }
        return (
            <div className="solutionInfo card-body">
                <div className="alert alert-info">
                    { this.state.hasSolution ?
                        (
                            <span>
                                <strong
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Solution quality is the sum of all the broken connections - Lower is better!"
                                >
                                    Solution Quality:
                                </strong>
                                { ` ${this.props.info.cutweight}` }
                            </span>
                            ) : (
                                <strong>No solution yet, click solve!</strong>
                            )
                    }
                </div>
                <div className="btn-group partition-info-buttons" role="group">
                    { partitionInfo }
                </div>
            </div>
        );
    }
}

SolutionInfo.propTypes = {
    info: PropTypes.shape({
        cutweight: PropTypes.number,
        partitionInfo: PropTypes.arrayOf(
            PropTypes.shape({
                internalWeight: PropTypes.number,
                externalWeight: PropTypes.number,
            }),
        ),
    }),
};

export default SolutionInfo;
