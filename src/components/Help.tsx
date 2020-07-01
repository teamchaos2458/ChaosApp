import React from "react";
import "./styles/Help.css";
import Minu from "./Minu";

interface HelpProps {
    title: string;
    due: string;
    desc: string;
}

export default function Help(props: HelpProps) {
    return (
        <div className="Chunk">
            <h1>{props.title}</h1>
            <Minu />
            <h3>{props.due}</h3>
            <p>{props.desc}</p>
        </div>
    );
}
