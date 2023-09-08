/* eslint-disable react/no-unknown-property */
import React, { useMemo } from 'react';
import { Vector3 } from 'three';


const CANVAS_BASE_WIDTH = 420;
const CANVAS_BASE_HEIGHT = 160;

interface IPOCLabelProps {
    mediaCapacity: string
    occupiedMediaCapacity: string
    physicalCapacity: string
    occupiedPhysicalCapacity: string
    pocName: string
    unit: string
}

export const POCLabel = ({ mediaCapacity, occupiedMediaCapacity, occupiedPhysicalCapacity, physicalCapacity, pocName, unit }: IPOCLabelProps) => {
    const position = new Vector3(0, 4, 0);

    const canvas = useMemo(() => {
        const CANVAS_WIDTH = CANVAS_BASE_WIDTH;
        const CANVAS_HEIGHT = CANVAS_BASE_HEIGHT;

        const canvas = document.createElement('canvas');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        const protoContext = canvas.getContext('2d');
        const context = protoContext!;

        const mediaCapacityNumber = Number(mediaCapacity);
        const occupiedMediaCapacityNumber = Number(occupiedMediaCapacity);
        const physicalCapacityNumber = Number(physicalCapacity);
        const occupiedPhysicalCapacityNumber = Number(occupiedPhysicalCapacity);

        const isMediaOverflow = occupiedMediaCapacityNumber > mediaCapacityNumber;
        const isPhysicalOverflow = occupiedPhysicalCapacityNumber > physicalCapacityNumber;

        const OVERFLOW_COLOR = '#FF2222';
        const NORMAL_COLOR = '#AAAAAA';

        context.fillStyle = '#00000060';
        context.fillRect(0, 0, CANVAS_BASE_WIDTH, CANVAS_BASE_HEIGHT);

        context.fillStyle = '#FFFFFF';
        context.font = 'bold 50px Arial, avenir, helvetica, roboto';
        context.fillText(pocName, 10, 50);

        context.fillStyle = isMediaOverflow ? OVERFLOW_COLOR : NORMAL_COLOR;
        context.font = 'bold 30px Arial, avenir, helvetica, roboto';
        context.fillText(`M: ${occupiedMediaCapacity} / ${mediaCapacity} ${unit}`, 10, 100);

        context.fillStyle = isPhysicalOverflow ? OVERFLOW_COLOR : NORMAL_COLOR;
        context.font = 'bold 30px Arial, avenir, helvetica, roboto';
        context.fillText(`P: ${occupiedPhysicalCapacity} / ${physicalCapacity}`, 10, 140);

        return canvas;
    }, [{}]);


    return (
        <sprite scale={[CANVAS_BASE_WIDTH / 100, CANVAS_BASE_HEIGHT / 100, 1]} position={position}>
            <spriteMaterial opacity={1} attach="material" transparent alphaTest={0} >
                <canvasTexture attach="map" image={canvas} />
            </spriteMaterial>
        </sprite>
    );
};

export default POCLabel;
