/* eslint-disable react/no-unknown-property */
import { IViewerPOC } from 'package/stores/POCViewerStore/types';
import React, { useMemo } from 'react';
import TextSprite from './basicObjects/textSprite';
import * as THREE from 'three';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { observer } from 'mobx-react';

export const POCObject3D = observer(({ poc }: {poc: IViewerPOC}) => {
    const isHovered = pocViewerStore.hoveredPOCIds.has(poc.id);
    const color = isHovered ? 0x2222FF : 0x0000EE;

    const capacityClippingPlane = useMemo(() => {
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 0), 10);
        plane.constant = 0;
        return plane;
    }, []);

    // TODO find out why z has to be negative (prolly just me with wrong cords lol)
    return (
        <group
            onClick={e => {e.stopPropagation(); console.log(poc, capacityClippingPlane);}}
            position={[poc.yAxis.distance, 1, -poc.xAxis.distance]}

            onPointerEnter={(e) => {
                pocViewerStore.addHoveredPOCId(poc.id);
                e.stopPropagation();
            }}
            onPointerLeave={(e) => {
                pocViewerStore.removeHoveredPOCId(poc.id);
                e.stopPropagation();
            }}
        >
            <pointLight position={[2, 3, 2]} distance={4} intensity={10} />
            <pointLight position={[-2, 1, -2]} distance={5} intensity={10} />
            <pointLight position={[0, 4, 0]} distance={6} intensity={20} />

            <mesh geometry={new THREE.ConeGeometry(1, 2, 4)} position={[0, 0, 0]} rotation={[Math.PI, 0, 0]} >
                <meshLambertMaterial flatShading attach="material" color={color} clippingPlanes={capacityClippingPlane} />
            </mesh>

            <mesh geometry={new THREE.ConeGeometry(1, 2, 4)} position={[0, 2, 0]}>
                <meshLambertMaterial flatShading attach="material" color={color} clippingPlanes={capacityClippingPlane} />
            </mesh>

            <TextSprite position={[0, 4, 0]}>
                {poc.name}
            </TextSprite>
        </group>
    );
});
