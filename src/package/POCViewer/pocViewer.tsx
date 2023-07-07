import React, { Suspense } from 'react';
import { observer } from 'mobx-react';

import { pocViewerStore } from 'package/stores/POCViewerStore';
import { FlyControls, OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import * as THREE from 'three';

import './pocViewer.css';
import { VerticalAxis } from './poc3DObjects/verticalAxis';
import HorizontalAxis from './poc3DObjects/horizontalAxis';
import { POCObjectsGenerator } from './pocObjectsGenerator';

// Due to ESLint bug with unknown props
/* eslint react/no-unknown-property: 0 */



export const POCViewer = observer(() => {
    return (
        <div className='poc-viewer_cont'>
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
        </div>
    );
});
