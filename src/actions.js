export const EXAMPLE = 'EXAMPLE';

export function example(dispatch) {
    return () => dispatch({
        type: EXAMPLE,
        payload: {},
    });
}

export const UPDATE_GRAPH_ID = 'UPDATE_GRAPH_ID';

export function updateGraphIdAction(dispatch) {
    return id => dispatch({
        type: UPDATE_GRAPH_ID,
        payload: { id },
    });
}

export const UPDATE_CURRENT_GRAPH = 'UPDATE_CURRENT_GRAPH';

export function updateCurrentGraphAction(dispatch) {
    return graph => dispatch({
        type: UPDATE_CURRENT_GRAPH,
        payload: { graph },
    });
}

export const UPDATE_CURRENT_SOLUTION = 'UPDATE_CURRENT_SOLUTION';

export function updateCurrentSolutionAction(dispatch) {
    return solution => dispatch({
        type: UPDATE_CURRENT_SOLUTION,
        payload: { solution },
    });
}
