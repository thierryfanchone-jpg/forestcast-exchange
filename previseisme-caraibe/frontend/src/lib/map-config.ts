/**
 * Style de carte par défaut : MapLibre "demotiles" (gratuit, sans clé,
 * suffisant pour le développement/démo). En production, remplacez par un
 * style MapTiler/Mapbox/Stadia Maps via NEXT_PUBLIC_MAP_STYLE_URL pour un
 * meilleur niveau de détail et des garanties de disponibilité.
 */
export const MAP_STYLE_URL =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL ?? "https://demotiles.maplibre.org/style.json";

export const WORLD_VIEW = {
  longitude: -40,
  latitude: 15,
  zoom: 1.6,
};

export const CARIBBEAN_VIEW = {
  longitude: -66,
  latitude: 16.5,
  zoom: 5.2,
};
