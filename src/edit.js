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

export default function Edit( { attributes, setAttributes } ) {
	const { text, alignment, backgroundColor, textColor } = attributes;

	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};

	const onChangeBackgroundColor = ( newBackgroundColor ) => {
		setAttributes( { backgroundColor: newBackgroundColor } );
	};

	const onChangeTextColor = ( newTextColor ) => {
		setAttributes( { textColor: newTextColor } );
	};

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'text-box' ) }
					icon="admin-appearance"
					initialOpen
					colorSettings={ [
						{
							value: backgroundColor,
							onChange: onChangeBackgroundColor,
							label: __( 'Background Color', 'text-box' ),
						},
						{
							value: textColor,
							onChange: onChangeTextColor,
							label: __( 'Text Color', 'text-box' ),
						},
					] }
				>
					<ContrastChecker
						textColor={ textColor }
						backgroundColor={ backgroundColor }
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
					style: { backgroundColor, color: textColor },
					className: `text-box-align-${ alignment }`,
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
