/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	withColors,
} from '@wordpress/block-editor';

import // ToolbarGroup,
// ToolbarButton,
// ToolbarDropdownMenu,

// PanelBody,
// TextControl,
// TextareaControl,
// ToggleControl,
// AnglePickerControl,
// ColorPicker,
// ColorPalette
'@wordpress/components';

import classnames from 'classnames';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

function Edit( props ) {
	const {
		attributes,
		setAttributes,
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
	} = props;

	const { text, alignment } = attributes;

	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};

	const classes = classnames( `text-box-align-${ alignment }`, {
		[ textColor.class ]: textColor.class,
		[ backgroundColor.class ]: backgroundColor.class,
	} );

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'text-box' ) }
					icon="admin-appearance"
					initialOpen
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Background Color', 'text-box' ),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Text Color', 'text-box' ),
						},
					] }
				>
					<ContrastChecker
						textColor={ textColor.color }
						backgroundColor={ backgroundColor.color }
					/>
				</PanelColorSettings>
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>

			<RichText
				{ ...useBlockProps( {
					style: {
						backgroundColor: backgroundColor.class
							? undefined
							: backgroundColor.color,
						color: textColor.class ? undefined : textColor.color,
					},
					className: classes,
				} ) }
				onChange={ onChangeText }
				tagName="h4"
				value={ text }
				placeholder={ __( 'Your text', 'text-box' ) }
				allowedFormats={ [] }
			/>
		</>
	);
}

export default withColors( {
	backgroundColor: 'background-color',
	textColor: 'color',
} )( Edit );
