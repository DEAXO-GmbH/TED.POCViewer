/* eslint-disable react/no-unknown-property */
import { IViewerPOC } from 'package/stores/POCViewerStore/types';
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { observer } from 'mobx-react';
import { POC_CRYSTAL_COLOR, POC_CRYSTAL_HOVER_COLOR, POC_OVERFLOW_COLOR, POC_OVERFLOW_HOVER_COLOR } from 'package/constants';
import POCLabel from './pocLabel';



interface IPOCObject3DProps {
    poc: IViewerPOC
}

export const POCObject3D = observer(({ poc }: IPOCObject3DProps) => {
    const isHovered = pocViewerStore.hoveredPOCIds.has(poc.id);

    const isMediaOverflow = Number(poc.mediaCapacity) < Number(poc.occupiedMediaCapacity);

    const pocBodyColor =  (isMediaOverflow) ? (isHovered ? POC_OVERFLOW_HOVER_COLOR : POC_OVERFLOW_COLOR) : (isHovered ? POC_CRYSTAL_HOVER_COLOR : POC_CRYSTAL_COLOR);

    const mediaCapacityFilled = Number(poc.occupiedMediaCapacity) / Number(poc.mediaCapacity) || 1;

    const capacityClippingPlane = useMemo(() => {
        const plane = new THREE.Plane(new THREE.Vector3(0, -1, 0), poc.position.y + mediaCapacityFilled * 4);
        return plane;
    }, [poc]);

    const height = 2;
    const radius = 1;


    return (
        <group
            onClick={e => {e.stopPropagation(); pocViewerStore.setClickedPOC(poc);}}
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
            <group>
                <mesh geometry={new THREE.ConeGeometry(radius, height, 4)} position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
                    <meshLambertMaterial flatShading attach="material" color={pocBodyColor} transparent opacity={0.3} side={THREE.DoubleSide}/>
                </mesh>

                <mesh geometry={new THREE.ConeGeometry(radius, height, 4)} position={[0, height, 0]}>
                    <meshLambertMaterial flatShading color={pocBodyColor} side={THREE.DoubleSide} transparent opacity={0.3} />
                </mesh>
            </group>

            <group scale={[0.8,0.8,0.8]}>
                <mesh geometry={new THREE.ConeGeometry(radius, height, 4)} position={[0, 0.25, 0]} rotation={[Math.PI, 0, 0]} >
                    <meshLambertMaterial flatShading attach="material" color={pocBodyColor} side={THREE.DoubleSide} clipShadows clippingPlanes={[capacityClippingPlane]}/>
                </mesh>

                <mesh geometry={new THREE.ConeGeometry(radius, height, 4)} position={[0, height+0.25, 0]}>
                    <meshLambertMaterial flatShading color={pocBodyColor} side={THREE.DoubleSide} clipShadows clippingPlanes={[capacityClippingPlane]} />
                </mesh>
            </group>


            <POCLabel
                mediaCapacity={poc.mediaCapacity}
                occupiedMediaCapacity={poc.occupiedMediaCapacity}
                occupiedPhysicalCapacity={poc.occupiedPhysicalCapacity}
                physicalCapacity={poc.physicalCapacity}
                pocName={poc.name}
                unit={poc.unit}
            />

            <pointLight position={[0, 1, 0]} distance={2} intensity={20} />
        </group>
    );
});
