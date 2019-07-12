import { List } from 'immutable';
import React, { Component } from 'react';
import { TagBox, TAG_REJECTED } from 'react-tag-box';
import './Category.css';

const surfaceTags = List(
    ['bike', 'app', 'car', 'scooter', 'carpool', 'cab', 'rideshare', 'sharing/share',
        'bus', 'cost', 'vehicle', 'low-income', 'late-night', 'safe/safety', 'membership'].map(t => ({
            label: t,
            value: t
        }))
)

export default class Category extends Component {
    componentWillReceiveProps() {
        console.log(this.props.children);
    }
    state = {
        tags: surfaceTags,
        selected: surfaceTags.take(surfaceTags.size)
    }

    render() {
        const { tags, selected } = this.state;
        const onSelect = tag => {
            if (tag.label.includes('@')) {
                return TAG_REJECTED;
            }

            const newTag = {
                label: tag.label,
                value: tag.value || tag.label
            }

            return this.setState({
                selected: selected.push(newTag)
            });
        }
        const remove = tag => {
            this.setState({
                selected: selected.filter(t => t.value !== tag.value)
            })
        }

        return (
            <div className="MakeCategory">
                <TagBox
                    tags={tags.toJS()}
                    selected={selected.toJS()}
                    onSelect={onSelect}
                    removeTag={remove}
                    backspaceDelete={true}
                    placeholder="Enter a new category..."
                />
                <div>
                    <br />
                    <span className="Btn">
                        <input type="button" value="Add" onClick={this.handleAdd}>
                        </input>
                    </span>
                </div>
            </div>
        )
    }
}


