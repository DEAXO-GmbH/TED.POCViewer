/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Euler, Vector3 } from 'three';
import { Circle } from './basicObjects/circle';
import { Line } from './basicObjects/line';
import { Text } from './basicObjects/text';
import { IVerticalAxis } from 'package/stores/POCViewerStore/types';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { observer } from 'mobx-react';
import { AXES_COLOR, AXES_LABEL_OFFSET, AXES_LABEL_RADIUS } from 'package/constants';


export const VerticalAxis = observer((props: {verticalAxis: IVerticalAxis}) => {
    const position = new Vector3(props.verticalAxis.distance, 0, 0);
    const text = props.verticalAxis.name;
    const length = pocViewerStore.planesLength;

    const color = AXES_COLOR;
    const textSize = 1;

    const radius = AXES_LABEL_RADIUS;
    const axisLabelOffset = AXES_LABEL_OFFSET;

    return (
        <group
            rotation={new Euler(1.5 * Math.PI, 0, 0)}
        >
            <Circle
                color={color}
                radius={radius}
                position={
                    new Vector3(
                        position.x,
                        position.y + axisLabelOffset + length + radius,
                        position.z
                    )
                }
            />
            <Text
                text={text}
                color={color}
                position={
                    new Vector3(
                        position.x - textSize/2.2,
                        position.y + axisLabelOffset + length + radius - textSize/2.2,
                        position.z
                    )}
                size ={textSize}
            />

            <Line color={color}
                startPoint={new Vector3(position.x, position.y - axisLabelOffset ,position.z)}
                endPoint={new Vector3(position.x, position.y + axisLabelOffset + length,position.z)}
            />

            <Circle
                color={color}
                radius={radius}
                position={
                    new Vector3(
                        position.x,
                        position.y - axisLabelOffset - radius,
                        position.z
                    )
                }
            />
            <Text
                text={text}
                color={color}
                position={
                    new Vector3(
                        position.x - textSize/2.2,
                        position.y - axisLabelOffset - radius - textSize/2.2,
                        position.z
                    )}
                size ={textSize}
            />
        </group>

    );
});
