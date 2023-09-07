/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useTriggerRerender } from 'package/hooks';

import { IViewerTool } from 'package/stores/POCViewerStore/types';

import { TOOL_COLOR, TOOL_DEFAULT_HEIGHT, TOOL_DEFAULT_LENGTH, TOOL_DEFAULT_WIDTH, TOOL_DIMENSIONS_GAP, TOOL_EDGES_COLOR, TOOL_NAME_COLOR, TOOL_SIZE_UNSPECIFIED_COLOR } from 'package/constants';

import { Box3, DoubleSide, EdgesGeometry, LineSegments, Mesh, Line, Object3D } from 'three';
import { Text } from './basicObjects/text';
import TextSprite from './basicObjects/textSprite';

import { layersWidgetStore } from 'package/stores/widgetStore';



interface IToolProps {
    tool: IViewerTool
}

export const Tool = observer(({ tool }: IToolProps) => {
    const triggerRerender = useTriggerRerender();
    const frontTextRef = useRef(null!);
    const toolBoxRef = useRef<Mesh>(null!);
    const [edgesLine, setEdgesLine] = useState<Line | null>(null);

    // If tool's height === 0, make it 1 and red
    const isHeightNull = tool.height === null || tool.height === undefined || tool.height === 0;
    const toolHeight = tool.height || TOOL_DEFAULT_HEIGHT;
    const toolWidth = tool.width || TOOL_DEFAULT_WIDTH;
    const toolLength = tool.length || TOOL_DEFAULT_LENGTH;
    const toolColor = isHeightNull ? TOOL_SIZE_UNSPECIFIED_COLOR : TOOL_COLOR;

    const textWidth = useMemo(() => {
        const textMesh = frontTextRef.current as null | Mesh;

        if (textMesh) {
            const boundingBox = new Box3().setFromObject(textMesh);
            const textWidth = boundingBox.max.x - boundingBox.min.x;
            return textWidth;
        }

        return undefined;
    }, [frontTextRef.current]);


    useEffect(() => {
        if (toolBoxRef.current === null) {
            return ;
        }

        const toolEdges = new EdgesGeometry(toolBoxRef.current.geometry);
        const toolEdgeLine = new LineSegments(toolEdges);
        toolEdgeLine.position.y += toolHeight / 2 + 0.1;
        // @ts-ignore
        toolEdgeLine.material.color = TOOL_EDGES_COLOR;

        setEdgesLine(toolEdgeLine);
    }, [toolBoxRef.current]);

    useEffect(() => {
        triggerRerender();
    }, []);

    const isTextOverflow = (textWidth === undefined ? false : textWidth > toolWidth) || (toolHeight < 2.5);

    return (
        <group position={[tool.position.x, 0, -tool.position.z]}>
            <mesh ref={toolBoxRef as any} position={[0, toolHeight / 2 + 0.1, 0]}>
                <boxGeometry args={[toolWidth - TOOL_DIMENSIONS_GAP, toolHeight, toolLength - TOOL_DIMENSIONS_GAP]} />
                <meshLambertMaterial color={toolColor} flatShading side={DoubleSide} transparent={true} opacity={layersWidgetStore.toolsTransparent ? 0.3 : 1} />
            </mesh>

            {edgesLine && <primitive object={edgesLine} />}

            <TextSprite fontSize={50} color={TOOL_NAME_COLOR} position={[0, toolHeight + 0.4, 0]}>
                {tool.name}
            </TextSprite>

            <>
                <group ref={frontTextRef} position={[-(textWidth || 0)/2, 1.5, toolLength/2 - TOOL_DIMENSIONS_GAP/2 - 0.05]}>
                    <Text size={isTextOverflow ? 0 : 0.5} text={tool.name} color={TOOL_NAME_COLOR} />
                </group>

                <group rotation={[0, Math.PI, 0]} position={[(textWidth || 0)/2, 1.5, -toolLength/2 + TOOL_DIMENSIONS_GAP/2 - 0.05]}>
                    <Text size={isTextOverflow ? 0 : 0.5} text={tool.name} color={TOOL_NAME_COLOR} />
                </group>
            </>
        </group>
    );
});
