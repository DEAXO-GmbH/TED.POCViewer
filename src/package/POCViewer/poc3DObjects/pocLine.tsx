/* eslint-disable react/no-unknown-property */
import { pocViewerStore } from 'package/stores/POCViewerStore';

import { IViewerPOCLine, POCViewer3DPoint } from 'package/stores/POCViewerStore/types';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { POCLINE_COLOR } from 'package/constants';
import TextSprite from './basicObjects/textSprite';

extend({ MeshLineGeometry, MeshLineMaterial });


interface IPOCLineProps {
    pocLine: IViewerPOCLine,
}

export const POCLine = ({ pocLine }: IPOCLineProps) => {
    const [points, setPoints] = useState<POCViewer3DPoint[]>([]);

    const ref = useRef<any>();
    const lineColor = useMemo(() => new THREE.Color(0xFFFFFF * Math.random() || POCLINE_COLOR), []);

    useEffect(() => {
        const points = pocLine.getChildrenPoints([...pocViewerStore.pocs, ...pocViewerStore.pocLines]);

        ref.current.setPoints(points.map(point => new THREE.Vector3(point.x, point.y, point.z)));
        setPoints(points);
    }, [pocLine]);

    return (
        <>
            <mesh position={[0, 0.2, 0]}>
                <meshLineGeometry ref={ref}/>
                <meshLineMaterial
                    lineWidth={0.5}
                    color={lineColor}
                    resolution={new THREE.Vector2(121, 121)}
                />
            </mesh>

            {
                // points.map((point, i) => <TextSprite position={[point.x - 0.3, point.y + 0.2, point.z + 0.3]} fontSize={50} key={i}>{i}</TextSprite>)
            }
            <TextSprite fontSize={70} bgColor={0x000020} color={0xFFFFFF} width={1} bgOpacity={1}  position={[points[0]?.x, points[0]?.y + 0.6, points[0]?.z]}>{pocLine.incomingVolumeCapacity}</TextSprite>
        </>
    );
};
