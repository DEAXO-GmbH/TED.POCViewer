import { CopyOutlined, FullscreenOutlined } from '@ant-design/icons';
import React from 'react';
import './buttonPannel.css';
import { observer } from 'mobx-react';
import { widgetStore } from 'package/stores/widgetStore';
import { LayersWidget } from '../layersWidget';

export const ButtonPannel = observer(() => {
    const onFullscreenclick = () => {
        const viewerCont = document.querySelector('.poc-viewer_cont');
        const isFullscreen = viewerCont?.clientWidth === window.innerWidth && viewerCont.clientHeight === window.innerHeight;

        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            viewerCont?.requestFullscreen();
        }
    };

    const onLayersClock = () => {
        if (widgetStore.isWidgetOpen) {
            widgetStore.closeWidget();
        } else {
            widgetStore.openWidget();
        }
    };

    return (
        <>
            <div className='poc-viewer__button-pannel'>
                <div className='poc-viewer__button-pannel_btn-group'>
                    <button className='poc-viewer__button-pannel_btn' onClick={onLayersClock}><CopyOutlined /></button>
                    <button className='poc-viewer__button-pannel_btn' onClick={onFullscreenclick}><FullscreenOutlined /></button>
                </div>
            </div>

            <LayersWidget />
        </>
    );
});
