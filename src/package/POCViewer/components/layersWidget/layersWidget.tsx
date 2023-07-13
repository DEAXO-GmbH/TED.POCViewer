import { observer } from 'mobx-react';
import { widgetStore } from 'package/stores/widgetStore';
import { concatClassnames as cn } from 'package/utils';
import { CloseOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import React from 'react';
import './layerWidget.css';
import { pocViewerStore } from 'package/stores/POCViewerStore';

export const LayersWidget = observer(() => {
    const onEyeClick = (levelId: string) => {
        if (widgetStore.hiddenLayers.has(levelId)) {
            widgetStore.revealLayer(levelId);
        } else {
            widgetStore.hideLayer(levelId);
        }
    };

    return (
        <div className={cn('poc-viewer__layers', widgetStore.isWidgetOpen && 'open')}>
            <div className='poc-viewer__layers_top'>
                Levels visibility <CloseOutlined onClick={() => widgetStore.closeWidget()} />
            </div>
            <div className='poc-viewer__layers_main'>
                {pocViewerStore.levelPlanes.slice().reverse().map(levelPlane => {
                    const isVisible = widgetStore.hiddenLayers.has(levelPlane.id);
                    return (
                        <div key={levelPlane.id} className='poc-viewer__layers_layer'>
                            <span className='eye-button' onClick={() => onEyeClick(levelPlane.id)}>
                                {isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </span>
                            {levelPlane.levelName}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});
