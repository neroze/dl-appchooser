import _ from 'underscore'
import React from 'react'
import Backbone from 'backbone'
import {
	compose,
	withState,
	withHandlers,
	lifecycle,
} from 'recompose'
import PropTypes from 'prop-types'

import App from 'app'
import {
	ModalChoice,
	UpdateStateFromModel,
	loadingWrapperHOC,
} from 'common_components'
import Layout from 'layout_components'

import Form from 'form_components'
import AdminEdit from 'admin_edit_components'

import '{name}_entity'

export const Enhancer = compose(
	withState('model', 'setModel', false),
	withHandlers({
		setData: ({setModel, model}) => (event) => {
			
		},
		handleCancel: ({}) => () => {

		},
		handleSubmit: ({}) => () => {

		},
		handleDelete: ({model, history}) => () => {
			App.radio.trigger('modal', ModalChoice, () => {}, {
				handleSuccess: () => {
					App.radio.trigger('message', App.t('guide.deleted'));
					model.destroy();
					history.push('/{name}')
					App.radio.trigger('loading:hide')
					App.radio.trigger('modal:hide')
				},
			})
		},
		
	}),
	lifecycle({
		componentDidMount() {
			const id = this.props.match.params.id || null;
			Backbone.Radio.request('{name}', 'get', id).done(({name}) => {
				this.props.setModel(guide)
				this.props.setGuide(guide.get('{name}'))
			})
		}
	}),
	UpdateStateFromModel,
	loadingWrapperHOC((props) => !props.model),
)


export const Component = ({
	permissions,
	model,
	setData,
	changeGuide,
	errorInData,
	handleCancel,
	handleSubmit,
	removeDoctype,
	handleDelete,
	handelImport,
	handleExport,
	updateStateFromModel
}) =>
	<AdminEdit
		actions={[{
			title: '{name}',
			onClick() {
				handelImport();
				App.radio.trigger('loading:hide')
			}
		}]}
		context={model.id}
		handleBack={handleCancel}

		primaryText={model.id ? 'Update' : 'Save'}
		handleSubmit={handleSubmit}

		title={model.id ? '{name} guide' : 'Add {name}'}
	>
		<Layout.Card>
			<Form.Input
				label='name'
				name='name'
				value={model.get('name')}
				onChange={updateStateFromModel}
			/>

			
		</Layout.Card>
	</AdminEdit>

Component.propTypes = {
	model: PropTypes.object,
	permissions: PropTypes.object,
	handleSubmit: PropTypes.func,
	handleCancel: PropTypes.func,
	handleExport: PropTypes.func,
	removeDoctype: PropTypes.func,
	errorInData: PropTypes.bool,
	handleDelete: PropTypes.func,
	updateStateFromModel: PropTypes.func,
}

export const Edit = Enhancer(Component)
export default Edit
