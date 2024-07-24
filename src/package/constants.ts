// CSS Variables
export const CSS_BUTTON_PANEL_BTN_BG = '#dbdbdb';
export const CSS_BUTTON_PANEL_BTN_TEXT_COLOR = '#777777';
export const CSS_BUTTON_PANEL_BTN_BORDER = '#777777';

export const CSS_BUTTON_PANEL_MODAL_BG_1 = '#232b33';
export const CSS_BUTTON_PANEL_MODAL_BG_2 = '#ececec';
export const CSS_BUTTON_PANEL_MODAL_TEXT_COLOR_1 = '#eae9e9';
export const CSS_BUTTON_PANEL_MODAL_TEXT_COLOR_2 = '#555555';
export const CSS_BUTTON_PANEL_MODAL_BORDER = '#777777';
export const CSS_BUTTON_PANEL_MODAL_THUMB_COLOR = '#999999';
export const CSS_BUTTON_PANEL_MODAL_THUMB_COLOR_HOVER = '#888888';

export const POC_VIEWER_CSS_VARIABLES = {
    '--button-panel-bg': CSS_BUTTON_PANEL_BTN_BG,
    '--button-panel-text-color': CSS_BUTTON_PANEL_BTN_TEXT_COLOR,
    '--button-panel-btn-border': CSS_BUTTON_PANEL_BTN_BORDER,

    '--button-panel-modal-bg-1': CSS_BUTTON_PANEL_MODAL_BG_1,
    '--button-panel-modal-bg-2': CSS_BUTTON_PANEL_MODAL_BG_2,
    '--button-panel-modal-text-color-1': CSS_BUTTON_PANEL_MODAL_TEXT_COLOR_1,
    '--button-panel-modal-text-color-2': CSS_BUTTON_PANEL_MODAL_TEXT_COLOR_2,
    '--button-panel-modal-border': CSS_BUTTON_PANEL_MODAL_BORDER,
    '--button-panel-modal-thumb-color': CSS_BUTTON_PANEL_MODAL_THUMB_COLOR,
    '--button-panel-modal-thumb-color-hover': CSS_BUTTON_PANEL_MODAL_THUMB_COLOR_HOVER,
} as React.CSSProperties;


// Scene and general
export const SCENE_BACKGROUND_COLOR = 0xf3f4f6;
export const SCENE_GRID_FIRST_COLOR = 0xD3DEE6;
export const SCENE_GRID_SECOND_COLOR = 0xA2A8AD;
export const SCENE_DEFAULT_TEXT_COLOR = 0x202121;

// Levels and axes
export const LEVEL_PLANE_INNER_COLOR = 0xCAD2E8;
export const LEVEL_PLANE_OUTER_COLOR = 0xD3EDFF;
export const LEVEL_PLANE_OUTER_SECOND_COLOR = 0xD3EDFF;
export const LEVEL_PLANE_LABEL_COLOR = SCENE_DEFAULT_TEXT_COLOR;
export const AXES_COLOR = 0x202121;

export const AXES_LABEL_RADIUS = 1;
export const AXES_LABEL_OFFSET = 3;
export const OUTER_PLANE_EXTRA_PADDING = AXES_LABEL_OFFSET * 2 + AXES_LABEL_RADIUS * 4;

export const LEVEL_EDGE_HIGHLIGHT_COLOR = 0x000000;

// Unused poc zone
export const UNUSED_POC_ZONE_LEFT_OFFSET = 5;
export const UNUSED_POC_ZONE_COLOR = 0x5C7CB8;
export const UNUSED_POC_ZONE_PLANE_PADDING = 1;
export const UNUSED_POC_ZONE_GAP = 1.5;
export const UNUSED_POC_ZONE_TITLE_LABEL_COLOR = 0x002255;

export const DEFAULT_POC_NAME = 'N/A';
export const DEFAULT_POC_UNIT_NAME = 'N/A';

// POC and POCLines
export const POC_CRYSTAL_COLOR = 0x41A600;
export const POC_CRYSTAL_HOVER_COLOR = 0x2A6C00;
export const POC_OVERFLOW_COLOR = 0xFF1100;
export const POC_OVERFLOW_HOVER_COLOR = 0xCC1100;
export const POC_CRYSTAL_LABEL_COLOR = SCENE_DEFAULT_TEXT_COLOR;
export const POC_CRYSTAL_METRIC_COLOR = 0x777777;
export const POC_CRYSTAL_METRIC_OVERLOAD_COLOR = 0xFF0000;
export const POCLINE_COLOR = 0x333355;
export const POCLINE_OFFSET_LENGTH = 2;

// Tools
export const TOOL_COLOR = 0x5A707F;
export const TOOL_SIZE_UNSPECIFIED_COLOR = 0x99222A;
export const TOOL_NAME_COLOR = 0x000000;
export const TOOL_DEFAULT_WIDTH = 1.5;
export const TOOL_DEFAULT_LENGTH = 1.5;
export const TOOL_DEFAULT_HEIGHT = 2;
export const TOOL_DIMENSIONS_GAP = 0.5;
export const POC_TOOL_CONNECTION_COLOR = 0x000000;
export const INTERCONNECTION_COLOR = 0x222222;
export const TOOL_EDGES_COLOR = 0x000000;


// Error boundary
export const ERROR_BOUNDARY_TEXT_COLOR = 0x222244;
