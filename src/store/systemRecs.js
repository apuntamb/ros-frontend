import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';

const initialState = {
    loading: false,
    recommendationsData: [],
    systemRecError: {},
    totalRecommendations: 0,
    emptyState: false
};

export default applyReducerHash({
    FETCH_SYSTEM_RECOMMENDATIONS_LIST_PENDING: (state) => ({ ...state, loading: true }),
    FETCH_SYSTEM_RECOMMENDATIONS_LIST_FULFILLED: (state, action) => {
        return {
            ...state,
            loading: false,
            emptyState: action.payload.meta.count === 0,
            recommendationsData: action.payload.data,
            totalRecommendations: action.payload.meta.count
        };
    },
    FETCH_SYSTEM_RECOMMENDATIONS_LIST_REJECTED: (state, action) => ({
        ...state, loading: false,  emptyState: true, systemRecError: action.payload
    })
}, initialState);
