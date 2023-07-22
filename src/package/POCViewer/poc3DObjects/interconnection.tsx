/* eslint-disable react/no-unknown-property */
import React, {  } from 'react';
import { IViewerTool } from 'package/stores/POCViewerStore/types';
import { Color, Vector2 } from 'three';
import { INTERCONNECTION_COLOR } from 'package/constants';



interface IPOCAndToolConnection {
    firstTool: IViewerTool
    secondTool: IViewerTool
}

export const Interconnection = ({ firstTool, secondTool }: IPOCAndToolConnection) => {
    const points = [
        firstTool.position.x,
        firstTool.position.y + 1,
        -firstTool.position.z,
        secondTool.position.x,
        secondTool.position.y + 1,
        -secondTool.position.z,
    ];

    return (
        <>
            <mesh>
                <meshLineGeometry points={points}/>
                <meshLineMaterial
                    color={new Color(INTERCONNECTION_COLOR)}
                    resolution={new Vector2(121, 121)}
                    lineWidth={0.5}
                />
            </mesh>
        </>
    );
};
