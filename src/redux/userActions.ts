import { UserActionTypes } from './userTypes';

export const GetUserActions = {
    setName: (name: string) => ({
        type: UserActionTypes.SetName,
        payload: name
    }),
    setCenter: (center: string) => ({
        type: UserActionTypes.SetCenter,
        payload: center
    }),
    userError: (error: boolean) => ({
        type: UserActionTypes.UserError,
        payload: error
    }),
    userLoading: (loading: boolean) => ({
        type: UserActionTypes.UserLoading,
        payload: loading
    }),
    fetchSuccess: (name: string, center: string) => ({
        type: UserActionTypes.FetchSuccess,
        name,
        center
    }),
    setUID: (uid: string) => ({
        type: UserActionTypes.SetUID,
        payload: uid
    })
};

export function itemsFetchData(url: string) {
    return dispatch => {
        dispatch(GetUserActions.userLoading(true));

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(GetUserActions.userLoading(false));

                return response;
            })
            .then(response => response.json())
            .then(items =>
                dispatch(
                    GetUserActions.fetchSuccess(items.name, items.address.city)
                )
            )
            .catch(() => dispatch(GetUserActions.userError(true)));
    };
}
