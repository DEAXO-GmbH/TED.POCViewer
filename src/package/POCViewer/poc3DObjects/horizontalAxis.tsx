/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Euler, LineBasicMaterial, Vector3 } from 'three';
import { Circle } from './basicObjects/circle';
import { Line } from './basicObjects/line';
import { Text } from './basicObjects/text';
import { IHorizontalAxis } from 'package/stores/POCViewerStore/types';
import { pocViewerStore } from 'package/stores/POCViewerStore';



const HorizontalAxis = (props: {horizontalAxis: IHorizontalAxis}) => {
    // the offset fr
    const position = new Vector3(0, props.horizontalAxis.distance, 0);

    const text = props.horizontalAxis.name;
    const length = pocViewerStore.planesWidth;

    const radius = 1;
    const color = 0x000000;
    const textSize = 1;
    const axisLabelOffset = 3;

    return (
        <group
            rotation={new Euler(1.5 * Math.PI, 0, 0)}
        >
            <Circle
                color={color}
                radius={radius}
                position={
                    new Vector3(
                        position.x + axisLabelOffset  + length + radius,
                        position.y,
                        position.z)
                }
            />
            <Text
                text={text}
                color={color}
                position={
                    new Vector3(
                        position.x + axisLabelOffset  + length + radius - textSize/2.2,
                        position.y - textSize/2.2,
                        position.z
                    )}
                size ={textSize}
            />

            <Line
                color={color}
                startPoint={new Vector3(position.x - axisLabelOffset ,position.y,position.z)}
                endPoint={new Vector3(position.x + axisLabelOffset + length,position.y,position.z)}
            />

            <Circle
                color={color}
                radius={radius}
                position={
                    new Vector3(
                        position.x - axisLabelOffset - radius,
                        position.y,
                        position.z
                    )
                }
            />
            <Text
                text={text}
                color={color}
                position={
                    new Vector3(
                        position.x - axisLabelOffset - radius - textSize/2.2,
                        position.y - textSize/2.2,
                        position.z
                    )}
                size ={textSize}
            />
        </group>

    );
};

export default HorizontalAxis;
