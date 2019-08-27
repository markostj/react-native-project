// I don't need this for now, this is if I have more Actions to put in Union

import { ActionCreatorsMapObject } from 'redux';

/** This type is used for merging All actions of the same type
 * Example:
 * type RegistrationAction =
 *  | RegistrationRequest
 *  | RegistrationSuccess
 *  | RegistrationError;
 */
export type ActionUnion<A extends ActionCreatorsMapObject> = ReturnType<
    A[keyof A]
>;
