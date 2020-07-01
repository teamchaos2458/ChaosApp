import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/button";
import "./styles/GoalCard.css";

interface GoalCardProps {
    img: string;
    title: string;
    edit(): void;
    delete(): void;
    eyeDee: string;
}

export default function GoalCard(props: GoalCardProps) {
    const buttonStyle = { margin: "0.5rem" };
    return (
        <Card className="Card">
            <Card.Img variant="top" src={props.img} />
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Button
                    style={buttonStyle}
                    variant="secondary"
                    // eyeDee={props.eyeDee}
                    onClick={props.edit}
                >
                    Edit Goal
                </Button>
                <Button
                    style={buttonStyle}
                    variant="danger"
                    // eyeDee={props.eyeDee}
                    onClick={props.delete}
                >
                    Delete Goal
                </Button>
            </Card.Body>
        </Card>
    );
}
