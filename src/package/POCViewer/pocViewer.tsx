/* eslint react/no-unknown-property: 0 */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, extend } from '@react-three/fiber';
import { ButtonPannel } from './components/buttonPannel';
import { POCObjectsGenerator } from './pocObjectsGenerator';

import { concatClassnames as cn } from 'package/utils';

import { POC_VIEWER_CSS_VARIABLES, SCENE_BACKGROUND_COLOR, SCENE_GRID_FIRST_COLOR, SCENE_GRID_SECOND_COLOR } from 'package/constants';
import { pocViewerStore } from 'package/stores/POCViewerStore';

import { IPOCViewerInputParameters, IUnusedViewerPOC, IViewerPOC, IViewerPOCCell } from 'package/stores/POCViewerStore/types';

import { SceneSettings } from './sceneSettings';

import './pocViewer.css';
import { UnusedPOCZone } from './components/unusedPOCZone';
import { POCViewerErrorBoundary } from './errorBoundary';

import { MeshLineGeometry, MeshLineMaterial } from 'meshline';



extend({ MeshLineMaterial, MeshLineGeometry });

export interface IPOCViewerProps {
    pocInputParameters: IPOCViewerInputParameters | null
    onPOCClick?: (poc: IViewerPOC | IUnusedViewerPOC) => void
    onPOCCellClick?: (pocCell: IViewerPOCCell) => void
    debug?: boolean
}

export const POCViewer = observer(({ pocInputParameters, onPOCClick, onPOCCellClick, debug = false }: IPOCViewerProps) => {
    useEffect(() => {
        if (pocViewerStore.clickedPOC) {
            onPOCClick && onPOCClick(pocViewerStore.clickedPOC);
        }
    }, [pocViewerStore.clickedPOC]);

    useEffect(() => {
        if (pocViewerStore.clickedPOCCell) {
            onPOCCellClick && onPOCCellClick(pocViewerStore.clickedPOCCell);
        }
    }, [pocViewerStore.clickedPOCCell]);

    useEffect(() => {
        if (pocInputParameters) {
            pocViewerStore.setPocInputParameters(pocInputParameters);
        } else {
            pocViewerStore.resetSceneData();
        }
    }, [pocInputParameters]);

    useEffect(() => {
        pocViewerStore.setDebugMode(debug);
    }, [debug]);


    return (
        <POCViewerErrorBoundary>
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
                    <UnusedPOCZone />
                </Canvas>

                <ButtonPannel />
            </div>
        </POCViewerErrorBoundary>
    );
});
