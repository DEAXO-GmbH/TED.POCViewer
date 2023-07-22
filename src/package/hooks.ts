import { useState } from 'react';

export const useTriggerRerender = () => {
    const [, set] = useState(true);

    return () => set(pr => !pr);
};
