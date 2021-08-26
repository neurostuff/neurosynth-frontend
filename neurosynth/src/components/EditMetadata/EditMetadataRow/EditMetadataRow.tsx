import React from 'react';
import { DisplayMetadataTableRowModel } from '../../DisplayMetadataTable/DisplayMetadataTableRow/DisplayMetadataTableRow';
import EditMetadataStyles from '../EditMetadataStyles';
import ToggleType, { PropertyType } from './ToggleType/ToggleType';
import EditMetadataRowStyles from './EditMetadataRowStyles';
import EditMetadataBoolean from './EditMetadataValue/EditMetadataBoolean';
import EditMetadataNumber from './EditMetadataValue/EditMetadataNumber';
import EditMetadataString from './EditMetadataValue/EditMetadataString';
import { useState } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';

export interface EditMetadataRowModel {
    onMetadataRowEdit: (index: number, updatedKey: string, updatedValue: any) => void;
    metadataRow: DisplayMetadataTableRowModel;
    index: number;
}

export interface IEditMetadataField {
    onEdit: (newValue: string | number | boolean) => void;
    value: string | number | boolean;
}

const EditMetadataRow: React.FC<EditMetadataRowModel> = (props) => {
    const [index, setIndex] = useState(props.index);
    let type: PropertyType;
    switch (typeof props.metadataRow.metadataValue) {
        case 'boolean':
            type = PropertyType.BOOLEAN;
            break;
        case 'string':
            type = PropertyType.STRING;
            break;
        case 'number':
            type = PropertyType.NUMBER;
            break;
        default:
            type = PropertyType.OTHER;
            break;
    }

    const [row, setRow] = useState(props.metadataRow);
    const [currType, setCurrType] = useState(type);
    const classes = EditMetadataRowStyles();

    const handleToggle = (type: PropertyType) => {
        setCurrType(type);
    };

    const handleSetMetadataKey = (event: ContentEditableEvent) => {};

    const handleEdit = (newVal: boolean | number | string) => {
        console.log(newVal);
        // props.onMetadataRowEdit(index, );
    };

    return (
        <>
            <div className={classes.tableRow}>
                <ToggleType type={type} onToggle={handleToggle} />
                <div className={classes.tableCell}>
                    <ContentEditable
                        className={classes['div[contenteditable="true"]']}
                        html={props.metadataRow.metadataKey}
                        onChange={handleSetMetadataKey}
                    />
                    {/* <span>{props.metadataRow.metadataKey}</span> */}
                </div>
                <div className={classes.tableCell} style={{ width: '100%' }}>
                    {currType === PropertyType.BOOLEAN && (
                        <EditMetadataBoolean onEdit={handleEdit} value={props.metadataRow.metadataValue} />
                    )}
                    {currType === PropertyType.NUMBER && (
                        <EditMetadataNumber onEdit={handleEdit} value={props.metadataRow.metadataValue} />
                    )}
                    {currType === PropertyType.STRING && (
                        <EditMetadataString onEdit={handleEdit} value={props.metadataRow.metadataValue} />
                    )}
                    {currType === PropertyType.OTHER && (
                        <span className={classes.noContent}>Unsupported Type or NULL</span>
                    )}
                </div>
            </div>
            <div className={classes.tableRow}>
                <div className={`${classes.tableCell} ${classes.spacer}`}></div>
            </div>
        </>
    );
};

export default EditMetadataRow;