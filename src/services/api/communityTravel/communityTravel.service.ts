// communityTravel.service.ts
import {
  CREATE_TRAVEL_PLAN,
  DELETE_TRAVEL_PLAN,
  GET_TRAVEL_PLAN_DETAILS,
  LIST_TRAVEL_PLANS_BY_ORGANIZER,
  UPDATE_TRAVEL_PLAN,
  ADD_PARTICIPANT_TO_TRAVEL_PLAN,
  REMOVE_PARTICIPANT_FROM_TRAVEL_PLAN,
  MAKE_OFFER_TO_TRAVEL_PLAN,
  ACCEPT_OFFER,
  POST_COMMENT_TO_TRAVEL_PLAN,
  LIST_TRAVEL_PLANS_BY_STATUS,
  SEARCH_TRAVEL_PLANS_BY_DESTINATION,
  CALCULATE_ESTIMATED_COST,
  CALCULATE_CONFIRMED_COST,
  ARCHIVE_COMPLETED_TRAVEL_PLANS,
  LIST_ARCHIVED_TRAVEL_PLANS,
  BULK_UPDATE_TRAVEL_PLANS,
  NOTIFY_PARTICIPANTS,
  LIST_UPCOMING_TRAVEL_PLANS
} from '../../../common/communityTravel.urls';
import { HttpService } from '../http.service';

export class CommunityTravelService extends HttpService {
  constructor() {
    super();
  }

  async createTravelPlan(payload: any) {
    return await this.post(CREATE_TRAVEL_PLAN, payload);
  }

  async listTravelPlansByOrganizer() {
    return await this.get(LIST_TRAVEL_PLANS_BY_ORGANIZER);
  }

  async getTravelPlanDetails(travelPlanId: string) {
    return await this.get(GET_TRAVEL_PLAN_DETAILS(travelPlanId));
  }

  async updateTravelPlan(travelPlanId: string, payload: any) {
    return await this.patch(UPDATE_TRAVEL_PLAN(travelPlanId), payload);
  }

  async deleteTravelPlan(travelPlanId: string) {
    return await this.delete(DELETE_TRAVEL_PLAN(travelPlanId));
  }

  async addParticipantToTravelPlan(travelPlanId: string, payload: any) {
    return await this.patch(ADD_PARTICIPANT_TO_TRAVEL_PLAN(travelPlanId), payload);
  }

  async removeParticipantFromTravelPlan(travelPlanId: string) {
    return await this.delete(REMOVE_PARTICIPANT_FROM_TRAVEL_PLAN(travelPlanId));
  }

  async makeOfferToTravelPlan(travelPlanId: string, payload: any) {
    return await this.post(MAKE_OFFER_TO_TRAVEL_PLAN(travelPlanId), payload);
  }

  // async acceptOffer(travelPlanId: string) {
  //   return await this.patch(ACCEPT_OFFER(travelPlanId));
  // }

  async postCommentToTravelPlan(travelPlanId: string, payload: any) {
    return await this.post(POST_COMMENT_TO_TRAVEL_PLAN(travelPlanId), payload);
  }

  async listTravelPlansByStatus(status: string) {
    return await this.get(LIST_TRAVEL_PLANS_BY_STATUS, { status });
  }

  async searchTravelPlansByDestination(destination: string) {
    return await this.get(SEARCH_TRAVEL_PLANS_BY_DESTINATION, { destination });
  }

  // Additional methods for the remaining functionalities...

  // Add your remaining functions here based on the URLs defined
    // Method to calculate estimated cost for a travel plan
    async calculateEstimatedCost(travelPlanId: string) {
      return await this.get(CALCULATE_ESTIMATED_COST(travelPlanId));
    }
  
    // Method to calculate confirmed cost for a travel plan
    async calculateConfirmedCost(travelPlanId: string) {
      return await this.get(CALCULATE_CONFIRMED_COST(travelPlanId));
    }
  
    // Method to archive completed travel plans
    // async archiveCompletedTravelPlans() {
    //   return await this.(ARCHIVE_COMPLETED_TRAVEL_PLANS);
    // }
  
    // Method to list archived travel plans
    async listArchivedTravelPlans() {
      return await this.get(LIST_ARCHIVED_TRAVEL_PLANS);
    }
  
    // Method to perform bulk updates on travel plans
    async bulkUpdateTravelPlans(payload: any) {
      return await this.patch(BULK_UPDATE_TRAVEL_PLANS, payload);
    }
  
    // Method to notify participants of a specific travel plan
    async notifyParticipants(travelPlanId: string, payload: any) {
      return await this.post(NOTIFY_PARTICIPANTS(travelPlanId), payload);
    }
  
    // Method to list upcoming travel plans within a specific timeframe
    async listUpcomingTravelPlans(payload: { startDate: string, endDate: string }) {
      return await this.get(LIST_UPCOMING_TRAVEL_PLANS, payload);
    }
  
}

export const _communityTravelService = new CommunityTravelService();
