/* eslint react/no-unknown-property: 0 */
import React from 'react';
import { observer } from 'mobx-react';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';


import './pocViewer.css';
import { POCObjectsGenerator } from './pocObjectsGenerator';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { concatClassnames as cn } from 'package/utils';
import { ButtonPannel } from './components/buttonPannel';



export const POCViewer = observer(() => {
    return (
        <div className={cn('poc-viewer_cont', pocViewerStore.hoveredPOCIds.size>0 && 'poc-hovered')}>
            <Canvas>
                <PerspectiveCamera makeDefault position={[0,0,300]} />
                <OrbitControls
                    makeDefault
                    minDistance={0.01}
                    maxDistance={5000}

                    minPolarAngle={0.2}
                    maxPolarAngle={1.5}

                    screenSpacePanning={false}
                    maxAzimuthAngle={0}
                    rotateSpeed={0.4}
                />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />

                <gridHelper args={[100,100]} position={[0, -0.01, 0]} />

                <POCObjectsGenerator />
            </Canvas>

            <ButtonPannel />
        </div>
    );
});
