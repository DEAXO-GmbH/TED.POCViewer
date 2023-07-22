/* eslint-disable react/no-unknown-property */
import React from 'react';
import { observer } from 'mobx-react';

import { pocViewerStore } from 'package/stores/POCViewerStore';

import { POCLine } from './poc3DObjects/pocLine';
import { LevelPlane } from './poc3DObjects/levelPlane';

import { Vector3 } from 'three';
import { POCAndToolConnection } from './poc3DObjects/pocAndToolConnection';
import { Interconnection } from './poc3DObjects/interconnection';
import { layersWidgetStore } from 'package/stores/widgetStore';



export const POCObjectsGenerator = observer(() => {
    const position = new Vector3(-pocViewerStore.planesWidth / 2, 0, pocViewerStore.planesLength / 2);

    return (
        <group position={position}>
            {pocViewerStore.levelPlanes.map((levelPlane, index) => <LevelPlane key={index} levelPlane={levelPlane} />)}
            {pocViewerStore.pocLines.map(pocLine => <POCLine key={pocLine.id} pocLine={pocLine} />)}
            {pocViewerStore.tools.map(tool => <POCAndToolConnection key={tool.id} tool={tool} />)}
            {layersWidgetStore.showInterconnections && pocViewerStore.interconnections.map((intersection, index) => <Interconnection key={index} firstTool={intersection.firstTool} secondTool={intersection.secondTool} />)}
        </group>
    );
});
