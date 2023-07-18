/* eslint-disable react/no-unknown-property */
import React, { useMemo } from 'react';


const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 100;

export const TextSprite = (props: any) => {
    const { fontSize = 100, color = 0x000088, children, position=[0, 0, 0] } = props;

    const canvas = useMemo(() => {
        const spriteText = Array.isArray(children) ? children.join(' ') : children;

        const fontface = 'Arial';
        const borderThickness =  4;

        const canvas = document.createElement('canvas');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        const protoContext = canvas.getContext('2d');
        const context = protoContext!;

        context.textBaseline = 'middle';
        // context.font = `bold ${fontSize}px ${fontface}-apple-system, avenir, helvetica, roboto`;
        context.font = `bold ${fontSize}px ${fontface}-apple-system, avenir, helvetica, roboto`;

        const metrics = context.measureText(children);
        const textWidth = metrics.width;

        context.lineWidth = borderThickness;

        context.fillStyle = `#${color.toString(16)}`;
        // context.fillText(children, textWidth * 1.2 - (textWidth*0.8), fontSize);
        context.fillText(spriteText, (CANVAS_WIDTH - textWidth) / 2, 50);

        return canvas;
    }, [children]);


    return (
        <sprite scale={[5, 1, 1]} position={position}>
            <spriteMaterial attach="material" transparent alphaTest={0.5} >
                <canvasTexture attach="map" image={canvas} />
            </spriteMaterial>
        </sprite>
    );
};

export default TextSprite;
