export interface WeddingEnquiryData {
  fullName: string;
  whatsappNumber: string;
  email: string;
  weddingDateType: 'exact' | 'tentative' | 'not_finalized';
  weddingDateValue?: string;
  destinationCity: string;
  guestCount: number | '';
  roomsRequired: number | '';
  functionCount: number | '';
  approximateBudget: string;
  servicesNeeded: string[];
  complimentaryRideRequested?: boolean;
  additionalNotes: string;
}

export interface CalculatorState {
  invitedGuests: number;
  expectedGuests: number;
  plannedRooms: number;
  requiredRooms: number;
  avgMealCost: number;
  avgRoomCost: number;
  avgTransportCost: number;
  numberOfFunctions: number;
}
