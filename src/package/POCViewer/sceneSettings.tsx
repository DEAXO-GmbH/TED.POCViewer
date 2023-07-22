import { useThree } from '@react-three/fiber';
import { Plane, Vector3 } from 'three';

export const SceneSettings = () => {
    const threeRoot = useThree();

    // // threeRoot.gl.localClippingEnabled = true;
    // // const plane = new Plane(new Vector3(0, - 1, 1), 3.8);
    // threeRoot.gl.clippingPlanes = [plane];

    return null;
};
