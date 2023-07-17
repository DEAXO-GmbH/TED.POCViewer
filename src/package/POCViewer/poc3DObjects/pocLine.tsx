/* eslint-disable react/no-unknown-property */
import { pocViewerStore } from 'package/stores/POCViewerStore';

import { IViewerPOCLine } from 'package/stores/POCViewerStore/types';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import React, { useEffect } from 'react';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { POCLINE_COLOR } from 'package/constants';

extend({ MeshLineGeometry, MeshLineMaterial });


interface IPOCLineProps {
    pocLine: IViewerPOCLine,
}
// console.log(THREE, MeshLine);

export const POCLine = ({ pocLine }: IPOCLineProps) => {
    const ref = React.useRef<any>();

    useEffect(() => {
        const points = pocLine.getChildrenPoints([...pocViewerStore.pocs, ...pocViewerStore.pocLines]);

        ref.current.setPoints(points.map(point => new THREE.Vector3(point.x, point.y, point.z)));
    }, [pocLine]);

    return (
        <>
            <mesh>
                <meshLineGeometry ref={ref}/>
                <meshLineMaterial
                    lineWidth={0.5}
                    color={new THREE.Color(0xFFFFFF * Math.random() || POCLINE_COLOR)}
                    resolution={new THREE.Vector2(121, 121)}
                />
            </mesh>
        </>
    );
};
