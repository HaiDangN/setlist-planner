// Genre similarity scores (1 = very similar, 0 = not similar)
export const GENRE_SIMILARITY: Record<string, Record<string, number>> = {
  house: {
    house: 1,
    techno: 0.7,
    hardstyle: 0.6,
    dubstep: 0.3,
    basshouse: 0.8,
  },
  basshouse: {
    basshouse: 1,
    house: 0.8,
    techno: 0.8,
    hardstyle: 0.6,
    dubstep: 0.5,
    trap: 1,
  },
  techno: {
    techno: 1,
    house: 0.8,
    hardstyle: 0.9,
    dubstep: 0.4,
  },
  hardstyle: {
    hardstyle: 1,
    house: 0.6,
    techno: 0.9,
    dubstep: 0.3,
  },
  dubstep: {
    dubstep: 1,
    trap: 0.7,
    hiphop: 0.4,
    house: 0.3,
    techno: 0.4,
  },
  trap: {
    trap: 1,
    dubstep: 0.7,
    house: 0.2,
    techno: 0.2,
    hardstyle: 0.5,
    basshouse: 1,
  },
};
