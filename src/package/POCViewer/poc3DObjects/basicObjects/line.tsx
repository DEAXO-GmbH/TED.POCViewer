/* eslint-disable react/no-unknown-property */
import React, { useLayoutEffect } from 'react';
import * as THREE from 'three';
import { BufferGeometry, Vector3 } from 'three';

export const Line = (props: any) => {
    const ref = React.useRef<any>(null!);

    useLayoutEffect(() => {
        if (ref.current) {
            ref.current.setFromPoints(
                [
                    props.startPoint,
                    props.endPoint
                ]);
        }
    }, []);

    return (
        <>
            <line>
                <bufferGeometry attach='geometry' ref={ref} />
                <lineBasicMaterial color={props.color} transparent opacity={0.4}/>
            </line>
        </>
    );
};
