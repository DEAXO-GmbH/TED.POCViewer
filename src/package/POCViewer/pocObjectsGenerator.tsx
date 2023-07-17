/* eslint-disable react/no-unknown-property */
import React from 'react';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { LevelPlane } from './poc3DObjects/levelPlane';
import { POCLine } from './poc3DObjects/pocLine';
import { Vector3 } from 'three';



export const POCObjectsGenerator = () => {
    const position = new Vector3(-pocViewerStore.planesWidth / 2, 0, pocViewerStore.planesLength / 2);
    return (
        <group position={position}>
            {pocViewerStore.levelPlanes.map((levelPlane, index) => <LevelPlane key={index} levelPlane={levelPlane} />)}
            {pocViewerStore.pocLines.map(pocLine => <POCLine key={pocLine.id} pocLine={pocLine} />)}
        </group>
    );
};
