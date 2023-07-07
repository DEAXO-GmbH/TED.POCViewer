/* eslint-disable react/no-unknown-property */
import React, { Suspense, useRef } from 'react';
import { Euler, DoubleSide, Vector3, Object3D } from 'three';
import { Plane, Text } from '@react-three/drei';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { ILevelPlane } from 'package/stores/POCViewerStore/types';
import { observer } from 'mobx-react';
import HorizontalAxis from './horizontalAxis';
import { VerticalAxis } from './verticalAxis';



export const LevelPlane = observer((props: {levelPlane: ILevelPlane}) => {
    const position = new Vector3(0, props.levelPlane.distance, 0);
    const color = 0xAAAAFF;
    const textScale = 15;
    const planeOffset = 10;

    const planeGroupRef = useRef<any>(null);


    return (
        <group
            position={position}
            ref={planeGroupRef}
            onClick={e => {
                console.log(props.levelPlane.levelName, planeGroupRef.current);
                e.stopPropagation();
            }}
            // onPointerMove={e => {
            //     console.log(props.levelPlane.levelName, planeGroupRef.current);
            //     e.stopPropagation();
            // }}
        >
            <Plane
                args={[pocViewerStore.planesWidth, pocViewerStore.planesLength]}
                rotation={new Euler(1.5 * Math.PI, 0, 0)}
                position={[0, 0, 0]}
            >
                <meshBasicMaterial attach="material" color={color} opacity={0.8} transparent={true} side={DoubleSide} />
            </Plane>

            <Plane
                args={[pocViewerStore.planesWidth + 10, pocViewerStore.planesLength + 10]}
                rotation={new Euler(1.5 * Math.PI, 0, 0)}
                position={[0, -0.1, 0]}
            >
                <meshBasicMaterial attach="material" color={color} opacity={0.5} transparent={true} side={DoubleSide} />
            </Plane>

            <Suspense fallback={<></>}>
                <Text
                    color={0x000000}
                    outlineWidth = {0}
                    anchorX="right"
                    anchorY="bottom"
                    position={[-(pocViewerStore.planesWidth + 10) / 2, 0, (pocViewerStore.planesLength + 10) / 2]}
                    scale={[textScale, textScale, textScale]}
                    fillOpacity={1}
                >
                    {props.levelPlane.levelName}
                </Text>
            </Suspense>

            {pocViewerStore.horizontalAxis.map((axis, i) => <HorizontalAxis key={i} horizontalAxis={axis} />)}
            {pocViewerStore.verticalAxis.map((axis, i) => <VerticalAxis key={i} verticalAxis={axis} />)}
        </group>
    );
});
