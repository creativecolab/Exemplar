import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './DesignBrief.css';

export default class DesignBrief extends Component {
    render() {
        return (
            <div className="db-main">
                <div className="db-prompt">
                    <h id="DB-Head">
                        DESIGN BRIEF
                    </h>
                    <div className="DB-InnerText">
                        <div id="DB-Close">
                            X
                            </div>
                        <h1 id="DB-Sub">
                            DESIGN SCENARIO
                        </h1>
                        <span id="DB-Sub-Text">
                            "Placemaking" is the process of creating quality places that people
                            want to work, live, play, and/or learn in. You will participate in a
                            challenge to design a Lighter, Quicker, Cheaper Placemaking project
                            for a small town in the state of Idaho, where the local city council
                            is gathering ideas from community members to create, renew, or
                            revitalize a public, outdoor space as a destination and gathering place.
                        </span>
                        <h1 id="DB-Sub">
                            DESIGN CONSTRAINTS
                        </h1>
                        <span id="DB-Sub-Text">
                            The selection criteria for project funding are light, quick and
                            cheap, meaning that the project falls between the $500-$2500
                            budget and is completed within 9 months.
                        </span>
                    </div>
                </div>
            </div>
        )
div }
}
