/* eslint-disable react/no-unknown-property */
import React, { Suspense, useRef, useMemo } from 'react';
import { Euler, DoubleSide, Vector3 } from 'three';
import { Plane, Text } from '@react-three/drei';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { ILevelPlane } from 'package/stores/POCViewerStore/types';
import { observer } from 'mobx-react';
import HorizontalAxis from './horizontalAxis';
import { VerticalAxis } from './verticalAxis';
import { layersWidgetStore } from 'package/stores/widgetStore';
import { LEVEL_EDGE_HIGHLIGHT_COLOR, LEVEL_PLANE_INNER_COLOR, LEVEL_PLANE_LABEL_COLOR, LEVEL_PLANE_OUTER_COLOR, LEVEL_PLANE_OUTER_SECOND_COLOR, OUTER_PLANE_EXTRA_PADDING } from 'package/constants';
import { Tool } from './tool';
import { POCCell } from './pocCell';
import { Line } from './basicObjects/line';



export const LevelPlane = observer((props: {levelPlane: ILevelPlane}) => {
    const position = new Vector3(0, props.levelPlane.distance, 0);
    const planePosition = new Vector3(pocViewerStore.planesWidth / 2, 0, -pocViewerStore.planesLength / 2);
    const textScale = 15;

    const levelVisibilityOptions = useMemo(() => layersWidgetStore.getLevelOptionsById(props.levelPlane.id), [layersWidgetStore.layerVisibilityOptions]);

    const isBottommostPlane = pocViewerStore.levelPlanes[0] === props.levelPlane;
    const isPlaneIndexEven = pocViewerStore.levelPlanes.indexOf(props.levelPlane) % 2 === 0;

    const innerPlaneOpacity = isBottommostPlane ? 1 : 0.5;
    const outerPlaneOpacity = isBottommostPlane ? 1 : 0.5;
    const outerPlaneColor = isPlaneIndexEven ? LEVEL_PLANE_OUTER_COLOR : LEVEL_PLANE_OUTER_SECOND_COLOR;

    const outerPlaneWidth = pocViewerStore.planesWidth + OUTER_PLANE_EXTRA_PADDING;
    const outerPlaneLength = pocViewerStore.planesLength + OUTER_PLANE_EXTRA_PADDING;

    const planeGroupRef = useRef<any>(null);

    const LEVEL_EDGE_LINE_OFFSET = 7;
    const planeEdgeLineP1 = new Vector3(0 - LEVEL_EDGE_LINE_OFFSET, 0, 0 + LEVEL_EDGE_LINE_OFFSET);
    const planeEdgeLineP2 = new Vector3(0 - LEVEL_EDGE_LINE_OFFSET, 0, -pocViewerStore.planesLength - LEVEL_EDGE_LINE_OFFSET);
    const planeEdgeLineP3 = new Vector3(pocViewerStore.planesWidth + LEVEL_EDGE_LINE_OFFSET, 0, -pocViewerStore.planesLength - LEVEL_EDGE_LINE_OFFSET);

    return (
        <group
            position={position}
            ref={planeGroupRef}
        >
            <Line
                color={LEVEL_EDGE_HIGHLIGHT_COLOR}
                startPoint={planeEdgeLineP1}
                endPoint={planeEdgeLineP2}
            />
            <Line
                color={LEVEL_EDGE_HIGHLIGHT_COLOR}
                startPoint={planeEdgeLineP2}
                endPoint={planeEdgeLineP3}
            />

            {
                !levelVisibilityOptions.planeHidden &&
                <group position={planePosition}>
                    <Plane
                        args={[pocViewerStore.planesWidth, pocViewerStore.planesLength]}
                        rotation={new Euler(1.5 * Math.PI, 0, 0)}
                        position={[0, 0, 0]}
                    >
                        <meshBasicMaterial attach="material" color={LEVEL_PLANE_INNER_COLOR} opacity={innerPlaneOpacity} transparent={true} side={DoubleSide} />
                    </Plane>

                    <Plane
                        args={[outerPlaneWidth, outerPlaneLength]}
                        rotation={new Euler(1.5 * Math.PI, 0, 0)}
                        position={[0, -0.1, 0]}
                    >
                        <meshBasicMaterial attach="material" color={outerPlaneColor} opacity={outerPlaneOpacity} transparent={true} side={DoubleSide} />
                    </Plane>

                </group>
            }
            <Suspense fallback={<></>}>
                <Text
                    color={LEVEL_PLANE_LABEL_COLOR}
                    outlineWidth = {0}
                    anchorX="right"
                    anchorY="bottom"
                    position={[0 - LEVEL_EDGE_LINE_OFFSET - 1, -0.5, 0 + LEVEL_EDGE_LINE_OFFSET]}
                    scale={[textScale, textScale, textScale]}
                    fillOpacity={1}
                >
                    {props.levelPlane.levelName}
                </Text>

                <Text
                    color={LEVEL_PLANE_LABEL_COLOR}
                    outlineWidth = {0}
                    anchorX="right"
                    anchorY="bottom"
                    position={[outerPlaneWidth -  0.5 * LEVEL_EDGE_LINE_OFFSET + 1.5, -0.5, -outerPlaneLength + LEVEL_EDGE_LINE_OFFSET / 2]}
                    scale={[textScale, textScale, textScale]}
                    rotation={[0, Math.PI, 0]}
                    fillOpacity={1}
                >
                    {props.levelPlane.levelName}
                </Text>
            </Suspense>

            <group>
                {levelVisibilityOptions.pocsHidden || pocViewerStore.getAllPOCCells(props.levelPlane.id).map((pocCell, i) => {
                    return <POCCell pocCell={pocCell} key={i} />;
                })}

                {levelVisibilityOptions.axesHidden || pocViewerStore.horizontalAxis.map((axis, i) => <HorizontalAxis key={i} horizontalAxis={axis} />)}
                {levelVisibilityOptions.axesHidden || pocViewerStore.verticalAxis.map((axis, i) => <VerticalAxis key={i} verticalAxis={axis} />)}

                {levelVisibilityOptions.toolsHidden || pocViewerStore.tools.filter(tool => tool.level.id === props.levelPlane.id).map((tool, i) => <Tool key={i} tool={tool} />)}
            </group>
        </group>
    );
});
