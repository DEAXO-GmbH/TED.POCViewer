/* eslint-disable react/no-unknown-property */
import { IPocDTO } from 'package/stores/POCViewerStore/types';
import React, { useMemo } from 'react';
import { Vector3 } from 'three';


const CANVAS_BASE_WIDTH = 300;
const CANVAS_BASE_HEIGHT = 250;

interface IPOCCellLabelProps {
    pocs: IPocDTO[]
}

export const POCCellLabel = ({ pocs }: IPOCCellLabelProps) => {
    const position = new Vector3(0, 4, 0);

    const canvas = useMemo(() => {
        const CANVAS_WIDTH = CANVAS_BASE_WIDTH;
        const CANVAS_HEIGHT = CANVAS_BASE_HEIGHT;

        const canvas = document.createElement('canvas');
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        const protoContext = canvas.getContext('2d');
        const context = protoContext!;

        context.fillStyle = '#00000060';
        context.fillRect(0, 0, CANVAS_BASE_WIDTH, CANVAS_BASE_HEIGHT);

        const fontSize = 27;
        const maxPOCShow = 6;
        context.font = `${fontSize}px Arial, avenir, helvetica, roboto`;
        context.fillStyle = '#FFFFFF';

        let currentYOffset = fontSize + 8;
        let pocIndex = 0;
        for (const poc of pocs) {
            context.fillText(`${poc.name}`, 10, currentYOffset);
            currentYOffset += fontSize + 5;
            pocIndex++;

            if (pocIndex + 1 > maxPOCShow) {
                context.fillStyle = '#777799';
                context.fillText(`And ${pocs.length - maxPOCShow} more...`, 10, CANVAS_BASE_HEIGHT - 15);
                break;
            }
        }

        if (pocs.length === 0) {
            context.font = `${35}px Arial, avenir, helvetica, roboto`;
            context.fillText('No POC data', 45, 100);
        }

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

export default POCCellLabel;
