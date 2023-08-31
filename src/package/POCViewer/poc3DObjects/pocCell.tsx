/* eslint-disable react/no-unknown-property */
import { observer } from 'mobx-react';
import { POC_CRYSTAL_HOVER_COLOR, POC_CRYSTAL_COLOR } from 'package/constants';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { IViewerPOCCell } from 'package/stores/POCViewerStore/types';
import React, { useMemo } from 'react';
import { ConeGeometry, DoubleSide } from 'three';
import POCCellLabel from './pocCellLabel';
import { layersWidgetStore } from 'package/stores/widgetStore';

interface IPOCCellProps {
    pocCell: IViewerPOCCell
}

export const POCCell = observer(({ pocCell }: IPOCCellProps) => {
    const isHovered = pocViewerStore.hoveredPOCIds.has(pocCell.id);
    const pocBodyColor = isHovered ? POC_CRYSTAL_HOVER_COLOR : POC_CRYSTAL_COLOR;
    // const pocBodyColor = 0x0000FF;

    const height = 2;
    const radius = 1;


    return (
        <group
            onClick={e => {e.stopPropagation(); pocViewerStore.setClickedPOCCell(pocCell);}}
            position={[pocCell.position.x, 1, -pocCell.position.z]}

            onPointerEnter={(e) => {
                pocViewerStore.addHoveredPOCId(pocCell.id);
                e.stopPropagation();
            }}
            onPointerLeave={(e) => {
                pocViewerStore.removeHoveredPOCId(pocCell.id);
                e.stopPropagation();
            }}
        >
            <group>
                <mesh geometry={new ConeGeometry(radius, height, 4)} position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
                    <meshLambertMaterial flatShading attach="material" color={pocBodyColor} transparent opacity={0.3} side={DoubleSide}/>
                </mesh>

                <mesh geometry={new ConeGeometry(radius, height, 4)} position={[0, height, 0]}>
                    <meshLambertMaterial flatShading color={pocBodyColor} side={DoubleSide} transparent opacity={0.3} />
                </mesh>
            </group>

            <group scale={[0.8,0.8,0.8]}>
                <mesh geometry={new ConeGeometry(radius, height, 4)} position={[0, 0.25, 0]} rotation={[Math.PI, 0, 0]} >
                    <meshLambertMaterial flatShading attach="material" color={pocBodyColor} side={DoubleSide} clipShadows />
                </mesh>

                <mesh geometry={new ConeGeometry(radius, height, 4)} position={[0, height+0.25, 0]}>
                    <meshLambertMaterial flatShading color={pocBodyColor} side={DoubleSide} clipShadows />
                </mesh>
            </group>

            <pointLight position={[0, 1, 0]} distance={2} intensity={20} />
            {(layersWidgetStore.showPOCCellLabels || isHovered) && <POCCellLabel pocs={pocCell.pocs} />}
        </group>
    );
});
