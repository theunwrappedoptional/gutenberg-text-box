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
	// InspectorControls,
	// PanelColorSettings,
	// ContrastChecker,
	// withColors,
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
// ColorPalette,
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

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { text, alignment, shadow } = attributes;

	const onChangeText = ( newText ) => {
		setAttributes( { text: newText } );
	};

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};

	const toggleShadow = () => {
		setAttributes( { shadow: ! shadow } );
	};

	const classes = classnames( `text-box-align-${ alignment }`, {
		'has-shadow': shadow,
	} );

	return (
		<>
			<BlockControls
				controls={ [
					{
						icon: 'admin-page',
						title: __( 'Shadow', 'text-box' ),
						onClick: toggleShadow,
						isActive: shadow,
					},
				] }
			>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>

			<RichText
				{ ...useBlockProps( {
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
