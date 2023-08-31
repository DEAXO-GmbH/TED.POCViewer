
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react';
import { IViewerTool, POCViewer3DPoint } from 'package/stores/POCViewerStore/types';
import { Color, Vector2 } from 'three';
import { pocViewerStore } from 'package/stores/POCViewerStore';
import { POC_TOOL_CONNECTION_COLOR } from 'package/constants';
import { layersWidgetStore } from 'package/stores/widgetStore';
import { observer } from 'mobx-react';



interface IPOCAndToolConnection {
    tool: IViewerTool
}

export const POCAndToolConnection = observer(({ tool }: IPOCAndToolConnection) => {
    const [allPOCAndToolConnections, setAllPOCAndToolConnections] = useState<{firstPoint: POCViewer3DPoint, secondPoint: POCViewer3DPoint}[]>([]);
    const isToolHidden = layersWidgetStore.getLevelOptionsById(tool.level.id).toolsHidden;

    useEffect(() => {
        // TODO to fix pocCell ids - gotta make those cells yuh
        const pocCells = pocViewerStore.pocCells.filter(pocCell => tool.pocCellIds.includes(pocCell.id));

        const points = pocCells.map(pocCell => {
            return {
                firstPoint: {
                    x: pocCell.position.x,
                    y: pocCell.position.y + 1,
                    z: -pocCell.position.z,
                },
                secondPoint: {
                    x: tool.position.x,
                    y: tool.position.y + 1,
                    z: -tool.position.z,
                },
            };
        });

        setAllPOCAndToolConnections(points);
    }, [tool]);

    if (isToolHidden) {
        return null;
    }

    return (
        <>
            {
                allPOCAndToolConnections.map((connection, index) => {
                    const points = [
                        connection.firstPoint.x, connection.firstPoint.y, connection.firstPoint.z,
                        connection.secondPoint.x, connection.secondPoint.y, connection.secondPoint.z
                    ];

                    return (
                        <mesh key={index}>
                            <meshLineGeometry points={points}/>
                            <meshLineMaterial
                                dashOffset={0.3}
                                dashRatio={0.2}
                                dashArray={0.05}
                                lineWidth={0.25}
                                alphaTest={0}
                                color={new Color(POC_TOOL_CONNECTION_COLOR)}
                                resolution={new Vector2(121, 121)}
                            />
                        </mesh>
                    );
                })
            }
        </>
    );
});
