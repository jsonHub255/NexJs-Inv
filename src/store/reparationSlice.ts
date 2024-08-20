import { create } from 'zustand';

interface Reparation {
  id: number;
  product: string;
  status: string;
}

interface ReparationState {
  reparations: Reparation[];
  addReparation: (reparation: Reparation) => void;
}

export const useReparationStore = create<ReparationState>((set) => ({
  reparations: [],
  addReparation: (reparation) => set((state) => ({ 
    reparations: [...state.reparations, reparation] 
  })),
}));