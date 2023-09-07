/* eslint-disable react/no-unknown-property */
import { DEFAULT_POC_NAME } from 'package/constants';
import { IPocDTO } from 'package/stores/POCViewerStore/types';
import React, { useMemo } from 'react';
import { Vector3 } from 'three';


const CANVAS_BASE_WIDTH = 500;
const CANVAS_BASE_HEIGHT = 270;

const POC_DATA_OVERFLOW_COLOR = '#FF0000';
const POC_DATA_NORMAL_COLOR = '#777777';

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
        const maxPOCShow = 3;

        let currentYOffset = fontSize + 8;
        let pocIndex = 0;
        for (const poc of pocs) {
            context.fillStyle = '#FFFFFF';
            context.font = `${fontSize}px Arial, avenir, helvetica, roboto`;

            const pocDisplayName = poc.name || DEFAULT_POC_NAME;

            context.fillText(`${pocDisplayName}`, 10, currentYOffset);

            const mediaCapacityNumber = Number(poc.mediaCapacity) || 0;
            const occupiedMediaCapacityNumber = Number(poc.occupiedMediaCapacity) || 0;
            const physicalCapacityNumber = Number(poc.physicalCapacity) || 0;
            const occupiedPhysicalCapacityNumber = Number(poc.occupiedPhysicalCapacity) || 0;

            const isMediaOverflow = occupiedMediaCapacityNumber > mediaCapacityNumber;
            const isPhysicalOverflow = occupiedPhysicalCapacityNumber > physicalCapacityNumber;

            context.font = `${fontSize - 5}px Arial, avenir, helvetica, roboto`;

            const physicalCapacityText = `P: ${poc.occupiedPhysicalCapacity || 0} / ${poc.physicalCapacity || 0}`;
            const mediaCapacityText = `M: ${poc.occupiedMediaCapacity || 0} / ${poc.mediaCapacity || 0} ${poc.unitSymbol}`;


            context.fillStyle = isPhysicalOverflow ? POC_DATA_OVERFLOW_COLOR : POC_DATA_NORMAL_COLOR;
            context.fillText(
                physicalCapacityText,
                10,
                currentYOffset + fontSize + 2
            );

            context.fillStyle = isMediaOverflow ? POC_DATA_OVERFLOW_COLOR : POC_DATA_NORMAL_COLOR;
            context.fillText(
                mediaCapacityText,
                CANVAS_BASE_WIDTH - 320,
                currentYOffset + fontSize + 2
            );

            currentYOffset += fontSize * 2 + 15;
            pocIndex++;


            if (pocIndex + 1 > maxPOCShow) {
                context.font = `${fontSize}px Arial, avenir, helvetica, roboto`;
                context.fillStyle = '#777799';
                context.fillText(`And ${pocs.length - maxPOCShow} more...`, 10, CANVAS_BASE_HEIGHT - 15);
                break;
            }
        }

        if (pocs.length === 0) {
            context.font = `${35}px Arial, avenir, helvetica, roboto`;
            context.fillStyle = '#999999';
            const width = context.measureText('No POC data').width;
            context.fillText('No POC data', (CANVAS_BASE_WIDTH / 2) - width / 2, 100);
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
