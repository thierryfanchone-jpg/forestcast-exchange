import { LeadRequestData, ArtisanProfileData, LeadStatus } from "@/types";

export const MOCK_LEADS: LeadRequestData[] = [
  {
    id: "lead_1",
    category: "electricite",
    name: "Marie Dupont",
    phone: "06 12 34 56 78",
    email: "marie.dupont@email.fr",
    city: "Lyon",
    description: "Disjoncteur qui saute quand il pleut, prise qui grésille",
    status: "nouveau",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "lead_2",
    category: "plomberie",
    name: "Jean-Pierre Martin",
    phone: "07 98 76 54 32",
    email: "jp.martin@email.fr",
    city: "Paris",
    description: "Fuite importante sous l'évier de la cuisine, eau sur le sol",
    status: "envoye",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "lead_3",
    category: "climatisation",
    name: "Sophie Bernard",
    phone: "06 55 44 33 22",
    email: "sophie.b@email.fr",
    city: "Marseille",
    description: "Clim qui affiche code erreur E5 et ne refroidit plus",
    status: "accepte",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "lead_4",
    category: "serrurerie",
    name: "Thomas Leclerc",
    phone: "06 78 90 12 34",
    email: "thomas.l@email.fr",
    city: "Bordeaux",
    description: "Serrure bloquée impossible d'ouvrir la porte d'entrée",
    status: "termine",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "lead_5",
    category: "electromenager",
    name: "Isabelle Moreau",
    phone: "07 11 22 33 44",
    email: "isabelle.m@email.fr",
    city: "Toulouse",
    description: "Machine à laver affiche E3 et n'essore plus",
    status: "nouveau",
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
  },
];

export const MOCK_ARTISANS: ArtisanProfileData[] = [
  {
    id: "artisan_1",
    companyName: "Électricité Pro Lyon",
    contactName: "Frédéric Blanc",
    trade: "Électricien",
    siret: "12345678901234",
    phone: "04 72 00 11 22",
    email: "contact@electro-pro-lyon.fr",
    city: "Lyon",
    serviceAreas: "Lyon, Villeurbanne, Bron, Vénissieux",
    availability: "Lun-Sam 8h-19h, urgences 24/7",
    subscriptionType: "mensuel",
    status: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: "artisan_2",
    companyName: "Plomberie Express Paris",
    contactName: "Ahmed Khalil",
    trade: "Plombier",
    phone: "01 23 45 67 89",
    email: "ahmed@plomberie-express.fr",
    city: "Paris",
    serviceAreas: "Paris 75, Hauts-de-Seine 92, Seine-Saint-Denis 93",
    availability: "7j/7 8h-22h",
    subscriptionType: "lead",
    status: "active",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    id: "artisan_3",
    companyName: "Clim Service Marseille",
    contactName: "Patrick Rossi",
    trade: "Technicien climatisation",
    siret: "98765432109876",
    phone: "04 91 00 55 66",
    email: "patrick@clim-service-13.fr",
    city: "Marseille",
    serviceAreas: "Marseille, Aix-en-Provence, Aubagne",
    availability: "Lun-Ven 8h-18h",
    subscriptionType: "mensuel",
    status: "pending",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
];

export const STATUS_LABELS: Record<string, string> = {
  nouveau: "Nouveau",
  envoye: "Envoyé",
  accepte: "Accepté",
  termine: "Terminé",
  pending: "En attente",
  active: "Actif",
  suspended: "Suspendu",
};

export const STATUS_COLORS: Record<string, string> = {
  nouveau: "bg-blue-100 text-blue-700",
  envoye: "bg-yellow-100 text-yellow-700",
  accepte: "bg-orange-100 text-orange-700",
  termine: "bg-green-100 text-green-700",
  pending: "bg-gray-100 text-gray-600",
  active: "bg-green-100 text-green-700",
  suspended: "bg-red-100 text-red-700",
};

let leadsStore: LeadRequestData[] = [...MOCK_LEADS];
let artisansStore: ArtisanProfileData[] = [...MOCK_ARTISANS];

export function getLeads(): LeadRequestData[] {
  return leadsStore;
}

export function addLead(lead: Omit<LeadRequestData, "id" | "status" | "createdAt">): LeadRequestData {
  const newLead: LeadRequestData = {
    ...lead,
    id: `lead_${Date.now()}`,
    status: "nouveau",
    createdAt: new Date().toISOString(),
  };
  leadsStore = [newLead, ...leadsStore];
  return newLead;
}

export function updateLeadStatus(id: string, status: LeadStatus): boolean {
  const idx = leadsStore.findIndex((l) => l.id === id);
  if (idx === -1) return false;
  leadsStore[idx] = { ...leadsStore[idx], status };
  return true;
}

export function getArtisans(): ArtisanProfileData[] {
  return artisansStore;
}

export function addArtisan(artisan: Omit<ArtisanProfileData, "id" | "status" | "createdAt">): ArtisanProfileData {
  const newArtisan: ArtisanProfileData = {
    ...artisan,
    id: `artisan_${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  artisansStore = [newArtisan, ...artisansStore];
  return newArtisan;
}
