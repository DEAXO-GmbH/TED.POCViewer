/* eslint-disable react/no-unknown-property */
import React from 'react';
import { extend } from '@react-three/fiber';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useGetFont } from '../../hooks/useGetFont';


extend({ TextGeometry });

export const Text = (props: any) => {
    const { position, text, color, size } = props;
    const font = useGetFont();

    return (
        <mesh position={
            position
        }>
            <textGeometry args={[text, { font, size, height: 0.1 }]} />
            <meshLambertMaterial attach='material' color={color} />
        </mesh>
    );
};

