export type OrganizationType = "family" | "business" | "community";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  severity: "info" | "warning" | "critical";
  timeUtc: string;
  read: boolean;
  eventId?: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  organization?: string;
  organizationType: OrganizationType;
  homeLocation: string;
  alertThreshold: number;
  locale: "fr" | "en" | "es";
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}
