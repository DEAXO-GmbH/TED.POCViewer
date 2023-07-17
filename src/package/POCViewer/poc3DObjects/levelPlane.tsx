/* eslint-disable react/no-unknown-property */
import React, { Suspense, useRef } from 'react';
import { Euler, DoubleSide, Vector3, Object3D } from 'three';
import { Plane, Text } from '@react-three/drei';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { ILevelPlane } from 'package/stores/POCViewerStore/types';
import { observer } from 'mobx-react';
import HorizontalAxis from './horizontalAxis';
import { VerticalAxis } from './verticalAxis';
import { POCObject3D } from './pocObject3D';
import { widgetStore } from 'package/stores/widgetStore';
import { LEVEL_PLANE_INNER_COLOR, LEVEL_PLANE_LABEL_COLOR, LEVEL_PLANE_OUTER_COLOR, LEVEL_PLANE_OUTER_SECOND_COLOR } from 'package/constants';



export const LevelPlane = observer((props: {levelPlane: ILevelPlane}) => {
    const position = new Vector3(0, props.levelPlane.distance, 0);
    const planePosition = new Vector3(pocViewerStore.planesWidth / 2, 0, -pocViewerStore.planesLength / 2);
    const textScale = 15;
    const hidden = widgetStore.hiddenLayers.has(props.levelPlane.id);

    const isBottommostPlane = pocViewerStore.levelPlanes[0] === props.levelPlane;
    const isPlaneIndexEven = pocViewerStore.levelPlanes.indexOf(props.levelPlane) % 2 === 0;

    const innerPlaneOpacity = isBottommostPlane ? 1 : 0.8;
    const outerPlaneOpacity = isBottommostPlane ? 1 : 0.7;
    const outerPlaneColor = isPlaneIndexEven ? LEVEL_PLANE_OUTER_COLOR : LEVEL_PLANE_OUTER_SECOND_COLOR;


    const planeGroupRef = useRef<any>(null);

    if (hidden) {
        return null;
    }


    return (
        <group
            position={position}
            ref={planeGroupRef}
            onClick={e => {
                // console.log(props.levelPlane.levelName, planeGroupRef.current);
                // console.log('pocs: ', pocViewerStore.getAllLevelPOCs(props.levelPlane.id));
                // e.stopPropagation();
            }}
        >
            <group position={planePosition}>
                <Plane
                    args={[pocViewerStore.planesWidth, pocViewerStore.planesLength]}
                    rotation={new Euler(1.5 * Math.PI, 0, 0)}
                    position={[0, 0, 0]}
                >
                    <meshBasicMaterial attach="material" color={LEVEL_PLANE_INNER_COLOR} opacity={innerPlaneOpacity} transparent={true} side={DoubleSide} />
                </Plane>

                <Plane
                    args={[pocViewerStore.planesWidth + 12, pocViewerStore.planesLength + 12]}
                    rotation={new Euler(1.5 * Math.PI, 0, 0)}
                    position={[0, -0.1, 0]}
                >
                    <meshBasicMaterial attach="material" color={outerPlaneColor} opacity={outerPlaneOpacity} transparent={true} side={DoubleSide} />
                </Plane>

                <Suspense fallback={<></>}>
                    <Text
                        color={LEVEL_PLANE_LABEL_COLOR}
                        outlineWidth = {0}
                        anchorX="right"
                        anchorY="bottom"
                        position={[-(pocViewerStore.planesWidth + 16) / 2, 0, (pocViewerStore.planesLength + 12) / 2]}
                        scale={[textScale, textScale, textScale]}
                        fillOpacity={1}
                    >
                        {props.levelPlane.levelName}
                    </Text>
                </Suspense>
            </group>

            <group>
                {pocViewerStore.getAllLevelPOCs(props.levelPlane.id).map((poc, i) => {
                    return <POCObject3D poc={poc} key={i} />;
                })}
                {pocViewerStore.horizontalAxis.map((axis, i) => <HorizontalAxis key={i} horizontalAxis={axis} />)}
                {pocViewerStore.verticalAxis.map((axis, i) => <VerticalAxis key={i} verticalAxis={axis} />)}
            </group>
        </group>
    );
});
