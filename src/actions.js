export const EXAMPLE = 'EXAMPLE';

export function example(dispatch) {
    return () => dispatch({
        type: EXAMPLE,
        payload: {},
    });
}
