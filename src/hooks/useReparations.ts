import { useEffect } from 'react';
import { useReparationStore } from '../store/reparationSlice';
import { fetchReparations } from '../services/api';

export const useReparations = () => {
  const reparations = useReparationStore((state) => state.reparations);
  const addReparation = useReparationStore((state) => state.addReparation);

  useEffect(() => {
    const loadReparations = async () => {
      try {
        const response = await fetchReparations();
        response.data.forEach(addReparation);
      } catch (error) {
        console.error('Failed to fetch reparations:', error);
      }
    };

    loadReparations();
  }, [addReparation]);

  return { reparations, addReparation };
};