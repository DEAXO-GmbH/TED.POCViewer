/* eslint-disable react/no-unknown-property */
import React, { useMemo } from 'react';


const CANVAS_BASE_WIDTH = 100;
const CANVAS_BASE_HEIGHT = 100;

export const TextSprite = (props: any) => {
    const { fontSize = 100, color = 0x000088, children, position=[0, 0, 0], alignment='center', width=5, bgColor=0x000000, bgOpacity=0 } = props;

    const canvas = useMemo(() => {
        const CANVAS_WIDTH = CANVAS_BASE_WIDTH * width;
        const CANVAS_HEIGHT = CANVAS_BASE_HEIGHT;

        const spriteText = Array.isArray(children) ? children.join(' ') : children;

        const fontface = 'Arial';
        const borderThickness =  4;

        const canvas = document.createElement('canvas');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        const protoContext = canvas.getContext('2d');
        const context = protoContext!;

        if (bgOpacity > 0) {
            const opacity = (0xFF * bgOpacity).toString(16).slice(0, 2);
            const hexCode = bgColor.toString(16).padStart(6, '0');

            const fillStyle = `#${hexCode}${opacity}`;
            context.fillStyle = fillStyle;
            context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_BASE_HEIGHT);
        }

        context.textBaseline = 'middle';
        // context.font = `bold ${fontSize}px ${fontface}-apple-system, avenir, helvetica, roboto`;
        context.font = `bold ${fontSize}px ${fontface}-apple-system, avenir, helvetica, roboto`;

        const metrics = context.measureText(children);
        const textWidth = metrics.width;

        context.lineWidth = borderThickness;

        context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
        let textXcoordinate = 0;

        if (alignment === 'center') {
            textXcoordinate = (CANVAS_WIDTH - textWidth) / 2;
        }

        context.fillText(spriteText, textXcoordinate, 50);

        return canvas;
    }, [children, props]);


    return (
        <sprite scale={[width, 1, 1]} position={position}>
            <spriteMaterial attach="material" transparent alphaTest={0.5} >
                <canvasTexture attach="map" image={canvas} />
            </spriteMaterial>
        </sprite>
    );
};

export default TextSprite;
