/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo, useEffect } from 'react';
import { IViewerTool } from 'package/stores/POCViewerStore/types';
import { TOOL_COLOR, TOOL_DIMENSIONS_GAP, TOOL_NAME_COLOR } from 'package/constants';
import { Box3, DoubleSide, Mesh } from 'three';
import { Text } from './basicObjects/text';
import TextSprite from './basicObjects/textSprite';
import { useTriggerRerender } from 'package/hooks';



interface IToolProps {
    tool: IViewerTool
}

export const Tool = ({ tool }: IToolProps) => {
    const triggerRerender = useTriggerRerender();
    const frontTextRef = useRef(null!);

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
        triggerRerender();
    }, []);

    const isTextOverflow = (textWidth === undefined ? false : textWidth > tool.width) || (tool.height < 2.5);

    return (
        <group position={[tool.position.x, 0, -tool.position.z]}>
            <mesh position={[0, tool.height / 2 + 0.1, 0]}>
                <boxGeometry args={[tool.width - TOOL_DIMENSIONS_GAP, tool.height, tool.length - TOOL_DIMENSIONS_GAP]} />
                <meshLambertMaterial color={TOOL_COLOR} flatShading side={DoubleSide} />
            </mesh>

            {
                isTextOverflow ?
                    <TextSprite fontSize={50} color={TOOL_NAME_COLOR} position={[0, tool.height + 0.4, 0]}>
                        {tool.name}
                    </TextSprite>
                    :
                    <>
                        <group ref={frontTextRef} position={[-(textWidth || 0)/2, 1.5, tool.length/2 - TOOL_DIMENSIONS_GAP/2 - 0.05]}>
                            <Text size={0.5} text={tool.name} color={TOOL_NAME_COLOR} />
                        </group>

                        <group rotation={[0, Math.PI, 0]} position={[(textWidth || 0)/2, 1.5, -tool.length/2 + TOOL_DIMENSIONS_GAP/2 - 0.05]}>
                            <Text size={0.5} text={tool.name} color={TOOL_NAME_COLOR} />
                        </group>
                    </>
            }
        </group>
    );
};
