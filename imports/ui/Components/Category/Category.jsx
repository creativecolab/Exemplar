import { List } from 'immutable';
import React, { Component } from 'react';
import { TagBox, TAG_REJECTED } from 'react-tag-box';
import { withTracker } from 'meteor/react-meteor-data';

import './Category.css';
import Categories from '../../../api/categories.js';

const surfaceTags = List(
    ['bike', 'app', 'car', 'scooter', 'carpool', 'cab', 'rideshare', 'sharing/share',
        'bus', 'cost', 'vehicle', 'low-income', 'late-night', 'safe/safety', 'membership'].map(t => ({
            label: t,
            value: t
        }))
)

class Category extends Component {
    componentWillReceiveProps() {
        console.log(this.props.children);

        // var tagArr = List(Categories.find({ condition: 'surface' }).fetch().map((elem) => {
        //     console.log("LABEL" + elem.label);
        // }));
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

export default withTracker(() => {
    return {
    //   examples: Examples.find({}).fetch(),
      categories: Categories.find({}).fetch(),
    }
})(Category);
