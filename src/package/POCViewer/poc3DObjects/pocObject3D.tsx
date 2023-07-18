/* eslint-disable react/no-unknown-property */
import { IViewerPOC } from 'package/stores/POCViewerStore/types';
import React, { useMemo } from 'react';
import TextSprite from './basicObjects/textSprite';
import * as THREE from 'three';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { observer } from 'mobx-react';
import { POC_CRYSTAL_COLOR, POC_CRYSTAL_HOVER_COLOR, POC_CRYSTAL_LABEL_COLOR, POC_CRYSTAL_METRIC_COLOR, POC_CRYSTAL_METRIC_OVERLOAD_COLOR } from 'package/constants';



export const POCObject3D = observer(({ poc }: {poc: IViewerPOC}) => {
    const isHovered = pocViewerStore.hoveredPOCIds.has(poc.id);

    const pocBodyColor = isHovered ? POC_CRYSTAL_HOVER_COLOR : POC_CRYSTAL_COLOR;
    const mediaMetricColor = Number(poc.mediaCapacity) >= Number(poc.occupiedMediaCapacity) ? POC_CRYSTAL_METRIC_COLOR : POC_CRYSTAL_METRIC_OVERLOAD_COLOR;
    const physicalMetricColor = Number(poc.physicalCapacity) >= Number(poc.occupiedPhysicalCapacity) ? POC_CRYSTAL_METRIC_COLOR : POC_CRYSTAL_METRIC_OVERLOAD_COLOR;

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
                <meshLambertMaterial flatShading attach="material" color={pocBodyColor} clippingPlanes={capacityClippingPlane} />
            </mesh>

            <mesh geometry={new THREE.ConeGeometry(1, 2, 4)} position={[0, 2, 0]}>
                <meshLambertMaterial flatShading attach="material" color={pocBodyColor} clippingPlanes={capacityClippingPlane} />
            </mesh>

            <TextSprite color={POC_CRYSTAL_LABEL_COLOR} fontSize={55} position={[0, 4.6, 0]}>
                {poc.name}
            </TextSprite>

            <TextSprite color={mediaMetricColor} fontSize={40} position={[0, 4, 0]}>
                {poc.occupiedMediaCapacity} / {poc.mediaCapacity}
            </TextSprite>

            <TextSprite color={physicalMetricColor} fontSize={40} position={[0, 3.5, 0]}>
                {poc.occupiedPhysicalCapacity} / {poc.physicalCapacity}
            </TextSprite>
        </group>
    );
});
