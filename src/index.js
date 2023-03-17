/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, createBlock } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

import v1 from './v1';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
	deprecated: [ v1 ],
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content, align } ) => {
					return createBlock( 'blocks-course/text-box', {
						text: content,
						alignment: align,
					} );
				},
			},
			{
				type: 'enter',
				regExp: /textbox/i,
				transform: () => {
					return createBlock( 'blocks-course/text-box' );
				},
			},
			{
				type: 'prefix',
				prefix: 'textbox',
				transform: () => {
					return createBlock( 'blocks-course/text-box' );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				isMatch: ( { text } ) => {
					return text ? true : false;
				},
				transform: ( { text, alignment } ) => {
					return createBlock( 'core/paragraph', {
						content: text,
						align: alignment,
					} );
				},
			},
		],
	},
} );
