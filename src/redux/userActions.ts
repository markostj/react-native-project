import { UserActionTypes } from './userTypes';

export const GetUserActions = {
    setName: (name: string) => ({
        type: UserActionTypes.SetName,
        payload: name
    }),
    setCenter: (center: string) => ({
        type: UserActionTypes.SetCenter,
        payload: center
    })
};
