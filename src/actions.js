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


export const TOGGLE_MENU = 'TOGGLE_MENU';

export function toggleMenuAction(dispatch) {
    return () => dispatch({
        type: TOGGLE_MENU,
    });
}


export const TOGGLE_SOLUTION_PANEL = 'TOGGLE_SOLUTION_PANEL';

export function toggleSolutionPanelAction(dispatch) {
    return () => dispatch({
        type: TOGGLE_SOLUTION_PANEL,
    });
}


export const TOGGLE_PEOPLE_PANEL = 'TOGGLE_PEOPLE_PANEL';

export function togglePeoplePanelAction(dispatch) {
    return () => dispatch({
        type: TOGGLE_PEOPLE_PANEL,
    });
}


export const UPDATE_COLORS = 'UPDATE_COLORS';

export function updateColorsAction(dispatch) {
    return newColors => dispatch({
        type: UPDATE_COLORS,
        payload: newColors,
    });
}

