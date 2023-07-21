import React from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';


interface ILayerOptionProps {
    isVisible: boolean
    label: string
    onToggle: () => void
}

export const LayerOption = ({ isVisible, label, onToggle }: ILayerOptionProps) => {
    return (
        <div className='poc-viewer__layers_layer_option'>
            <span className='eye-button' onClick={onToggle}>
                {isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </span>

            <span className='poc-viewer__layers_layer_option_name'>
                {label}
            </span>
        </div>
    );
};
