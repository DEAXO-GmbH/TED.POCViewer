import { useMemo } from 'react';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import Roboto from '../fonts/roboto.typeface.json';


export const useGetFont = () => {
    const font = useMemo(() => {
        return new FontLoader().parse(Roboto);
    }, []);

    return font;
};
