/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Euler, Vector3 } from 'three';
import { Circle } from './basicObjects/circle';
import { Line } from './basicObjects/line';
import { Text } from './basicObjects/text';
import { IHorizontalAxis } from 'package/stores/POCViewerStore/types';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { AXES_COLOR, AXES_LABEL_OFFSET, AXES_LABEL_RADIUS } from 'package/constants';
import { observer } from 'mobx-react';



const HorizontalAxis = observer((props: {horizontalAxis: IHorizontalAxis}) => {
    const position = new Vector3(0, props.horizontalAxis.distance, 0);
    // const ref = useRef();

    const text = props.horizontalAxis.name;
    const length = pocViewerStore.planesWidth;

    const radius = AXES_LABEL_RADIUS;
    const axisLabelOffset = AXES_LABEL_OFFSET;

    const color = AXES_COLOR;
    const textSize = 1;

    return (
        <group
            rotation={new Euler(1.5 * Math.PI, 0, 0)}
        >
            <Circle
                /**ToDo: Do we need this ref here? If its redundant, we should remove it  */
                //ref={ref}
                color={color}
                radius={radius}
                position={new Vector3(
                    position.x + axisLabelOffset  + length + radius,
                    position.y,
                    position.z
                )}
            />
            <Text
                text={text}
                color={color}
                position={new Vector3(
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
});

export default HorizontalAxis;
