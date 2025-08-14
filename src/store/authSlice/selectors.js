export const userSelector = (state) => state.auth.user;
export const userTokenSelector = (state) => state.auth.token;

export const isProfileCompleteSelector = (state) =>
    Boolean(state.auth.user?.is_profile_complete);
export const userIdSelector = (state) => state.auth.user?.id;
export const stripeVerifiedSelector = (state) =>
    state.auth.user?.stripe_verification_status === "verified";
export const isAuthModalOpenIdSelector = (state) => state.auth.isAuthModalOpen;

export const businessTutorialSelector = (state) =>
    Boolean(state.auth.user?.start_business_tutorial_seen);
