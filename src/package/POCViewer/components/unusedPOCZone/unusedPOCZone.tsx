/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Plane } from '@react-three/drei';
import { Euler } from 'three';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { OUTER_PLANE_EXTRA_PADDING, UNUSED_POC_ZONE_COLOR, UNUSED_POC_ZONE_LEFT_OFFSET } from 'package/constants';



export const UnusedPOCZone = () => {
    const levelPlaneSoze = pocViewerStore.planesWidth + OUTER_PLANE_EXTRA_PADDING;

    const pocZonePlaneSize = 6;
    const pocZonePositionX = levelPlaneSoze / 2 + pocZonePlaneSize / 2 + UNUSED_POC_ZONE_LEFT_OFFSET; // TODO Use constants

    return (
        <Plane
            args={[pocZonePlaneSize, pocZonePlaneSize]}
            rotation={new Euler(1.5 * Math.PI, 0, 0)}
            position={[pocZonePositionX, -0.1, 0]}
        >
            <meshBasicMaterial attach="material" color={UNUSED_POC_ZONE_COLOR} opacity={1} transparent={true} />
        </Plane>
    );
};
