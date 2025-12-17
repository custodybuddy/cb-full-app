import { useContext } from 'react';
import { FalseAllegationStateContext, FalseAllegationActionsContext } from './FalseAllegationContext';

export const useFalseAllegationState = () => {
    const context = useContext(FalseAllegationStateContext);
    if (context === undefined) {
        throw new Error('useFalseAllegationState must be used within a FalseAllegationProvider');
    }
    return context;
};

export const useFalseAllegationActions = () => {
    const context = useContext(FalseAllegationActionsContext);
    if (context === undefined) {
        throw new Error('useFalseAllegationActions must be used within a FalseAllegationProvider');
    }
    return context;
};

export const useFalseAllegation = () => {
    return {
        state: useFalseAllegationState(),
        actions: useFalseAllegationActions(),
    };
};
