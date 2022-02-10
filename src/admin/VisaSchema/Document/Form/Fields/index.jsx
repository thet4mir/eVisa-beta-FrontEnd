import React, { Component } from 'react'

import { axiosInstance } from '@/service'
import { Loader } from '@/components/Loader'

import { SelectedItems } from './SelectedItems'
import { PopupSelector } from './PopupSelector'


class ItemsManager {

    constructor() {
        this.selected_items = []
        this.items = []
        this.items_map = {}
        this.change_listener = null

        this.setSelected = this.setSelected.bind(this)
        this.getSelected = this.getSelected.bind(this)
        this.setItems = this.setItems.bind(this)
        this.add = this.add.bind(this)
        this.remove = this.remove.bind(this)
        this.toggleSelect = this.toggleSelect.bind(this)
        this.move = this.move.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    setSelected(ids) {
        this.selected_items = ids.reduce((acc, id) => {
            const item = this.items_map[id]
            return [...acc, item]
        }, [])

        this.change_listener && this.change_listener()
    }

    getSelected() {
        return this.selected_items.map((item) => item.id)
    }

    setItems(items) {
        this.items = items
        this.items_map = items.reduce((acc, item) => {
            acc[item.id] = item
            return acc
        }, {})
    }

    add(id) {
        const idx = this.selected_items.findIndex((f) => f.id == id)
        if (idx === -1) {
            const item = this.items_map[id]
            this.selected_items.push(item)
        }
        this.change_listener && this.change_listener()
    }

    remove(id) {
        const idx = this.selected_items.findIndex((f) => f.id == id)
        if (idx !== -1) {
            this.selected_items.splice(idx, 1)
        }
        this.change_listener && this.change_listener()
    }

    toggleSelect(id, is_selected) {

        if (is_selected) {
            this.add(id)
        } else {
            this.remove(id)
        }

    }

    move(id, offset) {

        const items = this.selected_items

        const idx_a = items.findIndex((f) => f.id == id)
        const idx_b = idx_a + offset
        const inRange = (v) => 0 <= v && v <= items.length

        if (inRange(idx_a) && inRange(idx_b)) {
            [ items[idx_a], items[idx_b] ] = [ items[idx_b], items[idx_a] ]
            this.change_listener && this.change_listener()
        }
    }

    onChange(listener) {
        this.change_listener = listener
    }

}


export class Fields extends Component {

    constructor(props) {
        super(props)

        this.state = {
            items_promise: null,
            items_manager: new ItemsManager(),
        }

        this.loadItems = this.loadItems.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const { items_manager } = this.state

        items_manager.onChange(() => {
            this.setState({ items_manager })
            this.handleChange()
        })
        this.loadItems()
    }

    loadItems() {

        const promise = axiosInstance
            .post('/api/visa/field/all/')
            .then(({ is_success, items}) => {
                if (is_success) {
                    const { items_manager } = this.state
                    const filtered = items.filter((item) => item.is_fixed==false)
                    items_manager.setItems(filtered)
                    items_manager.setSelected(this.props.value)
                }
            })
        this.setState({ items_promise: promise})

    }

    handleChange() {
        const name = this.props.name
        const value = this.state.items_manager.getSelected()
        this.props.onChange(name, value)
    }

    render() {

        const { errors, is_validated } = this.props
        const { items_manager } = this.state

        return (
            <Loader promise={ this.state.items_promise } reload={ this.loadItems }>

                <SelectedItems
                    items={ items_manager.selected_items }
                    onMoveUp={ (id) => items_manager.move(id, -1) }
                    onMoveDown={ (id) => items_manager.move(id, 1) }
                    footer={
                        <PopupSelector
                            onSelect={ items_manager.toggleSelect }
                            items={ items_manager.items }
                            selected_items={ items_manager.getSelected() }
                        />
                    }
                />

            </Loader>
        )
    }
}
