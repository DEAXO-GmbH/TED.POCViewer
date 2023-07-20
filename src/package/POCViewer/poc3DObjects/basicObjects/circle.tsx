/* eslint-disable react/no-unknown-property */
import { observer } from 'mobx-react';
import React, { useLayoutEffect } from 'react';
import { BufferGeometry, EllipseCurve, Mesh, ShapeGeometry, Vector3 } from 'three';

export const Circle = observer((props: any) => {
    const ref = React.useRef<any>(null!);
    const { position, radius, color } = props;

    useLayoutEffect(() => {

        const curve = new EllipseCurve(
            position.x,  position.y,
            radius, radius,
            0,  2 * Math.PI,
            false,
            0
        );

        const points3d: Vector3[] = [];
        curve.getPoints(50).map(point => points3d.push(new Vector3(point.x,point.y,position.z)));
        void ref.current.setFromPoints(points3d);

    }, [props]);


    return (
        <line>
            <bufferGeometry ref={ref} />
            <lineBasicMaterial color={color} opacity={0.4} transparent />
        </line>
    );
});

export default Circle;
