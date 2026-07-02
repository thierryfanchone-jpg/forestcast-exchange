import type { UserProfile } from "@/lib/types/user";

export interface DemoAccount extends UserProfile {
  password: string;
}

export const demoAccounts: DemoAccount[] = [
  {
    id: "usr-family-1",
    fullName: "Camille Étienne",
    email: "camille@example.com",
    password: "demo1234",
    organizationType: "family",
    homeLocation: "Fort-de-France, Martinique",
    alertThreshold: 4.0,
    locale: "fr",
    channels: { email: true, sms: false, push: true },
  },
  {
    id: "usr-business-1",
    fullName: "Marc Dorval",
    email: "marc@caraibe-industries.com",
    password: "demo1234",
    organization: "Caraïbe Industries",
    organizationType: "business",
    homeLocation: "Kingston, Jamaïque",
    alertThreshold: 4.5,
    locale: "fr",
    channels: { email: true, sms: true, push: true },
  },
  {
    id: "usr-community-1",
    fullName: "Aline Beauséjour",
    email: "aline@mairie-pap.gp",
    password: "demo1234",
    organization: "Mairie de Pointe-à-Pitre",
    organizationType: "community",
    homeLocation: "Pointe-à-Pitre, Guadeloupe",
    alertThreshold: 3.5,
    locale: "fr",
    channels: { email: true, sms: true, push: false },
  },
];
