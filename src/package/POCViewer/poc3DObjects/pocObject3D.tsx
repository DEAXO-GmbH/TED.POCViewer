/* eslint-disable react/no-unknown-property */
import { IViewerPOC } from 'package/stores/POCViewerStore/types';
import React from 'react';
import TextSprite from './basicObjects/textSprite';
import * as THREE from 'three';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { observer } from 'mobx-react';

export const POCObject3D = observer(({ poc }: {poc: IViewerPOC}) => {
    const isHovered = pocViewerStore.hoveredPOCIds.has(poc.id);
    const color = isHovered ? 0x2222FF : 0x0000EE;

    // TODO find out why z has to be negative (prolly just me with wrong cords lol)
    return (
        <group
            onClick={e => {e.stopPropagation(); console.log(poc);}}
            position={[poc.yAxis.distance, 1, -poc.xAxis.distance]}

            onPointerEnter={() => pocViewerStore.addHoveredPOCId(poc.id)}
            onPointerLeave={() => pocViewerStore.removeHoveredPOCId(poc.id)}
        >
            <pointLight position={[2, 3, 2]} distance={4} intensity={10} />
            <pointLight position={[-2, 1, -2]} distance={5} intensity={10} />
            <pointLight position={[0, 4, 0]} distance={6} intensity={20} />

            <mesh geometry={new THREE.ConeGeometry(1, 2, 4)} position={[0, 0, 0]} rotation={[Math.PI, 0, 0]} >
                <meshLambertMaterial flatShading attach="material" color={color} />
            </mesh>

            <mesh geometry={new THREE.ConeGeometry(1, 2, 4)} position={[0, 2, 0]}>
                <meshLambertMaterial flatShading attach="material" color={color} />
            </mesh>

            <TextSprite position={[0, 4, 0]}>
                {poc.name}
            </TextSprite>
        </group>
    );
});
