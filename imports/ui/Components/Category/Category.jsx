import { List } from 'immutable';
import React, { Component } from 'react';
import { TagBox, TAG_REJECTED } from 'react-tag-box';
import { withTracker } from 'meteor/react-meteor-data';

import './Category.css';
import Categories from '../../../api/categories.js';

// const surfaceTags = List(
//     ['bike', 'app', 'car', 'scooter', 'carpool', 'cab', 'rideshare', 'sharing/share',
//         'bus', 'cost', 'vehicle', 'low-income', 'late-night', 'safe/safety', 'membership'].map(t => ({
//             label: t,
//             value: t
//         }))
// )

function displayCategories(CategoryObj) {
    var i;
    var allCategories = [];
    var CategoryArray = CategoryObj.Categories.Categories;
    console.log(CategoryArray);
    for (i = 0; i < CategoryArray.length; i++) {
        allCategories.push(CategoryArray[i].label);
    }
    console.log(allCategories);
    return List(allCategories.map(t => ({
        label: t,
        value: t,
    })));
}


export default class Category extends Component {

    // state = {
    //     tags: surfaceTags,
    //     selected: surfaceTags.take(surfaceTags.size),
    // }

    render() {
        const ss = displayCategories(this.props.category);
        console.log(ss);
        console.log(ss.take(ss.size));
        this.state = {
            tags: ss,
            selected: ss.take(ss.size),
        }

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
      categories: Categories.find({}).fetch(),
    }
})(Category);
