/* eslint-disable react/no-unknown-property */
import React, { useMemo } from 'react';
import { Vector3 } from 'three';

export const TextSprite = (props: any) => {
    const { fontSize = 100, color = 0x000088, children, position=[0, 0, 0] } = props;

    const canvas = useMemo(() => {
        const fontface = 'Arial';
        const borderThickness =  4;

        const canvas = document.createElement('canvas');
        const protoContext = canvas.getContext('2d');
        const context = protoContext!;
        context.textBaseline = 'middle';
        context.font = `bold ${fontSize}px -apple-system, avenir, helvetica, roboto`;

        const metrics = context.measureText(children);
        const textWidth = metrics.width;

        context.lineWidth = borderThickness;

        context.fillStyle = color;
        context.fillText(children, textWidth * 1.2 - (textWidth*0.8), fontSize);

        return canvas;
    }, [children]);


    return (
        <sprite
            scale={[1, 1, 1]} position={position}>
            <spriteMaterial attach="material" transparent alphaTest={0.1} >
                <canvasTexture attach="map" image={canvas} />
            </spriteMaterial>
        </sprite>
    );
};

export default TextSprite;
