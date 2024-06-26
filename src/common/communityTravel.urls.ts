// communityTravel.urls.ts
export const CREATE_TRAVEL_PLAN = `community-travel/create`;
export const LIST_TRAVEL_PLANS_BY_ORGANIZER = `community-travel/list-by-organizer`;
export const UPDATE_TRAVEL_PLAN = (travelPlanId: string) => `community-travel/update/${travelPlanId}`;
export const DELETE_TRAVEL_PLAN = (travelPlanId: string) => `community-travel/delete/${travelPlanId}`;
export const GET_TRAVEL_PLAN_DETAILS = (travelPlanId: string) => `community-travel/details/${travelPlanId}`;
export const ADD_PARTICIPANT_TO_TRAVEL_PLAN = (travelPlanId: string) => `community-travel/add-participant/${travelPlanId}`;
export const REMOVE_PARTICIPANT_FROM_TRAVEL_PLAN = (travelPlanId: string) => `community-travel/remove-participant/${travelPlanId}`;
export const MAKE_OFFER_TO_TRAVEL_PLAN = (travelPlanId: string) => `community-travel/make-offer/${travelPlanId}`;
export const ACCEPT_OFFER = (travelPlanId: string) => `community-travel/accept-offer/${travelPlanId}`;
export const POST_COMMENT_TO_TRAVEL_PLAN = (travelPlanId: string) => `community-travel/post-comment/${travelPlanId}`;
export const LIST_TRAVEL_PLANS_BY_STATUS = `community-travel/list-by-status`;
export const SEARCH_TRAVEL_PLANS_BY_DESTINATION = `community-travel/search-by-destination`;
export const CALCULATE_ESTIMATED_COST = (travelPlanId: string) => `community-travel/calculate-estimated-cost/${travelPlanId}`;
export const CALCULATE_CONFIRMED_COST = (travelPlanId: string) => `community-travel/calculate-confirmed-cost/${travelPlanId}`;
export const ARCHIVE_COMPLETED_TRAVEL_PLANS = `community-travel/archive-completed`;
export const LIST_ARCHIVED_TRAVEL_PLANS = `community-travel/list-archived`;
export const BULK_UPDATE_TRAVEL_PLANS = `community-travel/bulk-update`;
export const NOTIFY_PARTICIPANTS = (travelPlanId: string) => `community-travel/notify-participants/${travelPlanId}`;
export const LIST_UPCOMING_TRAVEL_PLANS = `community-travel/list-upcoming`;
