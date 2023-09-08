/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Plane } from '@react-three/drei';
import { Euler } from 'three';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { OUTER_PLANE_EXTRA_PADDING, UNUSED_POC_ZONE_COLOR, UNUSED_POC_ZONE_GAP, UNUSED_POC_ZONE_LEFT_OFFSET, UNUSED_POC_ZONE_PLANE_PADDING, UNUSED_POC_ZONE_TITLE_LABEL_COLOR } from 'package/constants';
import { POCUnusedObject3D } from 'package/POCViewer/poc3DObjects/pocUnusedObject.3D';
import TextSprite from '../../poc3DObjects/basicObjects/textSprite';



export const UnusedPOCZone = () => {
    const levelPlaneSize = pocViewerStore.planesWidth + OUTER_PLANE_EXTRA_PADDING;

    const pocPerLine = pocViewerStore.unusedPOCsPerLine; // AAA
    const unusedPOCSize = 2; // How much of a square it takes

    const pocZonePlaneSize = pocPerLine * unusedPOCSize + (pocPerLine - 1) * UNUSED_POC_ZONE_GAP;
    const pocZonePlaneSizeWithOffset = pocZonePlaneSize + UNUSED_POC_ZONE_PLANE_PADDING * 2; // Width/length of the zone's plane
    const pocZonePositionX = levelPlaneSize / 2 + pocZonePlaneSizeWithOffset / 2 + UNUSED_POC_ZONE_LEFT_OFFSET; // zone plane's position
    const pocPointsPlaneSize = pocZonePlaneSize - unusedPOCSize;

    if (pocViewerStore.unusedPOCs.length === 0) { // AAA
        return null;
    }

    return (
        <group position={[pocZonePositionX, -0.1, 0]}>
            <Plane
                args={[pocZonePlaneSizeWithOffset, pocZonePlaneSizeWithOffset]}
                rotation={new Euler(1.5 * Math.PI, 0, 0)}
                position={[0, 0, 0]}
            >
                <meshBasicMaterial attach="material" color={UNUSED_POC_ZONE_COLOR} opacity={0.5} transparent={true} />
            </Plane>

            {
                pocViewerStore.unusedPOCs.map((poc, index) => { // AAA
                    const row = Math.floor(index / pocPerLine);
                    const col = index % pocPerLine;

                    const z = -1 * row * unusedPOCSize - row * UNUSED_POC_ZONE_GAP + pocPointsPlaneSize / 2;
                    const x = col * unusedPOCSize + col * UNUSED_POC_ZONE_GAP - pocPointsPlaneSize / 2;

                    return <POCUnusedObject3D poc={poc} position={{ x, y: 0, z }} key={poc.id} />;
                })
            }

            <TextSprite position={[0, 10, 0]} width={10} fontSize={100} color={UNUSED_POC_ZONE_TITLE_LABEL_COLOR} >
                Unplaced POCs
            </TextSprite>
        </group>
    );
};
