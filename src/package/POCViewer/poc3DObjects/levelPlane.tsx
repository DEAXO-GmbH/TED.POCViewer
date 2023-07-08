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
                // console.log(props.levelPlane.levelName, planeGroupRef.current);
                // console.log('pocs: ', pocViewerStore.getAllLevelPOCs(props.levelPlane.id));
                // e.stopPropagation();
            }}
        >
            <Plane
                args={[pocViewerStore.planesWidth, pocViewerStore.planesLength]}
                rotation={new Euler(1.5 * Math.PI, 0, 0)}
                position={[0, 0, 0]}
            >
                <meshBasicMaterial attach="material" color={color} opacity={0.8} transparent={true} side={DoubleSide} />
            </Plane>

            <Plane
                args={[pocViewerStore.planesWidth + 12, pocViewerStore.planesLength + 12]}
                rotation={new Euler(1.5 * Math.PI, 0, 0)}
                position={[0, -0.1, 0]}
            >
                <meshBasicMaterial attach="material" color={0x8899CC} opacity={0.7} transparent={true} side={DoubleSide} />
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

            <group position={new Vector3(-pocViewerStore.planesWidth / 2, 0, pocViewerStore.planesLength / 2)}>
                {pocViewerStore.getAllLevelPOCs(props.levelPlane.id).map((poc, i) => {
                    return <POCObject3D poc={poc} key={i} />;
                })}
                {pocViewerStore.horizontalAxis.map((axis, i) => <HorizontalAxis key={i} horizontalAxis={axis} />)}
                {pocViewerStore.verticalAxis.map((axis, i) => <VerticalAxis key={i} verticalAxis={axis} />)}
            </group>
        </group>
    );
});
