/* eslint-disable react/no-unknown-property */
import { IUnusedViewerPOC, POCViewer3DPoint } from 'package/stores/POCViewerStore/types';
import React from 'react';
import * as THREE from 'three';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { observer } from 'mobx-react';
import { POC_CRYSTAL_COLOR, POC_CRYSTAL_HOVER_COLOR } from 'package/constants';
import POCLabel from './pocLabel';


interface IPOCUnusedObject3DProps {
    poc: IUnusedViewerPOC,
    position: POCViewer3DPoint
}

export const POCUnusedObject3D = observer(({ poc, position }: IPOCUnusedObject3DProps) => {
    const isHovered = pocViewerStore.hoveredPOCIds.has(poc.id);

    const pocBodyColor = isHovered ? POC_CRYSTAL_HOVER_COLOR : POC_CRYSTAL_COLOR;

    return (
        <group
            onClick={e => {e.stopPropagation(); pocViewerStore.setClickedPOC(poc);}}
            position={[position.x, 1, -position.z]}

            onPointerEnter={(e) => {
                pocViewerStore.addHoveredPOCId(poc.id);
                e.stopPropagation();
            }}
            onPointerLeave={(e) => {
                pocViewerStore.removeHoveredPOCId(poc.id);
                e.stopPropagation();
            }}
        >
            <group>
                <mesh geometry={new THREE.ConeGeometry(1, 2, 4)} position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
                    <meshLambertMaterial flatShading attach="material" color={pocBodyColor} transparent opacity={0.3} side={THREE.DoubleSide}/>
                </mesh>

                <mesh geometry={new THREE.ConeGeometry(1, 2, 4)} position={[0, 2, 0]}>
                    <meshLambertMaterial flatShading color={pocBodyColor} side={THREE.DoubleSide} transparent opacity={0.3} />
                </mesh>
            </group>

            <group scale={[0.8,0.8,0.8]}>
                <mesh geometry={new THREE.ConeGeometry(1, 2, 4)} position={[0, 0.25, 0]} rotation={[Math.PI, 0, 0]} >
                    <meshLambertMaterial flatShading attach="material" color={pocBodyColor} side={THREE.DoubleSide}/>
                </mesh>

                <mesh geometry={new THREE.ConeGeometry(1, 2, 4)} position={[0, 2.25, 0]}>
                    <meshLambertMaterial flatShading color={pocBodyColor} side={THREE.DoubleSide} clipShadows />
                </mesh>
            </group>


            {
                // TODO here perfomance problem with this one
                isHovered &&
                <POCLabel
                    mediaCapacity={poc.mediaCapacity}
                    occupiedMediaCapacity={poc.occupiedMediaCapacity}
                    occupiedPhysicalCapacity={poc.occupiedPhysicalCapacity}
                    physicalCapacity={poc.physicalCapacity}
                    pocName={poc.name}
                    unit={poc.unit}
                />
            }

            <pointLight position={[0, 1, 0]} distance={2} intensity={20} />
        </group>
    );
});
