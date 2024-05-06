export interface NavigationProps {
  navigation: any;
}

export interface ILocalizations {
  [key: string]: string;
}

// NativeWind Interface
import 'react-native';
declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
  interface TextInputProps {
    className?: string;
  }
  interface TouchableOpacityProps {
    className?: string;
  }
  interface ButtonProps {
    className?: string;
  }
  interface ScrollViewProps {
    className?: string;
  }
  interface SafeAreaViewProps {
    className?: string;
  }

  interface ImageBackgroundProps {
    className?: string;
  }
}


export interface buildSubscriptionQueryPayload {
  subscriptionId?: string;
  ownerId?: string;
  type?: string;
  customer?: string;
  customerName?: string;
  productName?: string;
  businessName?: string;
  businessId?: string;
  active?: boolean;
  startDate?: string;
  endDate?: string;
  nextDeliveryDate?: string;
  frequency?: string;
  paymentStatus?: string;
  minPaymentAmount?: number;
  maxPaymentAmount?: number;
  paymentStartDate?: string;
  paymentEndDate?: string;
  deliveryStatus?: string;
  deliveryStartDate?: string;
  deliveryEndDate?: string;
  frequencyType?: string;
  daysOfWeek?: number[];
  intervals?: number;
  monthlyOccurrences?: any;
  sortField?: string;
  sortOrder?: string;
  limit?: number;
  skip?: number;
}

export interface ProductQueryPayload {
  ownerId?: string;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
  availableFor?: string[];
  isSubscriptionAvailable?: boolean;
  status?: string;
  quantity?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  skip?: number;
  businessId?: string;
}