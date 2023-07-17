/* eslint-disable react/no-unknown-property */
import { IViewerPOC } from 'package/stores/POCViewerStore/types';
import React, { useMemo } from 'react';
import TextSprite from './basicObjects/textSprite';
import * as THREE from 'three';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { observer } from 'mobx-react';
import { POC_CRYSTAL_COLOR, POC_CRYSTAL_HOVER_COLOR, POC_CRYSTAL_LABEL_COLOR } from 'package/constants';



export const POCObject3D = observer(({ poc }: {poc: IViewerPOC}) => {
    const isHovered = pocViewerStore.hoveredPOCIds.has(poc.id);
    const color = isHovered ? POC_CRYSTAL_HOVER_COLOR : POC_CRYSTAL_COLOR;

    const capacityClippingPlane = useMemo(() => {
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 0), 10);
        plane.constant = 0;
        console.log('POC', poc.name, poc.position);
        return plane;
    }, []);


    return (
        <group
            onClick={e => {e.stopPropagation(); console.log(poc, capacityClippingPlane);}}
            position={[poc.position.x, 1, -poc.position.z]}

            onPointerEnter={(e) => {
                pocViewerStore.addHoveredPOCId(poc.id);
                e.stopPropagation();
            }}
            onPointerLeave={(e) => {
                pocViewerStore.removeHoveredPOCId(poc.id);
                e.stopPropagation();
            }}
        >
            <mesh geometry={new THREE.ConeGeometry(1, 2, 4)} position={[0, 0, 0]} rotation={[Math.PI, 0, 0]} >
                <meshLambertMaterial flatShading attach="material" color={color} clippingPlanes={capacityClippingPlane} />
            </mesh>

            <mesh geometry={new THREE.ConeGeometry(1, 2, 4)} position={[0, 2, 0]}>
                <meshLambertMaterial flatShading attach="material" color={color} clippingPlanes={capacityClippingPlane} />
            </mesh>

            <TextSprite color={POC_CRYSTAL_LABEL_COLOR} position={[0, 4, 0]}>
                {poc.name}
            </TextSprite>
        </group>
    );
});
