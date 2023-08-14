/* eslint-disable react/no-unknown-property */
import { pocViewerStore } from 'package/stores/POCViewerStore';

import { IViewerPOCLine } from 'package/stores/POCViewerStore/types';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import React, { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { POCLINE_COLOR } from 'package/constants';

extend({ MeshLineGeometry, MeshLineMaterial });


interface IPOCLineProps {
    pocLine: IViewerPOCLine,
}

interface IExtrudeSettings {
    depth: number
    extrudePath: THREE.CatmullRomCurve3 | undefined
    steps: number,
    bevelEnabled: boolean,
}

export const POCLine = ({ pocLine }: IPOCLineProps) => {
    const [extrudeSettings, setExtrudeSettings] = useState<any | IExtrudeSettings>({
        depth: 100,
        extrudePath: undefined,
        bevelEnabled: true,
        steps: 100,
        curveSegments: 100,
        bevelThickness: 10,
        bevelSize: 10,
        bevelOffset: 10,
        bevelSegments: 10
    });
    const shapeRef = useRef();



    useEffect(() => {
        const points = pocLine.getChildrenPoints([...pocViewerStore.pocs, ...pocViewerStore.pocLines]);

        setExtrudeSettings((prev: any) => {
            prev.extrudePath = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(point.x, point.y, point.z)), false, 'catmullrom', 0);
            return { ...prev, steps: points.length + 1000 };
        });
    }, [pocLine]);

    useEffect(() => {
        const width = 0.15;
        const shape = shapeRef.current as unknown as THREE.Shape;
        shape.moveTo(0, 0);
        // No beizer curves used as it gives perfomance issue
        shape.lineTo(0, width);
        shape.lineTo(width, width);
        shape.lineTo(width, 0);
        shape.lineTo(0, 0);
    }, []);


    return (
        <>
            <mesh position={[0, 1, 0]}>
                <meshLambertMaterial flatShading color={POCLINE_COLOR} />
                <extrudeGeometry args={[shapeRef.current, extrudeSettings]} />
            </mesh>
            <shape ref={shapeRef} />
        </>
    );
};
