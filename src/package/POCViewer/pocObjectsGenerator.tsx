import React from 'react';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { LevelPlane } from './poc3DObjects/levelPlane';



export const POCObjectsGenerator = () => {
    return (
        <>
            {pocViewerStore.levelPlanes.map((levelPlane, index) => <LevelPlane key={index} levelPlane={levelPlane} />)}
        </>
    );
};
