/* eslint react/no-unknown-property: 0 */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ButtonPannel } from './components/buttonPannel';
import TextSprite from './poc3DObjects/basicObjects/textSprite';
import { POCObjectsGenerator } from './pocObjectsGenerator';

import { concatClassnames as cn } from 'package/utils';

import { LEVEL_PLANE_LABEL_COLOR, POC_VIEWER_CSS_VARIABLES, SCENE_BACKGROUND_COLOR, SCENE_GRID_FIRST_COLOR, SCENE_GRID_SECOND_COLOR } from 'package/constants';
import { pocViewerStore } from 'package/stores/POCViewerStore';

import { IPOCViewerInputParameters, IViewerPOC } from 'package/stores/POCViewerStore/types';

import './pocViewer.css';
import { SceneSettings } from './sceneSettings';



interface IPOCViewerProps {
    pocInputParameters: IPOCViewerInputParameters | null
    onPOCClick: (poc: IViewerPOC) => void
}

export const POCViewer = observer(({ pocInputParameters, onPOCClick }: IPOCViewerProps) => {
    useEffect(() => {
        if (pocViewerStore.clickedPOC) {
            onPOCClick(pocViewerStore.clickedPOC);
        }
    }, [pocViewerStore.clickedPOC]);

    useEffect(() => {
        if (pocInputParameters) {
            pocViewerStore.setPocInputParameters(pocInputParameters);
        } else {
            pocViewerStore.resetSceneData();
        }
    }, [pocInputParameters]);


    return (
        <div style={{ ...POC_VIEWER_CSS_VARIABLES }} className={cn('poc-viewer_cont', pocViewerStore.hoveredPOCIds.size > 0 && 'poc-hovered')}>
            <Canvas gl={{ localClippingEnabled: true }}>
                <SceneSettings />

                <color attach='background' args={[SCENE_BACKGROUND_COLOR]} />
                <PerspectiveCamera makeDefault position={[0,0,300]} far={1000} />
                <OrbitControls
                    makeDefault
                    minDistance={0.01}
                    maxDistance={5000}

                    minPolarAngle={0}
                    maxPolarAngle={1.5}

                    screenSpacePanning={false}
                    maxAzimuthAngle={0}
                    rotateSpeed={0.4}
                />

                <gridHelper args={[2000, 1000, SCENE_GRID_FIRST_COLOR, SCENE_GRID_FIRST_COLOR]} position={[0, -0.2, 0]} />
                <gridHelper args={[2000, 100, SCENE_GRID_SECOND_COLOR, SCENE_GRID_SECOND_COLOR]} position={[0, -0.2, 0]} />

                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <directionalLight position={[0, 2, 1]} intensity={0.5} />
                <directionalLight position={[1, 2, -1]} intensity={0.25} />
                <directionalLight position={[1, -2, -1]} intensity={0.1} />
                <directionalLight />

                <POCObjectsGenerator />

                <axesHelper args={[5]} position={[-50, 1, -50]} />
                <TextSprite position={[-45, 2, -50]} color={LEVEL_PLANE_LABEL_COLOR}>X</TextSprite>
                <TextSprite position={[-50, 7, -50]} color={LEVEL_PLANE_LABEL_COLOR}>Y</TextSprite>
                <TextSprite position={[-50, 2, -45]} color={LEVEL_PLANE_LABEL_COLOR}>Z</TextSprite>
            </Canvas>

            <ButtonPannel />
        </div>
    );
});
