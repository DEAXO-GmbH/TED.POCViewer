import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { CloseOutlined, EyeOutlined, EyeInvisibleOutlined, DownOutlined } from '@ant-design/icons';
import { LayerOption } from './layerOption';

import { concatClassnames as cn } from 'package/utils';

import { layersWidgetStore } from 'package/stores/widgetStore';
import { pocViewerStore } from 'package/stores/POCViewerStore';

import { Checkbox } from 'antd';

import './layerWidget.css';



export const LayersWidget = observer(() => {
    useEffect(() => {
        layersWidgetStore.addLevels(pocViewerStore.levelPlanes.reverse());
    }, [pocViewerStore.levelPlanes]);


    return (
        <div className={cn('poc-viewer__layers', layersWidgetStore.isWidgetOpen && 'open')} onContextMenu={(e)=> e.preventDefault()}>
            <div className='poc-viewer__layers_top'>
                <div>
                    Levels visibility
                    <CloseOutlined onClick={() => layersWidgetStore.closeWidget()} />
                </div>

                <div>
                </div>
            </div>

            <div className='poc-viewer__layers_global'>
                <div onClick={() => layersWidgetStore.toggleShowInterconnections()} className='poc-viewer__layers_global_option'>
                    <Checkbox checked={layersWidgetStore.showInterconnections} /> Show interconnections
                </div>

                <div onClick={() => layersWidgetStore.toggleShowPOCCellLabels()} className='poc-viewer__layers_global_option'>
                    <Checkbox checked={layersWidgetStore.showPOCCellLabels} /> Show POC Cell labels
                </div>
            </div>

            <div className='poc-viewer__layers_main'>
                {layersWidgetStore.layerVisibilityOptions.map(levelPlane => {
                    const levelOptions = layersWidgetStore.getLevelOptionsById(levelPlane.levelId);

                    return (
                        <div key={levelPlane.levelId} className='poc-viewer__layers_layer'>
                            <div className='poc-viewer__layers_layer_main-bar'>
                                <div onClick={() => layersWidgetStore.toggleLayerExpanded(levelPlane.levelId)} className={cn('expand-button', levelOptions.isLayerExpanded && 'expanded')}>
                                    <DownOutlined />
                                </div>

                                <span className='eye-button' onClick={() => layersWidgetStore.toggleLayerVisibility(levelPlane.levelId)}>
                                    {levelOptions.levelHidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </span>

                                <span className='poc-viewer__layers_layer_level-name'>
                                    {levelPlane.levelName}
                                </span>
                            </div>

                            {
                                levelOptions.isLayerExpanded &&
                                <div className='poc-viewer__layers_layer_options'>
                                    <LayerOption onToggle={() => layersWidgetStore.toggleAxesVisibility(levelPlane.levelId)} isVisible={levelOptions.axesHidden} label='Axes' />
                                    <LayerOption onToggle={() => layersWidgetStore.togglePlaneVisibility(levelPlane.levelId)} isVisible={levelOptions.planeHidden} label='Plane' />
                                    <LayerOption onToggle={() => layersWidgetStore.togglePOCVisibility(levelPlane.levelId)} isVisible={levelOptions.pocsHidden} label='POCs' />
                                    <LayerOption onToggle={() => layersWidgetStore.toggleToolsVisibility(levelPlane.levelId)} isVisible={levelOptions.toolsHidden} label='Tools' />
                                </div>
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    );
});
